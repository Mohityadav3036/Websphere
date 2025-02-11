import mongoose from "mongoose";

// Enhanced review schema
const reviewSchema = new mongoose.Schema({
  serviceId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', // Reference to the Service being reviewed
    required: true 
  },
  reviewer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }, // Reference to the User who wrote the review
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  }, // Rating from 1 to 5
  comment: { 
    type: String, 
     
  }, // Review comment

  createdAt: { 
    type: Date, 
    default: Date.now 
  }, // Timestamp for when the review was created
});

export const Review = mongoose.model('Review', reviewSchema);
