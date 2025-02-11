import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../Main/Header";
import { FaMapMarkerAlt } from "react-icons/fa";
import bgImage from "../images/bghome.jpg";
import Footer from "../components/Footer.js";
import { FadeLoader } from "react-spinners";
function  ShowService() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/serviceprovider/services`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setServices(response.data.services);

      } catch (err) {
        console.error("Error fetching services:", err);
        // setError("Failed to fetch services.");
        // toast.error("Failed to fetch services.");
        
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <div className="text-gray-500 text-xl"><FadeLoader /></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Header />
      <div className="container mx-auto p-4 mt-[100px] w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          Our Services
        </h1>
        <div className="bg-black bg-opacity-40 border-2 border-white rounded-lg shadow-lg ml-[5%] mr-[5%] sm:ml-[10%] sm:mr-[10%] md:ml-[20%] md:mr-[20%]  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-[30px] py-[30px]">
            {services.length === 0 ? (
              <p className="text-white">No services available.</p>
            ) : (
              services.map((service) => (
                <div
                  key={service._id}
                  className="bg-white border-2 border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={service.images[0]}
                      alt={service.name}
                      className="w-full h-56 object-cover"
                    />
                  </div>

                  {/* Details Section */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {service.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-sm text-yellow-500">
                      <div className="flex text-lg">
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={`${
                            index < Math.floor(service.averageRating)
                              ? "text-yellow-400"
                              : index < Math.ceil(service.averageRating)
                              ? "text-yellow-300"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-lg">({service.averageRating})  </span>
                    </div>
                        {/* <span className="text-gray-500">
                          ({service.reviews || 0} reviews)
                        </span> */}
                      </div>
                    </div>

                    {/* Location and Category */}
                    <div className="text-gray-500 text-sm mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      <p>{service.city}</p>
                    </div>
                    <p>{service.category || "Category not specified"}</p>

                    {/* Price */}
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>
                        ₹ {service.price}{" "}
                        <span className="text-sm font-semibold">per day</span>
                      </span>
                    </div>

                    <div className="flex justify-center mt-[18px]">
                      <button
                        className="bg-black opacity-90 text-white px-[30%] py-2 rounded-md hover:bg-gray-900 transition"
                        onClick={() => navigate(`${service._id}`)} // Navigate with ObjectId
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ShowService;
