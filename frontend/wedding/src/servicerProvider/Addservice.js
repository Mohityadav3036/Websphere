import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../Main/Header.js";
import { FaUpload } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import bgimage from "../images/bghome.jpg";

function AddService() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    city: "",
  });
  const [files, setFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileNames, setFileNames] = useState([]); // State to store file names
  const navigate = useNavigate();

  const categories = [
    "Wedding Venue",
    "Wedding Photography",
    "Bridal Makeup Artist",
    "Wedding Decorates",
    "Wedding Planner",
    "Bridal Mehendi Artist",
    "Wedding Catering",
    "Wedding Cards",
    "DJ",
    "Family Makeup",
    "Wedding Environment",
    "Wedding Jewellery",
    "Wedding Pandits/Priest",
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
  
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles.map((file) => file.name)); 
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("city", formData.city);

      setIsUploading(true); // Start file upload
      files.forEach((file) => formDataToSend.append("files", file));

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/serviceprovider/add-service`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      setIsUploading(false); // End file upload
      toast.success("Service added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } catch (error) {
      setIsUploading(false);
      toast.error("Failed to add service or upload files.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <ToastContainer/>
      <div
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-900 px-4"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
        }}
      >
        <div className="bg-white border-[3px] mb-[100px] border-gray-700 shadow-lg rounded-lg p-10 max-w-4xl w-full mt-[100px]">
          <h1 className="text-3xl font-bold text-black mb-4 mt-[-20px]">Add New Service</h1>
          <p className="text-gray-600 mb-7 mt-[-5px]">
            Create a new service listing that will be visible to all users.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">Service Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter service name"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter service description"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="₹ 0.00"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>Select category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-2">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                required
              >
                <option value="" disabled>Select city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2">Upload Images</label>
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center relative">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
                <FaUpload className="text-gray-500 text-4xl" />
                {isUploading && (
                  <TailSpin height={30} width={30} color="blue" ariaLabel="uploading"  />
                )}
                <p className="text-sm text-gray-500 mt-2">Drop your images here or click to browse</p>
              </div>
              {fileNames.length > 0 && (
                <ul className="mt-2 text-sm text-gray-700">
                  {fileNames.map((name, index) => (
                    <li key={index}>&bull; {name}</li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white   py-3 px-4 rounded-md hover:bg-blue-800 transition duration-200"
              disabled={isSubmitting}
            >
           {isSubmitting ? (
              <div className="flex justify-center items-center ">
                <TailSpin height={24} width={24} color="white" ariaLabel="submitting" />
              </div>
            ) : (
              "Add Service"
            )}

            </button>

          </form>
          
        </div>
        
       
      </div>
    </>
  );
}

export default AddService;
