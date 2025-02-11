import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Main/Header";
import backgroundImage from "../images/bghome.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    newPassword: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            newPassword: "",
          });
        }
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("User not authenticated");
        return;
      }

      const updateData = {
        name: user.name,
        phone: user.phone,
        password: user.newPassword,
      };

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/users/updateprofile`, updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully!");
        setUser({ ...user, newPassword: "" });
      }

      localStorage.removeItem("accessToken");
      setTimeout(() => navigate("/users/login"), 3000);
    } catch (err) {
      setError("Failed to update profile. Try again later.");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }} className="min-h-screen bg-cover bg-center">
      <Header />
      <div className="flex justify-center items-center min-h-screen pt-[50px]">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Profile Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-full text-3xl font-bold text-white">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">User Profile</h2>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Email (Read-Only) */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Email (Cannot be changed)</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
              </div>

              {/* Change Password */}
              <div>
                <label className="block text-gray-700 font-semibold mb-1">New Password (Optional)</label>
                <input
                  type="password"
                  name="newPassword"
                  value={user.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Enter new password"
                />
              </div>

              {/* Success Message */}
              {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default UserProfile;
