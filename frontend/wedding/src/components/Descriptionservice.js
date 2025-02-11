import React, { useState, useEffect, use } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaUpload } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { GrLocation } from "react-icons/gr";
import { MdDescription } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import bgImage from '../images/bghome.jpg'
import Header from "../Main/Header";
import { RiCustomerService2Fill } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import api from "../Apihandleerror";
import {jwtDecode} from "jwt-decode";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify"; 
import "react-datepicker/dist/react-datepicker.css";
import Footer from "./Footer";

import { FadeLoader ,BeatLoader} from "react-spinners";

function BookingModal({ serviceName, price,email,name,serviceId,serviceProvider1,userId,role, onClose }) {
  const [eventDate, setEventDate] = useState(null);
  const [payLoader, setPayloader] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (role !== "user") {
      localStorage.removeItem("accessToken");
     alert("Please log in as a user to proceed.")
      navigate("/users/login");
    }
  }, [role, navigate]);
  const handlePayNow = async () => {
    setPayloader(true);
    if (!eventDate) {
      toast("Please select a date to proceed with payment.");
      setPayloader(false);
      // Delay the next action by 5 seconds
  
      return;
  }
  
   
     
    

    try {

      const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

      // Call backend to create a Razorpay order

      script.onload = async () => { 
      const response = await axios.post( `${process.env.REACT_APP_API_URL}/payment/create-order`, {
        amount: price, // Pass amount in INR
        currency: "INR",
      });

      const { amount, currency, id: order_id } = response.data;
        
         

      const options = {
        key: "rzp_test_PkF9BQAUC6ab47", // Replace with your Razorpay Key ID
        amount: amount, // Amount in paise
        currency: currency,
        name: "WedSphere Payment",
        description: `Booking for ${serviceName}`,
        order_id: order_id,
        handler: async function (response) {
          toast("Payment Successful!");
          
          setPayloader(false)
          
          // Verify the payment on the backend
          await axios.post( `${process.env.REACT_APP_API_URL}/payment/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          try {
            const bookingResponse = await axios.post(`${process.env.REACT_APP_API_URL}/booking/create-booking`, {
              user: userId,                    // The logged-in user ID
              serviceProvider: serviceProvider1, // ID of the service provider
              service: serviceId,               // ID of the booked service
              totalCost: price,
              eventDate: eventDate.toISOString(), // Convert to ISO string for the date
            });
            
            const Booking_Id = bookingResponse.data._id;
            // call the user and serviceProvider

            // const useradd = await axios.post(`${process.env.REACT_APP_API_URL}/`)

            toast("Booking confirmed! Your booking details have been saved.");
            setPayloader(false)
          } catch (bookingError) {

            console.error("Error saving booking:", bookingError);
            toast("Payment succeeded, but there was an error saving your booking.");
            setPayloader(false);
          }

          setTimeout(() => {
  
            onClose();  // Close the modal after the delay
          }, 5000);
         
        },
        prefill: {
          name: name,
          email: email,
        },
        notes: {
          eventDate: eventDate.toISOString(),
        },
        theme: {
          color: "#0b7bfa",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

  


    };
    script.onerror = () => {

      toast("Failed to load Razorpay. Please check your internet connection.");
      setPayloader(false);
    };

   
    } catch (error) {
      console.error("Payment error:", error);
      toast("Payment initiation failed. Please try again1.");
      setPayloader(false);
    }

    
  };

  return (

      <div className="fixed inset-0 bg-black bg-opacity-50  flex items-center justify-center z-50">
      <ToastContainer/>
        <div className="bg-gray-800 p-8 rounded-lg border-2 border-white shadow-lg w-[500px]">
          <h2 className="text-2xl font-bold mb-2 ">Complete Your Booking</h2>
          <p className=" mb-4">Please review your booking details and select a date to proceed with payment</p>
          <p className="mb-2 "><strong>Name:</strong> {name}</p>
          <p className="mb-2"><strong>Email:</strong> {email}</p>
          <p className="mb-2 "><strong>Service:</strong> {serviceName}</p>
          <p className="mb-2 text-lg font-bold "><strong>Price:</strong> ₹{price}</p>
          <label className="block mb-2 font-semibold ">Select Date</label>
          <DatePicker selected={eventDate} onChange={(date) => setEventDate(date)} className="text-black border p-2 rounded-md w-full" placeholderText="Pick a date" />
          <div className="flex justify-between mt-4">
            <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded-md">Cancel</button>

            <button 
      onClick={handlePayNow} 
      className="bg-blue-500 text-white px-4 py-2 rounded-md flex justify-center items-center transition disabled:opacity-50" 
     
    >
      {payLoader ? (
        <BeatLoader color="#fff" height={10} width={3} />
      ) : (
        `Pay ₹${price}`
      )}
    </button>
            
          </div>
        </div>
      </div>
  );
}

export const getReviewsByService = async (serviceId) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/review/${serviceId}`);
      return response.data; // Returns the list of reviews
  } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
  }
};








function Descriptionservice() {
  const nevigate = useNavigate();
  const { id } = useParams();
  const [ service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false); // New state for toggling "Show More"
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [serviceProviderEmail, setServiceProviderEmail] = useState("");
  const [email, setEmail] = useState(""); // New state for email
  const [servicename,setServicename] = useState("");
  const [name, setName] = useState("");
  const [location,setLocation] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [serviceProID,setServiceProID] = useState("");
  const [userId1, setUserId1] = useState("");
  const [role,setRole] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [fetchedReviewsCount, setFetchedReviewsCount] = useState(0);
  const [loaderemail, setLoaderemail] = useState(false);
  useEffect(() => {
    const fetchServiceDetails = async () => {
      const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/service/services/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token in the header
            },
          }
        );

     

        const fetchedReviews = await getReviewsByService(id);
        



        const payload = jwtDecode(token);
      
        setService(response.data);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setUploadedImages(response.data.images || []);
        setEmail(payload.email)
        setName(payload.name)
        setUserId1(payload._id);
        setRole(payload.role)
       
        if (fetchedReviews.length > 0) {
          setService((prevService) => ({ ...prevService, reviews: fetchedReviews }));
      } else {
          setService((prevService) => ({
              ...prevService,
              reviews: [
                  { username: "John Doe", comment: "Great service, highly recommended!" },
                  { username: "Jane Smith", comment: "Good quality and professional." },
                  { username: "Michael Johnson", comment: "Really satisfied with the work done." },
                  { username: "Emily Davis", comment: "Amazing experience. Will definitely use again!" },
                  { username: "Chris Brown", comment: "Could be improved, but overall good." },
              ],
          }));
      }
      
        const serviceId = response.data._id;
        let reviewsToUse = fetchedReviews;
       
        if (reviewsToUse.length > 0) {
          const totalRating = reviewsToUse.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / reviewsToUse.length;
          setAverageRating(avgRating.toFixed(1)); // Round to 1 decimal place
          setFetchedReviewsCount(reviewsToUse.length)
      } else {
          setAverageRating(0);
      }
   
        // Fetch the service provider's details by ID
        const providerResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/serviceprovider/services/${serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setServicename(providerResponse.data.name)
        setLocation(providerResponse.data.city);
       const serviceproviderId = providerResponse.data.ServiceProvider;
     
       setServiceProID(serviceproviderId)
    

       const ServiceproviderResponse = await axios.get(
        `${process.env.REACT_APP_API_URL}/serviceprovider/profile/${serviceproviderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      

        setServiceProviderEmail(ServiceproviderResponse.data.serviceProvider.email); // Set service provider's email
       



     
      } catch (err) {
        console.error("Error fetching service details:", err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Redirect to login if unauthorized
          window.location.href = "/users/login";
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchServiceDetails();
  }, [id]);
  



  const truncateDescription = (desc) => {
    const words = desc.split(" ");
    if (words.length > 30) {
      return words.slice(0, 40).join(" ") + "...";
    }
    return desc;
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    setLoaderemail(true);

    const token = localStorage.getItem("accessToken"); // Get token to authenticate
    
    const formData = {
      userName: name,
      userEmail: email,
      userPhoneNumber,
      serviceProviderEmail, // Send the provider's email
      servicename,
      location,
      descriptionInput,
    };

    

    try {
      // Send email to the service provider with the user's inquiry
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/query/email-send`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUserPhoneNumber('');
        setDescriptionInput('');
        toast("📧 Email sent successfully!");
      } else {
        toast("❌ Failed to send email. Please try again.");
      }
      

      setLoaderemail(false)
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
  };


  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin color="#000" height={50} width={50} />
      </div>
    );
  }

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <Header />
        <ToastContainer />

        <div className="container mx-auto p-4 mt-[100px] text-white">
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
                            index < Math.floor(averageRating)
                              ? "text-yellow-400"
                              : index < Math.ceil(averageRating)
                              ? "text-yellow-300"
                              : "text-gray-400"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-lg">({fetchedReviewsCount})</span>
                    </div>
                  </div>

                  {/* Display reviews */}
                  <div className="mt-4">
            <h3 className="text-xl font-bold mb-4">Reviews</h3>
            {service.reviews && service.reviews.length > 0 ? (
                <>
                    {service.reviews.slice(0, 3).map((review, index) => (
                        <div key={index} className="mb-4 border-2 border-white p-2 rounded-lg">
                            <p className="font-semibold">{review.reviewer?.name || review.username}</p>
                            <p className="text-gray-300">{review.comment}</p>
                        </div>
                    ))}

                    {/* Toggle More/Less Reviews */}
                    {service.reviews.length > 3 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-blue-500 hover:text-blue-300 mt-2"
                        >
                            {isExpanded ? "Show Less" : "Show More"}
                        </button>
                    )}

                    {/* Show More Reviews if Expanded */}
                    {isExpanded &&
                        service.reviews.slice(3).map((review, index) => (
                            <div key={index} className="mb-4 border-2 border-white p-2 rounded-lg">
                                <p className="font-semibold">{review.reviewer?.name || review.username}</p>
                                <p className="text-gray-300">{review.comment}</p>
                            </div>
                        ))}
                </>
            ) : (
                <p className="text-gray-400">No reviews available yet.</p>
            )}
        </div>



                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold mb-4">{service.name}</h1>
                <div className="flex mt-[30px]">
                  <GrLocation size={30} />
                  <p className=" ml-[10px] text-xl mb-4">{service.city}</p>
                </div>

                <div className="mb-6">
                  <div className="flex">
                    <MdDescription size={30} />
                    <h3 className="text-xl ml-[10px]  mb-6">Description</h3>
                  </div>

                  <div className="flex items-center border-2 border-white p-2 rounded-lg">
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
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex">
                    <GiTakeMyMoney size={40} />
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
                  </div>
                </div>

                {/* Comment Box Section */}
                

               <div className="p-6 bg-gray-800 border-2 border-gray-700 rounded-lg max-w-md mx-auto">
                    <h3 className="text-xl font-bold mb-2 text-white">For any Inquiry</h3>
                    <p className="text-sm mb-6 text-gray-300">
                        Fill out the form below and we'll get back to you shortly.
                    </p>
                    <form onSubmit={handleCommentSubmit} className="space-y-4 p-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 mb-2 bg-gray-700 text-white rounded-md"
                    />
                   
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 text-white rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Your Phone Number"
                        value={userPhoneNumber}
                        onChange={(e) => setUserPhoneNumber(e.target.value)}
                        className="w-full p-3 mb-2 bg-gray-700 text-white rounded-md"
                        required
                    />
                      <input
                        type="text"
                        placeholder="Write your Query"
                        value={descriptionInput}
                        onChange={(e) => setDescriptionInput(e.target.value)}
                        className="w-full p-3 mb-2 bg-gray-700 text-white rounded-md"
                    />
             

                <div className="flex justify-center mb-6">
                  <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full py-2 rounded-md flex justify-center items-center transition ${
                      loaderemail ? "cursor-not-allowed opacity-75" : ""
                    }`}
                    disabled={loaderemail} // Disable button while loading
                  >
                    {loaderemail ? <FadeLoader color="#fff" height={10} width={3} /> : "Submit"}
                  </button>
                </div>

          </form>
                    <div className="space-y-4">
                
                <button onClick={() => setShowBookingModal(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md w-full flex items-center justify-center space-x-2">
                    <FiCalendar className="text-lg" />  
                    <span>Booking Service</span>
                </button>
                {showBookingModal && <BookingModal serviceName={servicename} price={price} name={name}  email={email}  serviceId={id} serviceProvider1={serviceProID} userId={userId1} role={role} onClose={() => setShowBookingModal(false)} />}
                </div>

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
      <Footer/>
    </>
  );
}

export default Descriptionservice;
