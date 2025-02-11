
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../Main/Header";
import { TailSpin } from "react-loader-spinner"; // Spinner import
import { useNavigate } from "react-router-dom";
import bgImage from "../images/bghome.jpg";

function ForgotPasswordServiceProvider() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/otp/sendotpforForgetpasswordSP`,
        { email }
      );
      toast.success(response.data.message);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/otp/verifyOtp`,
        { email, otp }
      );
      toast.success(response.data.message);
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/serviceprovider/reset-password`,
        { email, newPassword }
      );
      toast.success(response.data.message);
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
      setTimeout(() => {
        navigate("/serviceprovider/login");
      }, 4000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <div className="flex flex-col justify-center items-center flex-1 bg-black bg-opacity-60 ">
        <div className="bg-[#1F2937] text-white p-6 rounded-md shadow-lg w-[400px] border-2 border-white">
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
              <p className="text-sm text-gray-300 mb-6 text-center">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <div className="relative mb-4">
                <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="email"
                  className="w-full p-3 pl-10 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <TailSpin width={20} height={20} /> : "Send OTP"}
              </button>
              <button
                type="button"
                className="text-sm text-gray-300 mt-4 text-center w-full"
                onClick={() => navigate("/serviceprovider/login")}
              >
                Back to Login
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp}>
              <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
              <label className="block text-sm font-medium mb-1">Enter OTP</label>
              <div className="relative mb-4">
                <FaKey className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  className="w-full p-3 pl-10 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter the OTP"
                  required
                />
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <TailSpin width={20} height={20} /> : "Verify OTP"}
              </button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword}>
              <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <div className="relative mb-4">
                    <FaLock className="absolute left-3 top-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 pl-10 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      required
                    />
                    <div
                      className="absolute right-3 top-4 text-gray-400 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  {newPassword && newPassword.length < 8 && (
                    <p className="text-sm text-red-500 mb-[10px]">Password must be at least 8 characters long</p>
                  )}  

              <button
                className="bg-blue-500 text-white py-2 px-4 w-full rounded-md hover:bg-blue-600 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <TailSpin width={20} height={20} /> : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ForgotPasswordServiceProvider;
