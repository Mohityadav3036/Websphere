// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { Link } from 'react-router-dom';
// import { FaCalendarAlt, FaClock, FaRupeeSign, FaUser } from 'react-icons/fa';
// import Header from "../Main/Header";
// import backgroundImage from '../images/bghome.jpg';
// import { FaStar } from "react-icons/fa";
// import { RiseLoader } from 'react-spinners';
// import Footer from './Footer';
// import { toast, ToastContainer } from 'react-toastify';

// function UserBooking() {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [showReviewBox, setShowReviewBox] = useState(false);
//     const [reviewText, setReviewText] = useState("");
//     const [rating, setRating] = useState(5);
//     const [selectedBookingId, setSelectedBookingId] = useState(null);
//     const [selectedServiceId, setSelectedServiceId] = useState(null);
//         const [cancelVisibility, setCancelVisibility] = useState({});
//      const [selectedServiceProvider, setSelectedServiceProvider] = useState("");
//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const token = localStorage.getItem('accessToken');
//                 if (!token) {
//                     setError('User not authenticated');
//                     setLoading(false);
//                     return;
//                 }

               

//                 const decodedToken = jwtDecode(token);
//                 const response = await axios.get(
//                     `${process.env.REACT_APP_API_URL}/users/booking`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 console.log("booking",response)
//                 setBookings(Array.isArray(response.data.bookings) ? response.data.bookings : []);

//                 const fetchedBookings = Array.isArray(response.data.bookings) ? response.data.bookings : [];
//                 setBookings(fetchedBookings);
    
                
//             const visibility = {};
//             fetchedBookings.forEach((booking) => {
//                 visibility[booking._id] = booking.status === "Pending" || booking.status === "Confirmed";
//             });
    
//             setCancelVisibility(visibility);
//             } catch (err) {
//                 setError('Failed to fetch bookings');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//     }, []);

//     const handleUpdateStatus = async (bookingId, serviceId, serviceProviderName) => {
//         try {
//             const token = localStorage.getItem("accessToken");
//             if (!token) {
//                 toast("User not authenticated");
//                 return;
//             }
            
//             const newStatus = prompt("Enter new status (Pending, Confirmed, Completed, Cancelled):");
//             if (!newStatus) return;
            
//             const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
//             if (!validStatuses.includes(newStatus)) {
//                 toast("Invalid status. Please enter one of: Pending, Confirmed, Completed, Cancelled.");
//                 return;
//             }
            
//             const response = await axios.put(
//                 `${process.env.REACT_APP_API_URL}/booking/update-status/${bookingId}`,
//                 { status: newStatus },
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
            
//             if (response.status === 200) {
//                 toast("Booking status updated successfully!");
//                 setBookings((prevBookings) =>
//                     prevBookings.map((booking) =>
//                         booking._id === bookingId ? { ...booking, status: newStatus } : booking
//                     )
//                 );
//             }


//             setBookings((prevBookings) =>
//                 prevBookings.map((booking) =>
//                     booking._id === bookingId ? { ...booking, status: newStatus } : booking
//                 )
//             );

//             setCancelVisibility((prev) => ({
//                 ...prev,
//                 [bookingId]: newStatus === "Pending" || newStatus === "Confirmed",
//             }));
        


//             if (newStatus === "Completed") {
//                 setShowReviewBox(true);
//                 setSelectedBookingId(bookingId);
//                 setSelectedServiceId(serviceId); // Store correct service ID
//                 setSelectedServiceProvider(serviceProviderName);
//                 // handleCancelBooking(bookingId) // Store correct provider name
              
//             }
              


            

//         } catch (error) {
//             console.error("Error updating booking status:", error);
//             toast("Failed to update booking status. Try again later.");
//         }
//     };

//     const handleCancelBooking = async (bookingId) => {
//         try {
//             const token = localStorage.getItem("accessToken");
//             if (!token) {
//                 toast("User not authenticated");
//                 return;
//             }
            
//             const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
//             if (!confirmCancel) return;
            
//             const response = await axios.delete(
//                 `${process.env.REACT_APP_API_URL}/booking/cancel/${bookingId}`,
//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             );
            
//             if (response.status === 200) {
//                 toast("Booking cancelled successfully!");
//                 setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
//             }
//         } catch (error) {
//             console.error("Error cancelling booking:", error);
//             toast("Failed to cancel booking. Try again later.");
//         }
//     };

// const handleSubmitReview = async (serviceId) => {
//     try {
//         if (!reviewText.trim()) {
//             toast("Review cannot be empty.");
//             return;
//         }

//         const token = localStorage.getItem("accessToken");
//         if (!token) {
//             toast("User not authenticated");
//             return;
//         }

//         const response = await axios.post(
//             `${process.env.REACT_APP_API_URL}/review/add`,
//             { serviceId, reviewText, rating },
//             {
//                 headers: { Authorization: `Bearer ${token}` },
//             }
//         );

