import  {getAllServices}  from "../controllers/services.js";
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {GetdatabyID} from '../controllers/serviceProvider.js'
import { Router } from "express";
const router = Router();
 router.route("/all-service").get(getAllServices);
 router.route("/services/:id").get(authenticateToken,GetdatabyID);
 export default router