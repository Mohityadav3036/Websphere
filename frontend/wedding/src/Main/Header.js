// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../images/logoblack.png";
// import { FaUserCircle } from "react-icons/fa";
// import { IoTriangle } from "react-icons/io5";
// import {jwtDecode} from "jwt-decode";

// function Header() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [username, setUsername] = useState("");
//   const [role, setRole] = useState("");
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollPos, setLastScrollPos] = useState(0);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollPos = window.scrollY;
//       const isScrollingUp = currentScrollPos < lastScrollPos;

//       setIsVisible(isScrollingUp || currentScrollPos < 50);
//       setLastScrollPos(currentScrollPos);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollPos]);

//   // Extract username and role from the token (assuming JWT)
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     console.log("this is a token",token)
//     if (token) {
//       try {
//         const payload = jwtDecode(token); // Decode JWT
//         // const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        
//         setRole(payload.role);
//         setUsername(payload.name);
//         console.log("expire time",payload.exp )
//         const currentTime = payload.iat; // Current time in seconds
//         if (payload.exp < currentTime) {
//           handleLogout(); // Token expired, log out the user
//         } else {
//           // Schedule auto-logout when token expires
//           const timeToExpire = (payload.exp - currentTime) * 1000; // Time in milliseconds
//           console.log("time to expire",timeToExpire)
//           const logoutTimer = setTimeout(() => {
//             handleLogout();
//           }, timeToExpire);
//           // handleLogout()
//           // setIsLoggedIn();

//           // Clear timeout if component unmounts or token changes
//           return () => clearTimeout(logoutTimer);
//         }

//       } catch (error) {
//         console.error("Invalid token");
//       }
//     } else {
//       setUsername("");
//       setRole("");
//     }
//   }, [isLoggedIn]);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setIsLoggedIn(false);
//     navigate("/");
//   };

//   return (
//     //  <header className="rounded-full bg-black text-white border-t-2 border-b-2 pr-[70px] border-white p-3 fixed w-full z-50">
//     <header
//       className={`fixed top-0 left-0 w-full bg-black border-2 border-white rounded-full text-white py-4 px-6 shadow-md z-50 transition-transform duration-300 ${
//         isVisible ? "translate-y-0" : "-translate-y-full"
//       }`}
//     >
//       <div className="flex justify-between items-center">
//         {/* Left Section: Logo */}
//         <div className="flex items-center space-x-2">
//           <a href="/">
//             <img
//               src={logo}
//               alt="WedSphere Logo"
//               className="ml-[70px] h-[60px] w-[90px] mt-[-30px] mb-[-30px]"
//             />
//           </a>
//         </div>

//         {/* Right Section: Navigation */}
//         <nav className="space-x-6 flex items-center">
//           <button
//             onClick={() => navigate("/")}
//             className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//           >
//             Home
//           </button>

//           { role === "user"  && isLoggedIn && (
//             <>
//             <button
//             onClick={() => navigate("/service")}
//             className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//           >
//             Services
//           </button>

//           <button
//             onClick={() => navigate("/booking")}
//             className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//           >
//            Booking
//           </button>
//           <button
//                   onClick={() => navigate("/about")}
//                   className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//                 >
//                   About
//                 </button>
//             </>
            

//           )}
          
//           {role === "service-provider" && isLoggedIn && (
//             <>
//             <button
//             onClick={() => navigate("/service")}
//             className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//           >
//             Services
//           </button>
//               <button
//                 onClick={() => navigate("/add-service")}
//                 className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//               >
//                 Add Services
//               </button>
//               <button
//                 onClick={() => navigate("/dashboard")}
//                 className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//               >
//                 Dashboard
//               </button>
//               <button
//             onClick={() => navigate("/serviceprovider/booking")}
//             className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//           >
//            Booking
//           </button>
//           <button
//                   onClick={() => navigate("/about")}
//                   className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//                 >
//                   About
//                 </button>
//             </>
//           )}
//           {role === "" && (
//               <>
//               <button
//             onClick={() => navigate("/service")}
//             className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//           >
//             Services
//           </button>
//                 <button
//                   onClick={() => navigate("/contact-us")}
//                   className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//                 >
//                   Contact Us
//                 </button>
//                 <button
//                   onClick={() => navigate("/about")}
//                   className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
//                 >
//                   About
//                 </button>
//               </>
//             )}

         
//           {isLoggedIn ? (
//             <div className="relative flex items-center">
//               {/* Display Username */}
//               <span className="text-white text-xl font-bold mr-4">{username}</span>

