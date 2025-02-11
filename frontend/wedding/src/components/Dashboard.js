import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar,Doughnut } from 'react-chartjs-2';
import { FaUser, FaRupeeSign, FaCalendarAlt, FaCheck, FaTimes, FaChartBar } from 'react-icons/fa';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Header from '../Main/Header';
import Footer from './Footer';

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [monthlyIncomeData, setMonthlyIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [bookingStats, setBookingStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    confirmed: 0,
  });

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
        let id = decodedToken._id;

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/serviceprovider/booking/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const fetchedBookings = response.data.bookings || [];
        setBookings(fetchedBookings);

        // Calculate total income per month
        const monthlyIncome = {};
        const statusCounts = { total: 0, completed: 0, pending: 0, confirmed: 0 };

        fetchedBookings.forEach((booking) => {
          const month = new Date(booking.eventDate).toLocaleString('default', { month: 'short' });

          if (!monthlyIncome[month]) {
            monthlyIncome[month] = 0;
          }
          monthlyIncome[month] += booking.totalCost;

          // Count booking status
          statusCounts.total += 1;
          if (booking.status === 'Completed') statusCounts.completed += 1;
          else if (booking.status === 'Pending') statusCounts.pending += 1;
          else if (booking.status === 'Confirmed') statusCounts.confirmed += 1;
        });

        setMonthlyIncomeData(Object.entries(monthlyIncome).map(([month, total]) => ({ month, totalIncome: total })));
        setBookingStats(statusCounts);
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Monthly Income Data for Pie Chart
  const pieChartData = {
    labels: monthlyIncomeData.map((data) => data.month),
    datasets: [
      {
        label: 'Income by Month',
        data: monthlyIncomeData.map((data) => data.totalIncome),
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFC300', '#FF5733'],
      },
    ],
  };

  // Monthly Sales Data for Bar Chart
  const barChartData = {
    labels: monthlyIncomeData.map((data) => data.month),
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlyIncomeData.map((data) => data.totalIncome),
        backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 205, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(201, 203, 207, 0.7)'
          ], borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          orderWidth: 1
        }
    
    ],
  };

  const doughnutChartData = {
    labels: monthlyIncomeData.map((data) => data.month),
    datasets: [
      {
        label: 'Monthly Income',
        data: monthlyIncomeData.map((data) => data.totalIncome),
        backgroundColor: [
          '#FF5733', // Color for January
          '#33FF57', // Color for February
          '#3357FF', // Color for March
          '#FF33A6', // Color for April
          '#FFC300', // Color for May
          '#FF5733', // Color for June
          // Add more colors as needed for additional months
        ],
        hoverOffset: 4,
      },
    ],
  };


  const lineChartData = {
    labels: monthlyIncomeData.map((data) => data.month),
    datasets: [
      {
        label: 'Monthly Income',
        data: monthlyIncomeData.map((data) => data.totalIncome),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };
  
  
  return (
    <div className='bg-black min-h-screen'>
      <Header />
      <div className="flex items-center justify-center pt-[110px] bg-black">
        <h1 className="text-white text-5xl">Dashboard</h1>
      </div>
      <div className="flex flex-wrap px-6 mt-[10px]">
        
        {/* Left Section */}
        <div className="w-full sm:w-2/3 space-y-8">
          
          {/* ✅ Upper Section - Split into Two Parts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            
            {/* Left Side: Booking Summary */}
            <div className="space-y-4 mt-8">
                {/* Total Bookings */}
                <div className="bg-blue-700 text-white p-7 rounded-lg text-center shadow-md">
                    <h3 className="text-xl font-bold">Total Bookings</h3>
                    <p className="text-3xl font-extrabold">{bookingStats.total}</p>
                </div>

                {/* Completed Bookings */}
                <div className="bg-green-700 text-white p-7 rounded-lg text-center shadow-md">
                    <h3 className="text-xl font-bold">Completed</h3>
                    <p className="text-3xl font-extrabold">{bookingStats.completed}</p>
                </div>

                {/* Confirmed Bookings */}
                <div className="bg-yellow-600 text-white p-7 rounded-lg text-center shadow-md">
                    <h3 className="text-xl font-bold">Confirmed</h3>
                    <p className="text-3xl font-extrabold">{bookingStats.confirmed}</p>
                </div>

                {/* Pending Bookings */}
                <div className="bg-red-700 text-white p-7 rounded-lg text-center shadow-md">
                    <h3 className="text-xl font-bold">Pending</h3>
                    <p className="text-3xl font-extrabold">{bookingStats.pending}</p>
                </div>
            </div>

            {/* Right Side: Pie Chart */}
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md mt-8">
              <h2 className="text-xl font-semibold mb-4">Booking Distribution</h2>
              <Doughnut data={doughnutChartData} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full sm:w-1/3 p-6 mt-2">
          <div className="bg-gray-800 h-[530px] text-white p-6 rounded-md shadow-md flex flex-col">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>

            {/* Scrollable Table Container (Y-axis only) */}
            <div className="overflow-y-auto flex-grow scrollbar-hide">
              <table className="min-w-full table-auto">
                <thead className="sticky top-0 bg-gray-900">
                  <tr>
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Income</th>
                    <th className="py-2 px-4 text-left">Event Date</th>
                    <th className="py-2 px-4 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((user) => (
                    <tr key={user.user.id} className="border-b border-gray-700">
                      <td className="py-2 px-4">{user.user.name}</td>
                      <td className="py-2 px-4"><FaCheck /> {user.totalCost}</td>
                      <td className="py-2 px-4"><FaCalendarAlt /> {new Date(user.eventDate).toISOString().split('T')[0]}</td>
                      <td className="py-2 px-4">
                        {user.status === 'Completed' ? (
                          <span className="text-green-500"><FaCheck /> Completed</span>
                        ) : user.status === 'Confirmed' ? (
                          <span className="text-yellow-500"><FaCheck /> Confirmed</span>
                        ) : (
                          <span className="text-red-500"><FaTimes /> Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <div className='flex flex-wrap'>
        <div className="bg-white w-full sm:w-[45%] ml-[2%] mb-[50px] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white w-full sm:w-[45%] ml-[2%] mb-[50px] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Monthly Income Trend</h2>
          <Line data={lineChartData} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;
