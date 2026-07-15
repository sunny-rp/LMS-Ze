import express from 'express';
import { login, register, verifyOtp , logout, getUser, forgotPassword, resetPassword, updatePassword } from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post("/register", register)
router.post("/verify-otp", verifyOtp)
router.post("/login", login);
router.post("/logout", isAuthenticated,logout);
router.get("/user-profile",isAuthenticated , getUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.post("/update-password", isAuthenticated, updatePassword);


export default router;