//               {/* Contact Icon */}
//               <FaUserCircle
//                 className="text-white text-3xl cursor-pointer hover:text-blue-500"
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//               />

//               {/* Dropdown Menu */}
//               {dropdownOpen && (
//                 <>
//                   <div className="absolute text-white ml-[100px] mt-[70px]">
//                     <IoTriangle style={{ fontSize: "30px", color: "white" }} />
//                   </div>

//                   <div className="mt-[210px] rounded-md absolute right-0 bg-white text-black shadow-lg w-40">
                   
                    
//                     {role === "service-provider" ? (
//                       <>
//                       <button
//                       onClick={() => navigate("/serviceprovider/profile")}
//                       className="block w-full px-4 py-2 hover:bg-gray-200 "
//                     >
//                       Profile
//                     </button>
//                     <button
//                         onClick={() => navigate("/serviceprovider/service")}
//                         className="block w-full px-4 py-2 hover:bg-gray-200"
//                       >
//                         My Services
//                       </button>
//                       </>
                      
//                     ) : (
//                       <>
//                       <button
//                       onClick={() => navigate("/users/profile")}
//                       className="block w-full px-4 py-2 hover:bg-gray-200 "
//                     >
//                       Profile
//                     </button>
//                       <button
//                         onClick={() => navigate("/booking")}
//                         className="block w-full px-4 py-2 hover:bg-gray-200"
//                       >
//                         Bookings
//                       </button>

