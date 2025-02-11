// const Razorpay = require("razorpay");
// const crypto = require("crypto");
import Razorpay from "razorpay";
import crypto from "crypto"
// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

// Create an order
const createOrder = async (req, res) => {
  try {

    
    const { amount, currency } = req.body;
    
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
    };
    

    const order = await razorpay.orders.create(options);
   
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Verify Payment
const verifyPayment = (req, res) => {
  try {
  
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const hmac = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (hmac === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully!" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature!" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {createOrder,verifyPayment}