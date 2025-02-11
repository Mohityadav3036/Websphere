import express from "express";
import { addReview, getReviewsByService } from "../controllers/review.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

// Add a review (protected route)
router.post("/add", authenticateToken, addReview);

// Get reviews for a service
router.get("/:serviceId", getReviewsByService);

export default router;
