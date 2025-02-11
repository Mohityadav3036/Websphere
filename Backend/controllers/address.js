import { Address } from '../models/Address.js'; // Make sure this imports the Address model correctly

// Create Address Controller
export const createAddress = async (req, res) => {
  try {
    const { pincode, area, city, state } = req.body;

    // Step 1: Input Validation
    if (!pincode || !area || !city || !state) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Step 2: Create a new Address document
    const newAddress = new Address({
      pincode,
      area,
      city,
      state,
    });

    // Step 3: Save the Address to the database
    const savedAddress = await newAddress.save();

    // Step 4: Return the saved address as the response
    res.status(201).json({
      message: 'Address created successfully',
      address: savedAddress,
    });
  } catch (error) {
    console.error('Error creating address:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