//         if (response.status === 201) {
//             toast("Review submitted successfully!");
//             setShowReviewBox(false);
//             setReviewText("");
//             setRating(5);
//         }
//     } catch (error) {
//         console.error("Error submitting review:", error);
//         toast("Failed to submit review. Try again later.");
//     }
// };

//     return (
//         <div style={{ backgroundImage: `url(${backgroundImage})` }} className="min-h-screen bg-cover bg-center">
//             <Header />
//             <ToastContainer/>
//             <div className="p-6 pt-[100px]">
//                 <h1 className="text-4xl font-extrabold mb-8 text-white text-center">My Bookings</h1>
//                 {loading ? (
//                     <p className="text-white text-center w-full mt-[200px] mb-[200px] "><RiseLoader color='#ffffff'/></p>
//                 ) : error ? (
//                     <p className="text-red-500 text-center">{error}</p>
//                 ) : bookings.length === 0 ? (
//                     <p className="text-white text-center text-3xl mt-[50px] mb-[50px]">No bookings found.</p>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {bookings.map((booking) => (
//                             <div
//                                 key={booking._id}
//                                 className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col"
//                             >
//                                 <div className="flex justify-between items-center mb-4">
//                                     <h2 className="text-2xl font-bold text-gray-900">
//                                     <Link to={`/service/${booking.service._id}`} className="text-blue-600 hover:underline">
//                                         {booking.service.name}
//                                     </Link>
                                    
//                                     </h2>
//                                     <span className="text-sm font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">{booking.status}</span>
//                                 </div>
//                                 <p className="text-gray-600 flex items-center mt-2"><FaUser className="mr-2" />Provider: {booking.serviceProvider.name}</p>
//                                 <div className="flex justify-between text-gray-600 mt-4">
//                                     <div className="w-1/2">
//                                         <h3 className="text-lg font-semibold">Booking Date:</h3>
//                                         <p className="text-xl flex items-center"><FaCalendarAlt className="mr-2" /> {new Date(booking.bookingDate).toLocaleDateString()}</p>
//                                     </div>
//                                     <div className="w-1/2 text-right">
//                                         <h3 className="text-lg font-semibold">Event Date:</h3>
//                                         <p className="text-xl flex items-center justify-end"><FaClock className="mr-2" /> {new Date(booking.eventDate).toLocaleDateString()}</p>
//                                     </div>
//                                 </div>
//                                 <hr className="my-4" />
//                                 <h3 className="text-lg font-semibold">Total Cost:</h3>
//                                 <p className="text-2xl text-gray-800 flex items-center font-bold"><FaRupeeSign className="mr-2" /> {booking.totalCost}</p>
//                                 <div className="flex mt-6 gap-4">
//                                     <button
//                                            onClick={() => handleUpdateStatus(booking._id, booking.service._id, booking.serviceProvider.name)}
//                                         className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800"
//                                     >
//                                         Update Status
//                                     </button>
//                                     {cancelVisibility[booking._id] && (
//                         <button
//                             onClick={() => handleCancelBooking(booking._id)}
//                             className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
//                         >
//                             Cancel Booking
//                         </button>
//                     )}
                                   
//                                 </div>
//                                 {showReviewBox && (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 sm:p-0">
//         <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg relative">
//             {/* Close Button */}
//             <button
//                 className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
//                 onClick={() => setShowReviewBox(false)}
//             >
//                 &times;
//             </button>

//             <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Write a Review</h2>

//             {/* Review Textarea */}
//             <textarea
//                 className="w-full p-2 border rounded-lg h-24"
//                 placeholder="Write your review..."
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//             />

//             {/* Star Rating */}
//             <div className="flex justify-center my-3 sm:my-4">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                     <FaStar
//                         key={star}
//                         className={`text-xl sm:text-3xl cursor-pointer transition-colors ${
//                             star <= rating ? "text-yellow-500" : "text-gray-300"
//                         }`}
//                         onClick={() => setRating(star)}
//                     />
//                 ))}
//             </div>

//             {/* Submit Button */}
//             <button
//                 className="bg-blue-600 text-white px-4 py-2 mt-2 rounded-lg w-full hover:bg-blue-700 transition"
//                 onClick={() => handleSubmitReview(selectedServiceId)}
//             >
//                 Submit Review
//             </button>
//         </div>
//     </div>
// )}


//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//             <Footer/>
 
//         </div>
//     );
// }

// export default UserBooking;












import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaRupeeSign, FaUser } from 'react-icons/fa';
import Header from "../Main/Header";
import backgroundImage from '../images/bghome.jpg';
import { FaStar } from "react-icons/fa";
import { RiseLoader } from 'react-spinners';
import Footer from './Footer';
import { toast, ToastContainer } from 'react-toastify';

