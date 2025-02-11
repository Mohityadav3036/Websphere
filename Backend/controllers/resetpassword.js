
import nodemailer from 'nodemailer';
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import {User} from '../models/User.js' // Assuming you have a User model
import {Otp} from '../models/otpStore.js' // Assuming you have an OTP model
import { ServiceProvider } from '../models/ServiceProvider.js';
const sendOtp = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Generate OTP and store it
      const otpp = Math.floor(100000 + Math.random() * 900000); // 6-character OTP
      
      const otpRecord = new Otp({ email, otpp, expiresAt: Date.now() + 5 * 60 * 1000 });
      await otpRecord.save();
    
      // Send OTP via email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otpp}`,
      });
  
      res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while sending OTP.' });
    }
  };
  
  // Step 2: Verify OTP
  const verifyOtp = async (req, res) => {
    try {
      const { email, otpp } = req.body;
  
      // Check OTP record
      const otpRecord = await otp.findOne({ email, otpp });
      if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP.' });
      }
  
      // Check if OTP is expired
      if (otpRecord.expiresAt < Date.now()) {
        return res.status(400).json({ message: 'OTP expired.' });
      }
  
      // OTP verified successfully
      await Otp.deleteOne({ email, otpp }); // Remove OTP after verification
      res.status(200).json({ message: 'OTP verified successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while verifying OTP.' });
    }
  };
  
  // Step 3: Reset Password
  const resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      // Find user and update password
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = newPassword
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while resetting password.' });
    }
  };


  const resetPasswordserviceprovider = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
  
      // Find user and update password
      const user = await ServiceProvider.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = newPassword
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while resetting password.' });
    }
  };
  
export { sendOtp, verifyOtp, resetPassword,resetPasswordserviceprovider };