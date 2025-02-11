import React from "react";
import Header from "../Main/Header";
import Footer from "./Footer";
import { FaCamera, FaPalette, FaMapMarkerAlt, FaMusic, FaUtensils, FaRing, FaCar, FaUsers, FaBuilding, FaBook, FaLeaf, FaPray } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const services = [
  { name: "Wedding Venue", icon: <FaMapMarkerAlt />, description: "Find the perfect venue for your big day." },
  { name: "Wedding Photography", icon: <FaCamera />, description: "Capture your special moments beautifully." },
  { name: "Bridal Makeup Artist", icon: <FaPalette />, description: "Get the best makeup for your wedding." },
  { name: "Wedding Decorates", icon: <FaLeaf />, description: "Beautiful decorations to enhance your wedding theme." },
  { name: "Wedding Planner", icon: <FaBook />, description: "Professional planners to make your day stress-free." },
  { name: "Bridal Mehendi Artist", icon: <FaPalette />, description: "Exquisite mehendi designs for brides." },
  { name: "Wedding Catering", icon: <FaUtensils />, description: "Delicious food services for your guests." },
  { name: "Wedding Cards", icon: <FaBook />, description: "Creative and elegant wedding invitations." },
  { name: "DJ", icon: <FaMusic />, description: "Get the best DJs to rock your wedding party." },
  { name: "Family Makeup", icon: <FaUsers />, description: "Makeup services for family members." },
  { name: "Wedding Environment", icon: <FaBuilding />, description: "Set the perfect ambiance for your wedding." },
  { name: "Wedding Jewellery", icon: <FaRing />, description: "Stunning jewellery to complement your attire." },
  { name: "Wedding Pandits/Priest", icon: <FaPray />, description: "Experienced pandits for traditional ceremonies." },
];

function ExploreService() {
    const navigate = useNavigate();
    const handleServiceClick = (category) => {
        navigate(`/service?category=${encodeURIComponent(category)}`);
      };
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="container mx-auto py-[100px] px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-white">Explore Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition transform hover:scale-105"
              onClick={() => handleServiceClick(service.name)}
              >
              <div className="text-blue-400 text-5xl mb-4 flex justify-center">{service.icon}</div>
              <h2 className="text-2xl font-semibold text-center mb-3">{service.name}</h2>
              <p className="text-gray-400 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreService;
