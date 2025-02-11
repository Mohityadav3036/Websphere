import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    serviceProvider: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'ServiceProvider', 
      required: true 
    },                                
    service: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Service', 
      required: true 
    }, // Reference to the booked service
    totalCost: { 
      type: Number, 
      required: true 
    }, // Total cost for the booking
    bookingDate: { 
      type: Date, 
      default: Date.now 
    }, // Booking creation date
    eventDate: { 
      type: Date, 
      required: true 
    }, // The event date
    status: { 
      type: String, 
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], 
      default: 'Confirmed' 
    },
  });
  
export const Booking = mongoose.model('Booking', BookingSchema);
  