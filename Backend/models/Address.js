import mongoose from "mongoose";
// Define the address schema
const addressSchema = new mongoose.Schema({
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  serviceProviderIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider', // Referencing the service provider model
  }],
});

export const Address  = mongoose.model("Address",addressSchema)