function UserBooking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReviewBox, setShowReviewBox] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [cancelVisibility, setCancelVisibility] = useState({});
    const [selectedServiceProvider, setSelectedServiceProvider] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setError('User not authenticated');
                    setLoading(false);
                    return;
                }

                const decodedToken = jwtDecode(token);
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/users/booking`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const fetchedBookings = Array.isArray(response.data.bookings) ? response.data.bookings : [];
                setBookings(fetchedBookings);

                const visibility = {};
                fetchedBookings.forEach((booking) => {
                    visibility[booking._id] = booking.status === "Pending" || booking.status === "Confirmed";
                });

                setCancelVisibility(visibility);
            } catch (err) {
                setError('Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleUpdateStatus = async (bookingId, serviceId, serviceProviderName) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast("User not authenticated");
                return;
            }

            const newStatus = prompt("Enter new status (Pending, Confirmed, Completed, Cancelled):");
            if (!newStatus) return;

            const validStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];
            if (!validStatuses.includes(newStatus)) {
                toast("Invalid status. Please enter one of: Pending, Confirmed, Completed, Cancelled.");
                return;
            }

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/booking/update-status/${bookingId}`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                toast("Booking status updated successfully!");
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, status: newStatus } : booking
                    )
                );
            }

            setCancelVisibility((prev) => ({
                ...prev,
                [bookingId]: newStatus === "Pending" || newStatus === "Confirmed",
            }));

            if (newStatus === "Completed") {
                setShowReviewBox(true);
                setSelectedBookingId(bookingId);
                setSelectedServiceId(serviceId);
                setSelectedServiceProvider(serviceProviderName);
            }
        } catch (error) {
            console.error("Error updating booking status:", error);
            toast("Failed to update booking status. Try again later.");
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast("User not authenticated");
                return;
            }

            const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
            if (!confirmCancel) return;

            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/booking/cancel/${bookingId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                toast("Booking cancelled successfully!");
                setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            toast("Failed to cancel booking. Try again later.");
        }
    };

    const handleSubmitReview = async (serviceId) => {
        try {
            if (!reviewText.trim()) {
                toast("Review cannot be empty.");
                return;
            }

            const token = localStorage.getItem("accessToken");
            if (!token) {
                toast("User not authenticated");
                return;
            }

            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/review/add`,
                { serviceId, reviewText, rating },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 201) {
                toast("Review submitted successfully!");
                setShowReviewBox(false);
                setReviewText("");
                setRating(5);
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            toast("Failed to submit review. Try again later.");
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="min-h-screen bg-cover bg-center">
            <Header />
            <ToastContainer />
            <div className="p-6 pt-[100px]">
                <h1 className="text-4xl font-extrabold mb-8 text-white text-center">My Bookings</h1>
                {loading ? (
                    <p className="text-white text-center w-full mt-[200px] mb-[200px]"><RiseLoader color='#ffffff' /></p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : bookings.length === 0 ? (
                    <p className="text-white text-center text-3xl mt-[50px] mb-[50px]">No bookings found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 flex flex-col"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        <Link to={`/service/${booking.service?._id}`} className="text-blue-600 hover:underline">
                                            {booking.service?.name || "Service Name Not Available"}
                                        </Link>
                                    </h2>
                                    <span className="text-sm font-semibold bg-green-100 text-green-600 px-3 py-1 rounded-full">{booking.status}</span>
                                </div>
                                <p className="text-gray-600 flex items-center mt-2">
                                    <FaUser className="mr-2" />
                                    Provider: {booking.serviceProvider?.name || "Provider Name Not Available"}
                                </p>
                                <div className="flex justify-between text-gray-600 mt-4">
                                    <div className="w-1/2">
                                        <h3 className="text-lg font-semibold">Booking Date:</h3>
                                        <p className="text-xl flex items-center"><FaCalendarAlt className="mr-2" /> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="w-1/2 text-right">
                                        <h3 className="text-lg font-semibold">Event Date:</h3>
                                        <p className="text-xl flex items-center justify-end"><FaClock className="mr-2" /> {new Date(booking.eventDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <h3 className="text-lg font-semibold">Total Cost:</h3>
                                <p className="text-2xl text-gray-800 flex items-center font-bold"><FaRupeeSign className="mr-2" /> {booking.totalCost}</p>
                                <div className="flex mt-6 gap-4">
                                    <button
                                        onClick={() => handleUpdateStatus(booking._id, booking.service?._id, booking.serviceProvider?.name)}
                                        className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800"
                                    >
                                        Update Status
                                    </button>
                                    {cancelVisibility[booking._id] && (
                                        <button
                                            onClick={() => handleCancelBooking(booking._id)}
                                            className="flex-1 bg-red-600 text-white py-3 rounded-md hover:bg-red-700"
                                        >
                                            Cancel Booking
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default UserBooking;