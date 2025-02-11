// import React from 'react';
// import ImageSlider from './ImageSlider.js';
// import mainimage from '../images/bghome.jpg'
// import Header from './Header.js';
// import { useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer.js';
// function Home() {
//   const navigate = useNavigate();
//   return (
//     <>
//         <div className=' '>
//             <Header/>
//         </div>
   
//     <div className="flex h-screen bg-cover " style={{ backgroundImage: `url(${mainimage})` }} >

//       {/* Left Section */}
//       <div className="w-1/2 p-10  flex flex-col mt-[100px]  ">
//       <h1 className='text-white text-[60px] font-extrabold'>Create Your Perfect</h1>
//       <h1 className='text-white text-[60px] font-extrabold '> <span className="text-blue-500"> Wedding Day </span> </h1>
   
//       <h1 className=' text-[#FFD700] text-[30px] font-extrabold animate-text mt-[50px]'># Online Wedding Planning Assistant</h1>
//         <p className="text-white text-2xl mt-10 font-bold">
//           Tranform Your Special Day Into A Unforgettable Experience With Our Comprehensive Wedding Management Solution.
//         </p>
//         <div className="mt-12 flex space-x-4">
//           <button className=" text-white font-bold text-2xl border-2 border-white  hover:bg-blue-900 py-6 px-8 rounded-lg mr-[30px]"
//           onClick={() => navigate("/explore-service")}
//           >Explore Services</button>
//               <button
//                 className="backdrop-blur-3xl font-bold border-2 border-white text-2xl text-white py-6 px-8 rounded-lg hover:bg-blue-900 hover:text-white"
//                 onClick={() => navigate("/contact-us")}
//               >
//                 Contact Us
//         </button>
//         </div>
//       </div>
//       {/* Right Section (Image Slider) */}
//       <div className="w-2/5 h-[400px] mt-[170px]">
//         <ImageSlider />
//       </div>
//     </div>
//     <div>
//       <Footer/>
//     </div>
//     </>
//   );
// }

// export default Home;








import React from 'react';
import ImageSlider from './ImageSlider.js';
import mainimage from '../images/bghome.jpg';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer.js';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
    
    <div>
        <Header />
      </div>

      <div
        className="flex-grow flex flex-col lg:flex-row h-screen h-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${mainimage})` }}
      >

        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-4 lg:p-10 flex flex-col mt-[80px] lg:mt-[100px] text-center lg:text-left">
          <h1 className="text-white text-[40px] lg:text-[60px] font-extrabold">
            Create Your Perfect
          </h1>
          <h1 className="text-white text-[40px] lg:text-[60px] font-extrabold">
            <span className="text-blue-500">Wedding Day</span>
          </h1>

          <h1 className="text-[#FFD700] text-[20px] lg:text-[30px] font-extrabold animate-text mt-[30px] lg:mt-[50px]">
            # Online Wedding Planning Assistant
          </h1>
          <p className="text-white text-lg lg:text-2xl mt-6 lg:mt-10 font-bold">
            Transform Your Special Day Into An Unforgettable Experience With Our
            Comprehensive Wedding Management Solution.
          </p>
          <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              className="text-white font-bold text-lg lg:text-2xl border-2 border-white hover:bg-blue-900 py-4 lg:py-6 px-6 lg:px-8 rounded-lg"
              onClick={() => navigate("/explore-service")}
            >
              Explore Services
            </button>
            <button
              className="backdrop-blur-3xl font-bold border-2 border-white text-lg lg:text-2xl text-white py-4 lg:py-6 px-6 lg:px-8 rounded-lg hover:bg-blue-900 hover:text-white"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Section (Image Slider) */}
        <div className=" w-full lg:w-2/5 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[500px] mt-[50px] lg:mt-[170px] flex justify-center lg:justify-end">
      <ImageSlider />
      </div>
  
      </div>
      <div className="mt-auto ">
    <Footer />
  </div>   
  </div>
    
  );
}

export default Home;