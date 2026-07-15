import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { generateForgotPasswordEmailMessage } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";
import { send } from "process";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const isRegistered = await User.findOne({ email, accountVerified: true });
  if (isRegistered) {
    return next(new ErrorHandler("User already registered, please login", 400));
  }

  const registrationAttemptByUser = await User.find({
    email,
    accountVerified: false,
  });

  if (registrationAttemptByUser.length >= 5) {
    return next(
      new ErrorHandler("Too many registration attempts, please try again later", 400)
    );
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10); // this is not a good practice to hash password in controller but for simplicity we are doing it here but in real application we should do it in model using pre save hook  


  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const verificationCode = await user.generateVerificationCode();
  await user.save();

  await sendVerificationCode(verificationCode, email);

  res.status(201).json({
    success: true,
    message: "Registration successful. Verification code sent.",
  });
});


export const verifyOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, verificationCode } = req.body;
    if(!email || !verificationCode){
        return next(new ErrorHandler("Please provide all required fields", 400));
    }
    try {
        const userAllEntries = await User.find({ email, accountVerified: false }).sort({ createdAt: -1 });
        if (!userAllEntries.length) {
            return next(new ErrorHandler("User Not Found", 404));
        }

        let user;

        if(userAllEntries.length > 1){
            user = userAllEntries[0];
            await User.deleteMany({
                _id:{$ne : user._id},
                email,
                accountVerified: false,
            })
        } else {
            user = userAllEntries[0];
        }

       if(user.verificationCode !== verificationCode){
            return next(new ErrorHandler("Invalid verification code", 400));
       }
       const currentTime = new Date();
       const verificationCodeExpire = new Date(user.verificationCodeExpire).getTime();

       if(verificationCodeExpire < currentTime){
            return next(new ErrorHandler("Verification code has expired", 400));
       }
         user.accountVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpire = null;
        await user.save({validateModifiedOnly: true});

        sendToken(user, 200 , res , "Account verified successfully");
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error", 500));
    }
})


export const login = catchAsyncErrors(async (req,res,next)=>{
  const {email,password} = req.body;
   if(!email || !password){
    return next(new ErrorHandler("Please provide all required fields",400));
   }

   const user = await User.findOne({email, accountVerified: true}).select("+password");
   if(!user){
    return next(new ErrorHandler("Invalid email or password",401));
   }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user, 200, res, "Login successful");
})


export const logout = catchAsyncErrors(async (req,res,next)=>{
    res.status(200).cookie("token", null,{
        expires : new Date(Date.now()),
        httpOnly: true, 
    }).json({
        success: true,
        message: "Logged out successfully",
    });
})

// export const getUser = catchAsyncErrors(async (req,res,next)=>{ // in this we do a extra query to get user details from database but we already have user details in req.user because of isAuthenticated middleware so we can directly send that in response without doing extra query to database which will improve performance of our application
//   const user = await User.findById(req.user._id);
//   if(!user){
//     return next(new ErrorHandler("User not found",404));
//   }
//   res.status(200).json({
//     success: true,
//     user,
//   });
// })

export const getUser = catchAsyncErrors(async (req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
})

export const forgotPassword = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  })

  if(!user){
    return next(new ErrorHandler("User not found with this email",404));
  }

  const resetToken = user.generatePasswordResetToken();
  await user.save({validateModifiedOnly: false});

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = generateForgotPasswordEmailMessage(resetPasswordUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset (Library MS)",
      message,
    });

    res.status(200).json({
      success: true,
      message: "Password reset email sent successfully",
    })
  } catch (error) {
  console.error("❌ EMAIL ERROR FULL ↓↓↓");
  console.error(error);
  console.error("MESSAGE:", error.message);
  console.error("CODE:", error.code);
  console.error("RESPONSE:", error.response);

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save({ validateModifiedOnly: true });

  return next(new ErrorHandler("Failed to send password reset email", 500));
}

})

export const resetPassword = catchAsyncErrors(async(req,res,next)=>{
  const {token} = req.params;
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {$gt: Date.now()},   
  })

  if(!user){
  return next(new ErrorHandler("Invalid or expired password reset token",400));
}
 if(req.body.password != req.body.confirmPassword){
  return next(new ErrorHandler("Password and confirm password do not match",400));
 }

 if(req.body.password.length < 8 || req.body.password.length > 16){
  return next(new ErrorHandler("Password must be between 8 and 16 characters",400));
 }
 const hashedPassword = await bcrypt.hash(req.body.password, 10);
 user.password = hashedPassword;
 user.resetPasswordToken = undefined;
 user.resetPasswordExpire = undefined;
 await user.save();

 sendToken(user, 200, res, "Password reset successful");
 

})

export const updatePassword = catchAsyncErrors(async(req,res,next)=>{
  const user = await User.findById(req.user._id).select("+password");

  const isPasswordMatched = await bcrypt.compare(req.body.oldPassword, user.password);
  if(!isPasswordMatched){
    return next(new ErrorHandler("Old password is incorrect",400));
  }

  if(req.body.newPassword != req.body.confirmNewPassword){
    return next(new ErrorHandler("New password and confirm new password do not match",400));
  }

  if(req.body.newPassword.length < 8 || req.body.newPassword.length > 16){
    return next(new ErrorHandler("New password must be between 8 and 16 characters",400));
  }

  const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
  user.password = hashedNewPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  }); 
})