import { sendEmailOtp, verifyEmailOtp,sendotpforForgetpassword,sendotpforForgetpasswordSP} from "../controllers/otp.js";
import {Router} from 'express'



const router = Router();
 router.route("/sendEmailOtp").post(sendEmailOtp);
 router.route("/verifyOtp").post(verifyEmailOtp);
 router.route("/sendotpforForgetpasswordUser").post(sendotpforForgetpassword);
 router.route("/sendotpforForgetpasswordSP").post(sendotpforForgetpasswordSP);

 export default router