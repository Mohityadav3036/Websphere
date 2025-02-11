import { registerAdmin,loginAdmin } from "../controllers/admin.js";
import { Router } from "express";

const router = Router();
router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);

export default router