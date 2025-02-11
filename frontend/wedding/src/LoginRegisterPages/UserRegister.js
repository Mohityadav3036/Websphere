import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Header from '../Main/Header';
import backgroundImage from '../images/bghome.jpg'; // Replace with your actual background image
import userPhoto from '../images/loginpage.jpg'; // Replace with your actual left side photo
import { FaEnvelope, FaLock, FaPhoneAlt , FaMapMarkerAlt, FaCity, FaPencilAlt, FaBuilding } from 'react-icons/fa'; 
import { IoIosContact } from "react-icons/io";

function UserRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('user');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'service-provider') {
      navigate('/serviceprovider/register');
    }
    if (role === 'admin') {
      navigate('/admin/register');
    }
  }, [role]);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/otp/sendEmailOtp`, { email });
      toast.success('OTP sent to your email!');
      setOtpSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/otp/verifyOtp`, { email, otp });
      toast.success('Email verified successfully!');
      setIsVerified(true);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setRole('user');
    setOtp('');
    setOtpSent(false);
    setIsVerified(false);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("OTP Sent:", otpSent, "Is Verified:", isVerified); // Debugging check
    if (!otpSent) {
      toast.error("Please send OTP to verify your email first!");
      return;
    }
    if (!isVerified) {
      toast.error("Please verify your email before registering!");
      return;
    }

    // Password length validation
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        name: `${firstName} ${lastName}`, // Merged first and last name
        email,
        password,
        phone,
        role,
      });

      if (response.data.accessToken && response.data.refreshToken) {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        toast.success('User registered successfully!', {
          autoClose: 5000,
        });

        resetForm();

        setTimeout(() => {
          navigate('/');
        }, 5000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong!');
      toast.error('Error during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4 md:p-10" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="hidden md:flex w-2/5 items-center justify-center p-6">
            <img src={userPhoto} alt="Wedding Services" className="w-full h-auto rounded-lg object-cover" />
          </div>

          {/* Right Section */}
          <div className="w-full md:w-3/5 p-6">
            <h2 className="text-2xl font-semibold mb-2 text-center md:text-left">Create your account</h2>
            <p className="text-gray-500 text-sm mb-4 text-center md:text-left">Enter your details below to create your account and get started</p>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className=" relative">
              
                  <label className="block text-sm font-medium text-gray-700">First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-1 block pl-[50px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className=" relative">
             
                  <label className="  block text-sm font-medium text-gray-700">Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Email:</label>
                <FaEnvelope className="absolute left-3 top-[38px] " /> 
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`mt-1 block pl-[50px] w-full px-3 py-2 border ${isVerified ? 'border-green-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  disabled={isVerified}
                />
                {isVerified && (
                  <span className="absolute top-9 right-3 text-green-500 text-lg">&#10003;</span>
                )}
                {!otpSent && !isVerified && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="mt-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner"></div>
                    ) : (
                      'Send OTP'
                    )}
                  </button>
                )}
              </div>

              {otpSent && !isVerified && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enter OTP:</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="mt-2 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="spinner"></div>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>
                </div>
              )}

              <div className="flex space-x-4">
                <div className="w-1/2 relative">
                  <label className="block text-sm font-medium text-gray-700">Password:</label>
                   <FaLock className="absolute left-3 top-[38px] " /> 
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="w-1/2 relative">
                  <label className="block text-sm font-medium text-gray-700">Phone:</label>
                    <FaPhoneAlt className="absolute left-3 top-[38px] " /> 
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role:</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="user">User</option>
                  <option value="service-provider">Service Provider</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

              <button
                type="submit"
                className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                
              >
                {loading ? (
                  <div className="spinner ml-[45%]"></div>
                ) : (
                  'Register'
                )}
              </button>
            </form>

            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/users/login" className="text-blue-500 hover:underline">
                Login here
              </Link>
            </p>

            <p className="text-sm text-center mt-2">
              Are you a vendor?{' '}
              <Link to="/serviceprovider/register" className="text-blue-500 hover:underline">
                Register your business here
              </Link>
            </p>

            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
