// import React from "react";
// import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
// import { IoPersonCircleSharp } from "react-icons/io5";
// import { FaWhatsapp } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-6">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
//         {/* About Section */}
//         <div>
//           <h2 className="text-2xl font-bold mb-4 text-white">About WedSphere</h2>
//           <p className="text-gray-300 leading-relaxed">
//           Your one-stop solution for hassle-free wedding planning. 
//             From decor to catering, we bring your dream wedding to life. 
//             We offer top-tier services to ensure your special day is seamless and unforgettable.
//              {/* Whether you need a luxurious venue, exquisite floral arrangements, professional photographers,
//               or premium entertainment, WedSphere is here to make every moment magical. 
//              Trust us to handle every detail with care and expertise. */}
//           </p>
//         </div>

//         {/* Contact Section */}
//         <div className="">
//           <h2 className="text-2xl font-bold mb-4  text-white">Contact Us</h2>
//           <ul className="text-gray-300 space-y-3">
//             <li className="flex justify-center md:justify-start items-center">
//               <FaMapMarkerAlt className="mr-3 text-blue-400" />
//               <span>123 Karanwas, Rajgarh [M.P.], India</span>
//             </li>
//             <li className="flex justify-center md:justify-start items-center">
//               <FaPhoneAlt className="mr-3 text-green-400" />
//               <span>+91 9685453036</span>
//             </li>
//             <li className="flex justify-center md:justify-start items-center">
//               <FaEnvelope className="mr-3 text-red-400" />
//               <span>support@wedsphere.com</span>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media Section */}
//         <div className="">
//           <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
//           <div className="flex justify-center md:justify-start space-x-5">


//             <a href="https://mohit-portfolio-alpha.vercel.app/" 
//             target="_blank" 
//             rel="noopener noreferrer" 
//             className="text-gray-300 hover:text-blue-500 transition transform hover:scale-110">
//             <IoPersonCircleSharp  size={28} />
//             </a>


          

            
//             <a
//         href="https://wa.me/9685453036"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-gray-300 hover:text-green-500 transition transform hover:scale-110"
//       >
//         <FaWhatsapp size={28} />
//       </a>



//             <a href="https://github.com/Mohityadav3036"
//                target="_blank" 
//                 rel="noopener noreferrer"
//              className="text-gray-300 hover:text-gray-500 transition transform hover:scale-110">
              
//               <FaGithub size={28} />
//             </a>


//             <a href="https://www.linkedin.com/in/mohit-yadav-33811024a/" 
//                 target="_blank" 
//                 rel="noopener noreferrer" 
//                 className="text-gray-300 hover:text-gray-500 transition transform hover:scale-110">
//                 <FaLinkedin size={28} />
//           </a>
//           <a href="https://www.instagram.com/mohit3379yadav/" 
//              target="_blank" 
//              rel="noopener noreferrer"
//             className="text-gray-300 hover:text-pink-500 transition transform hover:scale-110">
//               <FaInstagram size={28} />
//             </a>
//           </div>
//         </div>
//       </div>

    
//       {/* Copyright */}
//       <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-5">
//         <p>&copy; {new Date().getFullYear()} <span className="text-white font-semibold">WedSphere</span>. All rights reserved.</p>
//         <p>Mohit Yadav ❤️.</p>
//       </div>
//       <div className=" inset-0 flex items-center justify-center opacity-50">
//         <h1 className="text-[100px] font-extrabold text-white">WEBSPHERE</h1>
//       </div>

//     </footer>
//   );
// }

// export default Footer;









import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-6 w-full">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-white">About WedSphere</h2>
          <p className="text-gray-300 leading-relaxed">
            Your one-stop solution for hassle-free wedding planning. From decor to
            catering, we bring your dream wedding to life. We offer top-tier
            services to ensure your special day is seamless and unforgettable.
          </p>
        </div>

        {/* Contact Section */}
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
          <ul className="text-gray-300 space-y-3">
            <li className="flex justify-center md:justify-start items-center">
              <FaMapMarkerAlt className="mr-3 text-blue-400" />
              <span>123 Karanwas, Rajgarh [M.P.], India</span>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <FaPhoneAlt className="mr-3 text-green-400" />
              <span>+91 9685453036</span>
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <FaEnvelope className="mr-3 text-red-400" />
              <span>support@wedsphere.com</span>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="">
          <h2 className="text-2xl font-bold mb-4 text-white">Follow Us</h2>
          <div className="flex justify-center md:justify-start space-x-5">
            <a
              href="https://mohit-portfolio-alpha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-500 transition transform hover:scale-110"
            >
              <IoPersonCircleSharp size={28} />
            </a>

            <a
              href="https://wa.me/9685453036"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-green-500 transition transform hover:scale-110"
            >
              <FaWhatsapp size={28} />
            </a>

            <a
              href="https://github.com/Mohityadav3036"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500 transition transform hover:scale-110"
            >
              <FaGithub size={28} />
            </a>

            <a
              href="https://www.linkedin.com/in/mohit-yadav-33811024a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-500 transition transform hover:scale-110"
            >
              <FaLinkedin size={28} />
            </a>

            <a
              href="https://www.instagram.com/mohit3379yadav/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-500 transition transform hover:scale-110"
            >
              <FaInstagram size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-10 border-t border-gray-700 pt-5">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">WedSphere</span>. All rights
          reserved.
        </p>
        <p>Mohit Yadav ❤️.</p>
      </div>

      {/* Background Text */}
      <div className="hidden md:flex inset-0 items-center justify-center opacity-50">
        <h1 className="text-[100px] font-extrabold text-white">WEBSPHERE</h1>
      </div>
    </footer>
  );
}

export default Footer;