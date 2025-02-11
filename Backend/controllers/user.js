// For User Registration :- POST
import {User} from '../models/User.js'
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import {Booking} from '../models/Booking.js'
import { Service} from '../models/Service.js'
const registerUser = async (req, res) => {
    try {
        
        const { name, email, password, phone, role = "user" } = req.body;
       
        // Validate role
        const validRoles = ["user", "service-provider", "admin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role provided" });
        }
       

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Create new user
        const newUser = new User({ name, email, password, phone, role });
        await newUser.save();
       

                // Generate access token
                const accessToken = newUser.generateAccessToken();

                // Generate refresh token
                const refreshToken = newUser.generateRefreshToken();

        res.status(201).json({
            accessToken,
            refreshToken,
            message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// For User Login : - POST
const loginUser = async (req, res) => {
    try {
 
        const { email, password, role } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        // Check if role matches
        if (user.role !== role) {
            return res.status(403).json({ message: "Role mismatch: Unauthorized access" });
        }

        // Generate access token
        const accessToken = user.generateAccessToken();

        // Generate refresh token
        const refreshToken = user.generateRefreshToken();

        // Save refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Respond with tokens and user data
        res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// For View User Profile :-  GET
const profileUser = async (req, res) => {
    try {
        
        // Get the token from headers (Bearer token)

        
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // If no token is found
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        // Find the user by ID and select the fields you want to return (including password for this case)
        const user = await User.findById(decoded._id).select('name email password role phone');
    
        // If user not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send user data in the response
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,  // Include password here as requested
            role: user.role,
            phone:user.phone,
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// For User Profile Update : - POST
const updateUserProfile = async (req, res) => {
    try {
        // Extract token from headers
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find the user by ID
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract fields to update from request body
        const { name, password, phone } = req.body;
         
        // Update fields
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if(password) user.password = password;
    
        // Save updated user
        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Error updating profile:", error);

        // Handle token verification errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        res.status(500).json({ message: "Server error" });
    }
};


// User Book a Service :-POST

 const  userServiceBooking = async (req, res) => {
    try {
        const { serviceId, eventDate, totalCost } = req.body;
        const userId = req.user.id; // Assumes user ID is set by the auth middleware

        // Validate input
        if (!serviceId || !eventDate || !totalCost) {
            return res.status(400).json({ message: 'Service ID, event date, and total cost are required.' });
        }

        // Check if the service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        // Check if the event date is in the future
        const currentDate = new Date();
        if (new Date(eventDate) <= currentDate) {
            return res.status(400).json({ message: 'Event date must be in the future.' });
        }

        // Create a new booking
        const booking = new Booking({
            user: userId,
            serviceProvider: service.serviceProvider, // Assuming `Service` has a `serviceProvider` field
            service: serviceId,
            totalCost,
            eventDate,
        });

        await booking.save();

        res.status(201).json({
            message: 'Service booked successfully.',
            booking,
        });
    } catch (error) {
        console.error('Error while booking service:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// USER Seen there Booking Service: - GET
 const  userBooking = async (req, res) => {
    try {
        const userId = req.user.id; // Assumes user ID is set by the auth middleware
     
        
        // Fetch all bookings for the authenticated user
        const bookings = await Booking.find({ user: userId })
            .populate('service', 'name description') // Populate service details (e.g., name, description)
            .populate('serviceProvider', 'name contactInfo') // Populate service provider details
            .sort({ bookingDate: -1 }); // Sort by booking date (most recent first)

            console.log("booking",bookings)
        // Return the bookings
        res.status(200).json({
            message: 'Bookings retrieved successfully.',
            bookings,
        });
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// User Write an Review : - POST.................... Pending
const userReview = (req,res) => {
    try {
 
        // Add your logic for user registration here.
      
    } catch (error) {
        console.error("Error during userReview:", error);
    }
};


export  {registerUser,loginUser,profileUser,updateUserProfile,userServiceBooking,userBooking,userReview};
