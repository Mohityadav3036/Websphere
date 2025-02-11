import { Router } from "express";
const router = Router();
import { createBooking,updateBookingStatus,cancelBooking } from "../controllers/booking.js";
import { authenticateToken } from '../middlewares/authenticateToken.js';
router.post("/create-booking", createBooking);
router.put("/update-status/:bookingId",authenticateToken,updateBookingStatus);
router.delete("/cancel/:bookingId", authenticateToken, cancelBooking);
export default router