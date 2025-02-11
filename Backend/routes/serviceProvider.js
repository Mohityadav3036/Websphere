import { registerServiceProvider, loginServiceProvider,profileServiceProvider,profileServiceProviderID,updateProfileServiceProvider,addServiceByServiceProvider,ServicesByServiceProvider,
    UpdateServiceByServiceProvider,BookingServicesInServiceProvider,uploadMedia,deleteService, GetdatabyID,uploadImageForService
 } from '../controllers/serviceProvider.js';
 import { authenticateToken } from '../middlewares/authenticateToken.js';
 import { sendOtp,verifyOtp,resetPasswordserviceprovider } from '../controllers/resetpassword.js';
import {Router} from 'express'
import { upload } from '../middlewares/multer.js';

const router = Router();
 router.route("/register").post(registerServiceProvider);
 router.route("/login").post(loginServiceProvider);
 router.route("/profile").get(authenticateToken,profileServiceProvider);
 router.route("/updateprofile").put(authenticateToken,updateProfileServiceProvider)
 router.route("/add-service").post( upload.array("files", 10),authenticateToken,addServiceByServiceProvider)
 router.route("/services").get(authenticateToken,ServicesByServiceProvider);
 router.route("/update-service/:id").put(authenticateToken,UpdateServiceByServiceProvider);
 router.route("/booking").get(BookingServicesInServiceProvider);
 router.route("/upload-media").post(uploadMedia);
 router.route("/send-otp").post(sendOtp);
 router.route("/verify-otp").post(verifyOtp);
 router.route("/reset-password").post(resetPasswordserviceprovider);
 router.route("/services/:id").get(authenticateToken,GetdatabyID);
 router.route("/uploadimage/:id").post(upload.array("image", 10),authenticateToken,uploadImageForService)
 router.route("/services/:id").delete(authenticateToken,deleteService);
 router.route("/profile/:id").get(authenticateToken,profileServiceProviderID);
 router.route("/booking/:id").get(authenticateToken,BookingServicesInServiceProvider);
 export default router