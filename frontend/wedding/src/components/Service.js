


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import bgImage from "../images/bghome.jpg";
import Header from "../Main/Header";
import Footer from "./Footer";
import FilterComponent from "./FilterComponent";
import { FadeLoader } from "react-spinners";


const categories = [
  "Wedding Venue", "Wedding Photography", "Bridal Makeup Artist",
  "Wedding Decorates", "Wedding Planner", "Bridal Mehendi Artist",
  "Wedding Catering", "Wedding Cards", "DJ", "Family Makeup",
  "Wedding Environment", "Wedding Jewellery", "Wedding Pandits/Priest",
];

const cities = [
  "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Amravati", "Amritsar", 
  "Aurangabad", "Bareilly", "Bengaluru", "Bhopal", "Bhubaneswar", "Bikaner", 
  "Chandigarh", "Chennai", "Coimbatore", "Dehradun", "Delhi", "Dhanbad", 
  "Faridabad", "Gandhinagar", "Gaya", "Ghaziabad", "Guntur", "Guwahati", 
  "Gwalior", "Howrah", "Hyderabad", "Indore", "Itanagar", "Jabalpur", "Jaipur", 
  "Jamshedpur", "Jodhpur", "Kanpur", "Kalyan-Dombivli", "Kolkata", "Kota", 
  "Lucknow", "Ludhiana", "Madurai", "Mangalore", "Meerut", "Mumbai", 
  "Muzaffarpur", "Mysore", "Nagpur", "Nashik", "Navi Mumbai", "Noida", "Patna", 
  "Pondicherry", "Pune", "Raipur","Rajgarh", "Rajkot", "Ranchi", "Rourkela", "Salem", 
  "Shillong", "Shimla", "Siliguri", "Srinagar", "Solapur", "Surat", "Thane", 
  "Thrissur", "Tirupati", "Trivandrum", "Udaipur", "Ujjain", "Vadodara", 
  "Varanasi", "Vasai-Virar", "Vellore", "Vijayawada", "Visakhapatnam", "Warangal"
];

function Service() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: "", city: "", price: "" });

  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract category from URL if coming from ExploreService.js
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get("category");

    if (selectedCategory) {
      setFilters((prev) => ({ ...prev, category: selectedCategory }));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/service/all-service`);
        setServices(response.data);
        setFilteredServices(response.data); // Initially show all services
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filtered = services;

    if (filters.category) {
      filtered = filtered.filter((service) => service.category === filters.category);
    }
    if (filters.city) {
      filtered = filtered.filter((service) => service.city === filters.city);
    }
    if (filters.price) {
      const [minPrice, maxPrice] = filters.price.split("-").map(Number);
      filtered = filtered.filter((service) => service.price >= minPrice && service.price <= maxPrice);
    }

    setFilteredServices(filtered);
  }, [filters, services]);

  // Handle manual filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <div className="text-gray-500 text-xl"><FadeLoader /></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: `url(${bgImage})` }}>
      <Header />
      <div className="container mx-auto p-6 mt-[100px] w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          {filters.category ? `${filters.category} Services` : "All Services"}
        </h1>

        {/* Filter Component for Manual Selection */}
        <FilterComponent categories={categories} cities={cities} onFilterChange={handleFilterChange} />

        <div className="bg-black bg-opacity-40 border-2 border-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.length === 0 ? (
              <p className="text-white text-center">No services available.</p>
            ) : (
              filteredServices.map((service) => (
                <div key={service._id} className="bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-lg transition">
                  <div className="relative">
                    <img src={service.images[0]} alt={service.name} className="w-full h-56 object-cover" />
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-800">{service.name}</h3>
                    <div className="text-gray-500 text-sm flex items-center">
                      <FaMapMarkerAlt className="mr-2" />
                      <p>{service.city}</p>
                    </div>
                    <p className="text-sm text-gray-600">{service.category}</p>
                    <div className="text-lg font-bold">₹ {service.price} per day</div>

                    <div className="flex justify-center mt-4">
                      <button
                        className="bg-black opacity-90 text-white px-6 py-2 rounded-md hover:bg-gray-900 transition"
                        onClick={() => navigate(`/service/${service._id}`)}
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
      <Footer />
    </div>
  );
}

export default Service;
