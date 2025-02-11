
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Main/Header";
import bgImage from "../images/bghome.jpg"; // Replace with your actual image path
import loginImage from "../images/serviceproviderloginpage.jpg"; // Replace with your actual image path
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa"; 
import { FadeLoader,BeatLoader  } from "react-spinners"; // Import FadeLoader
function ServiceProviderLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
    const [loading, setLoading] = useState(false); // State for loader
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/serviceprovider/login`, {
        email,
        password,
        role: "service-provider",
      });

      // Save tokens in local storage
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // Show success toast and redirect
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 2000,
      });
      setTimeout(() => navigate("/"), 4000); // Redirect after 4 seconds
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
       
      });
    }
    finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Header />
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="bg-black bg-opacity-30 flex rounded-lg shadow-md w-3/4 max-w-4xl border-2 border-white">
          {/* Left Section: Image */}
          <div className="hidden md:block w-2/4">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="h-[400px] w-[90%] object-cover rounded-lg mt-[20px] ml-[15px]"
            />
          </div>

          {/* Right Section: Login Form */}
          <div className="w-full md:w-1/2 p-6 bg-transparent backdrop-blur-lg rounded-lg ">
      <h1 className="text-3xl font-bold  mb-6 text-white">Welcome Back</h1>
      <h2 className=" text-white opacity-85 mt-[-20px] ml-[px] text-[17px]">Please sign in as <span className="text-yellow-400">Vendor</span></h2>
      <br/>

      <form onSubmit={handleLogin}>
        <div className="mb-4 relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1 text-white"
          >
            Email
          </label>
             <FaEnvelope className="absolute left-3 top-[38px] text-black" />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 pl-10 py-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1 text-white"
          >
            Password
          </label>
            <FaLock className="absolute left-3 top-[38px] " /> {/* Password Icon */}
          <input
            type={isPasswordVisible ? "text" : "password"} // Toggle between text and password input type
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border pl-10 rounded pr-10" // Added padding for the eye icon
            placeholder="Enter your password"
            required
          />
          {/* Eye Icon for password visibility toggle */}
          <div
            className="absolute right-3 top-10 cursor-pointer"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </div>
        </div>

          <button
                        type="submit"
                        className={`w-full flex justify-center items-center bg-blue-500 text-white py-2 px-4 rounded transition ${loading ? "cursor-not-allowed opacity-75" : "hover:bg-blue-600"}`}
                        disabled={loading}
                      >
                        {loading ? <BeatLoader  color="#000000" height={3} width={4} margin={4} /> : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <a
          href="/service-provider/forget-password/"
          className="text-blue-200 text-sm hover:underline"
        >
          Forgot Password?
        </a>
        <br />
        <a
          href="/serviceprovider/register"
          className="text-blue-200 text-sm hover:underline"
        >
          Dont't have an account? <span className="text-white ">Register</span> 
        </a>
        <br/>
        <a
          href="/users/login"
          className="text-blue-200 text-sm hover:underline"
        >
          Login as Customer
        </a>
      </div>
    </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default ServiceProviderLogin;
