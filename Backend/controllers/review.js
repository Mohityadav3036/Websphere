import { Review } from "../models/Review.js";
import { Service } from "../models/Service.js"; // Ensure Service exists
import { User } from "../models/User.js"; // Ensure User exists

// Save a new review
export const addReview = async (req, res) => {
    try {
        console.log("inside the review")
        const { serviceId, rating, reviewText } = req.body;
        const userId = req.user.id; // Assuming authentication middleware adds `req.user`

        // Validate inputs
        if (!serviceId || !rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: "Invalid review data." });
        }

        // Check if the service exists
        const serviceExists = await Service.findById(serviceId);
        if (!serviceExists) {
            return res.status(404).json({ error: "Service not found." });
        }

        // Create the review
        const newReview = new Review({
            serviceId,
            reviewer: userId,
            rating,
            comment:reviewText,
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully!", review: newReview });

    } catch (error) {
        console.error("Error saving review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all reviews for a specific service
export const getReviewsByService = async (req, res) => {
    try {

        
        const { serviceId } = req.params;

        // Fetch reviews for the given serviceId
        const reviews = await Review.find({ serviceId }).populate("reviewer", "name");

        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
