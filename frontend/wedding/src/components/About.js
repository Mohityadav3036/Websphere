// import React from "react";
// import { FaLaptopCode, FaTools, FaHeart } from "react-icons/fa";
// import Header from "../Main/Header";
// function About() {
//   return (
//     <div>
 
//  <Header/>
    
//     <section className="bg-gray-100 py-12 px-6 pt-[100px]">
//       <div className="container mx-auto text-center max-w-4xl">
//         <h2 className="text-4xl font-bold text-gray-800 mb-6">About WedSphere</h2>
//         <p className="text-gray-600 text-lg leading-relaxed mb-8">
//           WedSphere is a one-stop platform for seamless **wedding planning**, offering a variety of services, from **tent arrangements** and **decorations** to **luxury car rentals, DJ setups, and catering**.  
//           Whether you're looking for **photographers, fireworks, or bridal styling**, we've got you covered!  
//           With **customized filters**, users can easily browse services based on **location, budget, and preferences**.
//         </p>

//         {/* Features Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <FaTools className="text-blue-500 text-5xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Comprehensive Services</h3>
//             <p className="text-gray-500 mt-2">
//               From catering to photography, we bring the best wedding services to your doorstep.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <FaHeart className="text-red-500 text-5xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Hassle-Free Booking</h3>
//             <p className="text-gray-500 mt-2">
//               Book trusted service providers with ease and confidence.
//             </p>
//           </div>
//           <div className="p-6 bg-white shadow-md rounded-lg">
//             <FaLaptopCode className="text-green-500 text-5xl mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-gray-700">Powered by MERN Stack</h3>
//             <p className="text-gray-500 mt-2">
//               A **full-stack** solution built for efficiency and reliability.
//             </p>
//           </div>
//         </div>

//         {/* About Mohit Section */}
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Developer</h2>
//         <p className="text-gray-600 text-lg leading-relaxed">
//           Hi, I'm **Mohit**, a passionate **MERN stack developer** 🚀.  
//           I love crafting **scalable**, **efficient**, and **user-friendly** web applications.  
//           My goal with **WedSphere** was to simplify wedding planning and bring together the best services in one place.
//         </p>

//         {/* Contact Button */}
//         <a
//           href="https://wa.me/9685453036"
//         target="_blank"
//         rel="noopener noreferrer"
        
//           className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
//         >
//           Contact Me
//         </a>
//       </div>
//     </section>
//     </div>
//   );
// }

// export default About;


import React from "react";
import { FaLaptopCode, FaTools, FaHeart, FaStar } from "react-icons/fa";
import Header from "../Main/Header";
import Footer from "./Footer";
function About() {
  return (
    <div>

   <Header/>
    <section className="bg-gray-100 py-12 px-6 pt-[100px]">
      <div className="container mx-auto text-center max-w-5xl">
        {/* About WedSphere */}
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About WedSphere</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
  🎉 **Welcome to WedSphere – Your Ultimate Wedding Planning Companion!** 💍✨  
  Planning your dream wedding should be **exciting, effortless, and stress-free**, and that's exactly what WedSphere offers! 🚀  

  💒 Whether it's **stunning tent arrangements**, ✨ breathtaking **decorations**, 🚗 **luxury car rentals**, 🎶 **DJ setups**, or 🍽️ **catering services**, we've got everything you need to make your big day **extraordinary**!  

  📸 Capture every precious moment with our **top-rated photographers**, 🎆 light up the night with **spectacular fireworks**, and 💄 get the perfect **bridal and groom styling** to shine on your special day.  

  🔍 **Easily find and book services that match your location, budget, and preferences** with our **smart filters**. No more endless searching – **WedSphere brings the best wedding vendors right to you!** ❤️  

  💡 **Your Dream Wedding is Just a Click Away!** Are you ready to create unforgettable memories? 🌟
</p>


        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <FaTools className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Comprehensive Services</h3>
            <p className="text-gray-500 mt-2">
              From catering to photography, we bring the best wedding services to your doorstep.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <FaHeart className="text-red-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Hassle-Free Booking</h3>
            <p className="text-gray-500 mt-2">
              Book trusted service providers with ease and confidence.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <FaLaptopCode className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Powered by MERN Stack</h3>
            <p className="text-gray-500 mt-2">
              A **full-stack** solution built for efficiency and reliability.
            </p>
          </div>
        </div>

        {/* About Mohit Section */}
       

        {/* Testimonials Section */}
        <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-6">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: 1, name: "Mohit Yadav", review: "An incredible platform! WedSphere made our dream wedding come true effortlessly." },
            { id: 2, name: "Harshit Goswami", review: "Absolutely loved the seamless booking process and top-quality service providers!" },
            { id: 3, name: "Ayush Dongre", review: "Our wedding planning was stress-free, thanks to WedSphere. Highly recommended!" },
            { id: 4, name: "Ankush Chandore", review: "Best decision ever! The customer service and range of services were outstanding." },
            { id: 5, name: "Anish Mahore", review: "Affordable, reliable, and so convenient. WedSphere exceeded our expectations!" },
            { id: 6, name: "Aniket Gupta", review: "A lifesaver! Everything was perfectly arranged, from decorations to catering." }
          ].map((review) => (
            <div key={review.id} className="p-6 bg-white shadow-lg rounded-lg">
              <div className="flex items-center mb-2">
                {Array(5).fill().map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-xl" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "{review.review}"
              </p>
              <p className="text-gray-800 font-semibold mt-2">{review.name}</p>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-[50px]">Meet the Developer</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
        Hi, I'm Mohit, a dedicated MERN stack developer 🚀 with a passion for building scalable, efficient, and user-friendly web applications. With a keen eye for innovation and seamless user experiences, I strive to create digital solutions that truly make a difference.

WedSphere was born out of my vision to revolutionize wedding planning by bringing together the best services in one intuitive platform. My goal is to simplify the process, ensuring couples can plan their dream wedding effortlessly with trusted service providers at their fingertips.
        </p>

        {/* Contact Button */}
        <a
          href="https://wa.me/9685453036"
        target="_blank"
        rel="noopener noreferrer"
        
          className="mt-6 inline-block bg-blue-900 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300"
        >
          Contact Me
        </a>
      </div>
    </section>
    <Footer/>
    </div>
  );
}

export default About;
