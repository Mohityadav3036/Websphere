
import { createAddress } from "../controllers/address.js";
import { Router } from "express";

const router = Router();
router.route("/create").post(createAddress);


export default router