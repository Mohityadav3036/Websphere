import { Otp } from '../models/otpStore.js';
import { generateOtp, sendOtp } from '../utils/sendOtp.js';
import { User } from '../models/User.js';
import { ServiceProvider } from '../models/ServiceProvider.js';
export const sendEmailOtp = async (req, res) => {
  const { email } = req.body;

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const otp = generateOtp();

    // Save OTP to the database
    await Otp.findOneAndUpdate(
      { email },
      { email, otp },
      { upsert: true, new: true }
    );

    // Send OTP to the email
    const emailSent = await sendOtp(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Try again.' });
    }

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Check if OTP matches
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    // OTP is valid
    await Otp.deleteOne({ email }); // Remove OTP after successful verification
    return res.status(200).json({ message: 'Email verified successfully.' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const sendotpforForgetpassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Email not found in our records.' });
  }
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const otp = generateOtp();

    // Save OTP to the database
    await Otp.findOneAndUpdate(
      { email },
      { email, otp },
      { upsert: true, new: true }
    );

    // Send OTP to the email
    const emailSent = await sendOtp(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Try again.' });
    }

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};


export const sendotpforForgetpasswordSP = async (req, res) => {
  const { email } = req.body;
  const user = await ServiceProvider.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Email not found in our records.' });
  }
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  try {
    const otp = generateOtp();

    // Save OTP to the database
    await Otp.findOneAndUpdate(
      { email },
      { email, otp },
      { upsert: true, new: true }
    );

    // Send OTP to the email
    const emailSent = await sendOtp(email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP. Try again.' });
    }

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};