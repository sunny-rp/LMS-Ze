import { User } from "../models/user.model.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async(req,res,next)=>{
   const token = req.cookies.token
   if(!token){
    return next(new ErrorHandler("Please login to access this resource",401));
   }

   const decodedToken = jwt.verify(token , process.env.JWT_SECRET);

   const user = await User.findById(decodedToken.id);
   if(!user){
    return next(new ErrorHandler("User not found with this id",404));
   }

    req.user = user;
    next();
})