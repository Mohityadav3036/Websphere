import {Router} from 'express'
import { createOrder,verifyPayment } from '../controllers/payment.js'
const router = Router();
router.post("/create-order", createOrder);

// Route to verify payment
router.post("/verify-payment", verifyPayment);

export default router