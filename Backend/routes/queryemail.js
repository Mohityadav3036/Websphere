import { queryemail,Contactemail } from "../controllers/queryemail.js";
import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
const router = Router();
 router.route("/email-send").post(authenticateToken,queryemail)
 router.route("/contact-us").post(Contactemail)
 export default router