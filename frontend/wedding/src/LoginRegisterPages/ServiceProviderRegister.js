import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner'; // Spinner import
import Header from '../Main/Header';
import loginimage from '../images/loginpage.jpg'
import bgimage from '../images/bghome.jpg'
import { FaEnvelope, FaLock, FaPhoneAlt , FaMapMarkerAlt, FaCity, FaPencilAlt, FaBuilding } from 'react-icons/fa'; 
import { IoIosContact } from "react-icons/io";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { FadeLoader,BeatLoader  } from "react-spinners"; // Import FadeLoader
function ServiceProviderRegister() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('service-provider');
  const [registerloader,setRegisterloader] = useState(false);
  
  
  // Address state
  const [pincode, setPincode] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Automatically navigate to specific role registration pages
  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin/register');
    }
    if (role === 'user') {
      navigate('/users/register');
    }
  }, [role]);

  // Handle sending OTP to the provided email
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

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/otp/verifyOtp`, { email, otp });
      toast.success('Email verified successfully!');
      setIsVerified(true); // Show blue tick after verification
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle address creation and service provider registration
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setRegisterloader(true);

    if (!isVerified) {
      toast.error('Please verify your email first.');
      setRegisterloader(false);
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      setRegisterloader(false);
      return;
    }

    try {
      // Step 1: Create the address first
      const addressResponse = await axios.post(`${process.env.REACT_APP_API_URL}/address/create`, {
        pincode,
        area,
        city,
        state,
      });

      // Get the address ID
      const addressId = addressResponse.data.address._id;

      // Step 2: Register the service provider with the addressId
      const serviceProviderResponse = await axios.post(`${process.env.REACT_APP_API_URL}/serviceprovider/register`, {
        name: `${firstName} ${lastName}`, // Merge first and last name
        email,
        password,
        phone,
        role,
        addressId,
      });

      if (serviceProviderResponse.data.accessToken && serviceProviderResponse.data.refreshToken) {
        localStorage.setItem('accessToken', serviceProviderResponse.data.accessToken);
        localStorage.setItem('refreshToken', serviceProviderResponse.data.refreshToken);

        // Show success toast notification
        toast.success('Service provider registered successfully!', {
          autoClose: 5000,
        });
  
        setRegisterloader(false);
        setTimeout(() => {
          navigate('/'); // Navigate to the home page after 5 seconds
        }, 5000); // 5000ms = 5 seconds
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage(error.response?.data?.message || 'Something went wrong!');

      // Show error toast notification
      toast.error('Error during registration. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-cover bg-center flex justify-center items-center p-4 md:p-10 lg:pt-[100px] pt-[100px] " style={{ backgroundImage: `url(${bgimage})` }}>
        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden ">
          <div className="hidden md:block w-2/5 p-4">
            <img src={loginimage} alt="Wedding Services" className="object-cover w-full h-full rounded-lg" />
          </div>

            {/* Right side - Form */}
            <div className="w-full md:w-3/5 p-6">
            <h2 className="text-2xl font-semibold mb-2 text-center md:text-left">Vendor Registration</h2>
            <p className="text-gray-500 text-sm mb-4 text-center md:text-left">Join our platform as a wedding service provider</p>
              <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-700">First Name:</label>
                       <IoIosContact className="absolute left-3 top-[33px] text-2xl text-black" />
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                    <IoIosContact className="absolute left-3 top-[33px] text-2xl text-black" />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="mt-1 pl-[50px] block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                                

                  <div className='relative'>
                  <label className="block text-sm font-medium text-gray-700 mt-[-10px]">Email:</label>
                
                  <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-3 top-[20px]  text-black" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 pl-[50px] block w-4/5 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {/* Green checkmark inside the input field */}
                    {isVerified && (
                      <span className="absolute right-2 text-green-500 text-xl">✔</span> // Positioned on the right side
                    )}
                    
                    {/* Send OTP Button */}
                    {!isVerified && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={loading || otpSent || isVerified} // Disable Send OTP button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md ml-2"
                      >
                        {loading ? (
                          <TailSpin height="20" width="20" color="white" />
                        ) : (
                          'Send OTP'
                        )}
                      </button>
                    )}
                  </div>
                </div>


     
          {otpSent && !isVerified && (
            <>
              <div className="flex items-center space-x-2">
              
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={loading || isVerified} // Disable Verify OTP button after verification
                  className="bg-green-500 text-white py-2 px-4 rounded-md"
                >
                  {loading ? (
                    <TailSpin height="20" width="20" color="white" />
                  ) : (
                    'Verify OTP'
                  )}
                </button>
              </div>
             
            </>
          )}


               

                <div className="flex space-x-2 mt-[-10px]">
                      <div className=' flex-1 relative'>
                        <label className="block text-sm font-medium text-gray-700 mt-[-10px]">Password:</label>
                          <FaLock className="absolute left-3 top-[28px] " /> 
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="mt-1 block pl-[50px]  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                      </div>
                      <div className="flex-1 relative">
                        <label className="block text-sm font-medium text-gray-700 mt-[-10px]">Phone:</label>
                        <FaPhoneAlt  className="absolute left-3 top-[28px] " /> 
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="mt-1 block pl-[50px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-700 mt-[-10px]">Pincode:</label>
                    <FaMapMarkerAlt className="absolute left-3 top-[28px] " /> 
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      required
                      className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-700 mt-[-10px]">Area:</label>
                    <FaBuilding className="absolute left-3 top-[28px] " /> 
                    <input
                      type="text"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      required
                      className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                 
                  <div className="flex-1 relative">
                    <label className="block text-sm font-medium text-gray-700 mt-[-10px]">City:</label>
                    <FaCity className="absolute left-3 top-[28px] " /> 
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                  
                    <label className="block text-sm font-medium text-gray-700 mt-[-10px]">State:</label>
                    <MdOutlineRealEstateAgent className="absolute left-3 top-[28px] " /> 
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="mt-1 block w-full pl-[50px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mt-[-10px]">Role:</label>
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

                {role === 'service-provider' && (
                  

                <button
                  type="submit"
                  className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex justify-center items-center"
                  disabled={registerloader} // Disable button while loading
                >
                  {registerloader ? <BeatLoader color="white" size={20} /> : "Register"}
                </button>

                )}
              </form>

              <p className="text-sm text-center mt-4">
                Already have an account?{' '}
                <Link to="/serviceprovider/login" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </p>
             <p className="text-sm text-center mt-2">
                            Are you a User?{' '}
                            <Link to="/users/register" className="text-blue-500 hover:underline">
                              Register customer
                            </Link>
                          </p>

              <ToastContainer />
            </div>
          
        </div>
      </div>
    </>

  );
}

export default ServiceProviderRegister;
