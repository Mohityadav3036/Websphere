// controllers/bookingController.js
import { Booking } from "../models/Booking.js"; // adjust the path if your model is elsewhere
import { User } from "../models/User.js";
import { ServiceProvider } from "../models/ServiceProvider.js";
const createBooking = async (req, res) => {
  try {

    // Destructure the required fields from the request body.
    // Make sure these fields are sent from the frontend.
    const { user, serviceProvider, service, totalCost, eventDate } = req.body;

    // Simple validation: ensure all required fields are present.
    if (!user || !serviceProvider || !service || !totalCost || !eventDate) {
      return res.status(400).json({ message: "Missing required booking fields." });
    }

    // Create a new booking document.
    const newBooking = new Booking({
      user,
      serviceProvider,
      service,
      totalCost,
      eventDate, // should be a valid date string or Date object
      // bookingDate is set by default (Date.now) and status defaults to "Pending"
    });

    // Save the booking to the database.
    const savedBooking = await newBooking.save();

    await User.findByIdAndUpdate(user, {
      $push: { bookings: savedBooking._id },
    });

    await ServiceProvider.findByIdAndUpdate(serviceProvider, {
      $push: { bookings: savedBooking._id },
    });
    

    // Return the saved booking.
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


// import { Booking } from "../models/Booking.js"; // Import Booking model

// Update booking status
 const updateBookingStatus = async (req, res) => {
    try {

        const { bookingId } = req.params; // Get booking ID from request params
        const { status } = req.body; // Get new status from request body

        // Check if status is valid
        const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        // Find and update the booking status
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true }
        );

        // If booking not found
        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({
            message: "Booking status updated successfully",
            booking: updatedBooking,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};




// Cancel and delete a booking
 const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Find and delete the booking
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        return res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export {createBooking,updateBookingStatus,cancelBooking}