//                       </>
                    
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 hover:bg-gray-200"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate("/users/login")}
//               className="bg-blue-700 text-white px-6 py-2 text-xl rounded-lg hover:bg-blue-900"
//             >
//               Get Started
//             </button>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logoblack.png";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Media query hook for responsivenessmobi
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos < lastScrollPos;

      setIsVisible(isScrollingUp || currentScrollPos < 50);
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);

  // Extract username and role from the token (assuming JWT)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = jwtDecode(token);
        setRole(payload.role);
        setUsername(payload.name);

        const currentTime = payload.iat;
        if (payload.exp < currentTime) {
          handleLogout();
        } else {
          const timeToExpire = (payload.exp - currentTime) * 1000;
          const logoutTimer = setTimeout(() => {
            handleLogout();
          }, timeToExpire);
          return () => clearTimeout(logoutTimer);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    } else {
      setUsername("");
      setRole("");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-black border-2 border-white rounded-full text-white py-4 px-6 shadow-md z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Left Section: Logo */}
        <div className="flex items-center space-x-2">
          <a href="/">
            <img
              src={logo}
              alt="WedSphere Logo"
              className={`ml-[70px] h-[60px] w-[90px] mt-[-30px] mb-[-30px] ${
                isMobile ? "ml-[5px] h-[40px] w-[60px]" : ""
              }`}
            />
          </a>
        </div>

        {/* Right Section: Navigation */}
        <nav className="flex items-center">
          {/* Hamburger Menu for Mobile */}
          {isMobile && (
            <div className="relative">
              <button
                onClick={toggleMobileMenu}
                className="text-white mr-[10px] text-3xl focus:outline-none"
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Mobile Menu Dropdown */}
              {isMobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      navigate("/");
                      toggleMobileMenu();
                    }}
                    className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                  >
                    Home
                  </button>

                  {role === "user" && isLoggedIn && (
                    <>
                      <button
                        onClick={() => {
                          navigate("/service");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Services
                      </button>
                      <button
                        onClick={() => {
                          navigate("/booking");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Booking
                      </button>
                      <button
                        onClick={() => {
                          navigate("/about");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        About
                      </button>
                    </>
                  )}

                  {role === "service-provider" && isLoggedIn && (
                    <>
                      <button
                        onClick={() => {
                          navigate("/service");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Services
                      </button>
                      <button
                        onClick={() => {
                          navigate("/add-service");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Add Services
                      </button>
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          navigate("/serviceprovider/booking");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Booking
                      </button>
                      <button
                        onClick={() => {
                          navigate("/about");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        About
                      </button>
                    </>
                  )}

                  {role === "" && (
                    <>
                      <button
                        onClick={() => {
                          navigate("/service");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Services
                      </button>
                      <button
                        onClick={() => {
                          navigate("/contact-us");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        Contact Us
                      </button>
                      <button
                        onClick={() => {
                          navigate("/about");
                          toggleMobileMenu();
                        }}
                        className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                      >
                        About
                      </button>
                    </>
                  )}

                  {/* Login Button for Mobile */}
                  {!isLoggedIn && (
                    <button
                      onClick={() => {
                        navigate("/users/login");
                        toggleMobileMenu();
                      }}
                      className="block w-full px-4 py-2 hover:bg-gray-200 text-left"
                    >
                      Login
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="space-x-6 flex items-center">
              <button
                onClick={() => navigate("/")}
                className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
              >
                Home
              </button>

              {role === "user" && isLoggedIn && (
                <>
                  <button
                    onClick={() => navigate("/service")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => navigate("/booking")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Booking
                  </button>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    About
                  </button>
                </>
              )}

              {role === "service-provider" && isLoggedIn && (
                <>
                  <button
                    onClick={() => navigate("/service")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => navigate("/add-service")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Add Services
                  </button>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate("/serviceprovider/booking")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Booking
                  </button>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    About
                  </button>
                </>
              )}

              {role === "" && (
                <>
                  <button
                    onClick={() => navigate("/service")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => navigate("/contact-us")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-white hover:bg-blue-700 px-2 py-2 text-xl font-bold rounded-md"
                  >
                    About
                  </button>
                </>
              )}
            </div>
          )}

          {/* User Profile and Login/Logout */}
          {isLoggedIn ? (
            <div className="relative flex items-center">
              {!isMobile && (
                <span className="text-white text-xl font-bold mr-4">{username}</span>
              )}
              <FaUserCircle
                className="text-white text-3xl cursor-pointer hover:text-blue-500"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <>
                  <div className="absolute text-white ml-[100px] mt-[70px]">
                    <IoTriangle style={{ fontSize: "30px", color: "white" }} />
                  </div>
                  <div className="mt-[210px] rounded-md absolute right-0 bg-white text-black shadow-lg w-40">
                    {role === "service-provider" ? (
                      <>
                        <button
                          onClick={() => navigate("/serviceprovider/profile")}
                          className="block w-full px-4 py-2 hover:bg-gray-200"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => navigate("/serviceprovider/service")}
                          className="block w-full px-4 py-2 hover:bg-gray-200"
                        >
                          My Services
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate("/users/profile")}
                          className="block w-full px-4 py-2 hover:bg-gray-200"
                        >
                          Profile
                        </button>
                        <button
                          onClick={() => navigate("/booking")}
                          className="block w-full px-4 py-2 hover:bg-gray-200"
                        >
                          Bookings
                        </button>
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            !isMobile && (
              <button
                onClick={() => navigate("/users/login")}
                className="bg-blue-700 text-white px-6 py-2 text-xl rounded-lg hover:bg-blue-900"
              >
                Get Started
              </button>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

// Custom hook to detect screen size
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export default Header;