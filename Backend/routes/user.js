import {registerUser,loginUser,userBooking,userServiceBooking,updateUserProfile,profileUser,userReview} from "../controllers/user.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { sendOtp, verifyOtp, resetPassword } from "../controllers/resetpassword.js";
import {Router} from 'express'

const router = Router();
 router.route("/register").post(registerUser);
 router.route("/login").post(loginUser);
 router.route("/profile").get(authenticateToken,profileUser);
 router.route("/updateprofile").put(authenticateToken,updateUserProfile);
 router.route("/servicebooking").post(authenticateToken,userServiceBooking);
 router.route("/booking").get(authenticateToken,userBooking);
 router.route("/review").post(userReview);
 router.route("/send-otp").post(sendOtp);
 router.route("/verify-otp").post(verifyOtp);
 router.route("/reset-password").post(resetPassword);

export default router