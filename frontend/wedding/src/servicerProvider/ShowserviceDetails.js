import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Main/Header";
import { FaEdit, FaUpload } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import bgImage from "../images/bghome.jpg";
import { GrLocation } from "react-icons/gr";
import { MdDescription } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { toast,ToastContainer } from "react-toastify";

function ShowserviceDetails() {
    const nevigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // New state for toggling "Show More"
  const token = localStorage.getItem("accessToken");
  const [uploadLoader, setUploadloader] = useState(false);
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/serviceprovider/services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setService(response.data);
    
        setUploadedImages(response.data.images || []);
        setPrice(response.data.price);
        setDescription(response.data.description);
        if (!response.data.reviews || response.data.reviews.length === 0) {
            response.data.reviews = [
              { username: "John Doe", comment: "Great service, highly recommended!" },
              { username: "Jane Smith", comment: "Good quality and professional." },
              { username: "Michael Johnson", comment: "Really satisfied with the work done." },
              { username: "Emily Davis", comment: "Amazing experience. Will definitely use again!" },
              { username: "Chris Brown", comment: "Could be improved, but overall good." },
            ];
          }
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to fetch service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleUpdateDescription = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/serviceprovider/update-service/${id}`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast("Description updated successfully.");
      setIsEditingDescription(false);
    } catch (err) {
      console.error("Error updating description:", err);
      toast("Failed to update description.");
    }
  };

  const handleUpdatePrice = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/serviceprovider/update-service/${id}`,
        { price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast("Price updated successfully.");
      setIsEditingPrice(false);
    } catch (err) {
      console.error("Error updating price:", err);
      toast("Failed to update price.");
    }
  };

  const handleUploadImage = async () => {
    setUploadloader(true);
    if (!newImage) {
      toast("Please select an image to upload.");
      setUploadloader(false);
      return;
    }
  
    const formData = new FormData();
    formData.append("image", newImage);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/serviceprovider/uploadimage/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setUploadedImages([...uploadedImages, response.data.imageUrl1]);
      toast("Image uploaded successfully.");
      setUploadloader(false);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDeleteService = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/serviceprovider/services/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast("Service deleted successfully.");
      setTimeout(() => {
        nevigate(`/serviceprovider/service`);
      }, 3000);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const truncateDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length > 30) {
      return words.slice(0, 30).join(" ") + "...";
    }
    return desc;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <TailSpin color="#FFFFFF" height={50} width={50} />
      </div>
    );
  }

  if (error) {
    return <div className="text-white text-center mt-8">{error}</div>;
  }

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Header />
        <ToastContainer/>
        <div className="container mx-auto p-4 mt-[100px] text-white ">
          <div className="border bg-black bg-opacity-40  border-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <img
                  src={service.images[0]}
                  alt={service.name}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                {/* Review System */}
                <div className="mt-4">
                  {/* Display average rating as stars */}
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-2">Average Rating:</span>
                    <div className="flex">
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
                  </div>

                  {/* Display reviews */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold mb-4">Reviews</h3>
                    {service.reviews.slice(0, 3).map((review, index) => (
                      <div key={index} className="mb-4 border-2 border-white p-2">
                        <p className="font-semibold">{review.username}</p>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}

                    {/* Toggle more/less reviews */}
                    {service.reviews.length > 3 && (
                      <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-blue-500 hover:text-blue-300 mt-2"
                      >
                        {isExpanded ? "Show Less" : "Show More"}
                      </button>
                    )}

                    {/* Show more reviews if expanded */}
                    {isExpanded && service.reviews.slice(3).map((review, index) => (
                      <div key={index} className="mb-4">
                        <p className="font-semibold">{review.username}</p>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-4">{service.name}</h1>
                <div className="flex mt-[30px] ">
                  <GrLocation size={30} />
                  <p className=" ml-[10px] text-xl mb-4">{service.city}</p>
                </div>

                <div className="mb-6">
                  <div className="flex">
                    <MdDescription size={30} />
                    <h3 className="text-xl ml-[10px]  mb-2">Description</h3>
                  </div>

                  <div className="flex items-center border-2 border-white p-2">
                    {isEditingDescription ? (
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md bg-gray-700 text-white"
                      />
                    ) : (
                      <p className="text-gray-300">
                        {isExpanded ? description : truncateDescription(description)}
                        {description.split(" ").length > 30 && (
                          <span
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-500 hover:underline cursor-pointer ml-2"
                          >
                            {isExpanded ? "Show Less" : "More"}
                          </span>
                        )}
                      </p>
                    )}
                    <button
                      onClick={() =>
                        setIsEditingDescription(!isEditingDescription)
                      }
                      className="ml-2 text-blue-500 hover:text-blue-300"
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {isEditingDescription && (
                    <button
                      onClick={handleUpdateDescription}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mt-2"
                    >
                      Update Description
                    </button>
                  )}
                </div>

                <div className="mb-6">
                <div className="flex">
                <GiTakeMyMoney size={40}/>
                <h3 className="text-xl mt-[10px] ml-[10px]">Price</h3>
                </div>
    
                  <div className="flex items-center mt-[20px]">
                    {isEditingPrice ? (
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md bg-gray-700 text-white"
                      />
                    ) : (
                        <>
                        <RiMoneyRupeeCircleFill size={40} />
                      <p className="font-bold text-3xl ml-[10px]"> {price}</p>
                      </>
                    )}
                    <button
                      onClick={() => setIsEditingPrice(!isEditingPrice)}
                      className="ml-2 text-green-500 hover:text-green-300"
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {isEditingPrice && (
                    <button
                      onClick={handleUpdatePrice}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-2"
                    >
                      Update Price
                    </button>
                  )}
                </div>

                <label className="block font-bold mb-2">Upload New Image</label>
                <div className="border-2  border-dashed rounded-md p-6 flex flex-col items-center justify-center relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <FaUpload className="text-gray-500 text-4xl" />
                  <p className="text-sm text-gray-500 mt-2">
                    {newImage ? newImage.name : "Drop your images here or click to browse"}
                  </p>
                </div>

                <div className="mt-6">
                <button
                onClick={handleUploadImage}
                className="bg-purple-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-purple-700 flex items-center"
              >
                {uploadLoader ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  <>
                    <FaUpload className="mr-2" />
                    Upload Image
                  </>
                )}
              </button>
                  <button
                    onClick={handleDeleteService}
                    className="bg-red-600 text-white px-4 py-2 mt-[50px] rounded-md hover:bg-red-700 mt-4 w-full"
                  >
                    Delete Service
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Uploaded Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-white p-3">
                {uploadedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Uploaded Image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowserviceDetails;
