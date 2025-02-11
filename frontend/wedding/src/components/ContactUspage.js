import React, { useState } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Header from "../Main/Header";
import backgroundImage from "../images/bghome.jpg";
import Footer from "./Footer";

function ContactUspage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/query/contact-us`, formData);
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message. Try again later." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Header />
      <div className="min-h-screen flex items-center justify-center p-6 pt-[100px]">
        <div className="bg-gray-800 bg-opacity-60 border-2 border-white shadow-lg rounded-lg p-8 max-w-5xl w-full grid md:grid-cols-2 gap-8">
          
          {/* Contact Details Section */}
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-gray-400 mb-6">
              Have questions or need assistance? Reach out to us, and we’ll be happy to help!
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-500 text-xl" />
                <p>support@wedsphere.com</p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-blue-500 text-xl" />
                <p>+91 9685453036</p>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <p>123 Karanwas, Rajgarh [M.P], India</p>
              </div>
            </div>
          </div>
          
          {/* Contact Form Section */}
          <div className="bg-gray-700 p-6 rounded-lg border-2 border-white">
            <h2 className="text-xl font-semibold text-white mb-4">Got an idea? Let's collaborate!</h2>
            {status && (
              <p className={`text-sm mb-3 ${status.type === "success" ? "text-green-400" : "text-red-400"}`}>
                {status.message}
              </p>
            )}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring focus:ring-blue-300 text-white"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring focus:ring-blue-300 text-white"
                  required
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring focus:ring-blue-300 text-white"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring focus:ring-blue-300 text-white"
                required
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring focus:ring-blue-300 text-white"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-800 text-white font-bold py-3 rounded-lg hover:bg-blue-700 border-2 border-black"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUspage;
