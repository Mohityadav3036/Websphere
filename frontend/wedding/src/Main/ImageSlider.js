// import React, { useState, useEffect } from 'react';
// import image1 from '../images/image1.jpg';
// import image2 from '../images/image2.webp';
// import image3 from '../images/image3.jpg';
// import image4 from '../images/image4.jpg';
// import image5 from '../images/image6.jpg';

// const ImageSlider = () => {
//   const images = [image1, image2, image3, image4, image5];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000); // 2 seconds interval for automatic sliding

//     // Cleanup the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [images.length]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="relative w-full h-full border-white border-[5px] rounded-lg overflow-hidden">
//       <div className="relative w-full h-full">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
//               currentIndex === index ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img
//               src={image}
//               alt="Wedding"
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//       >
//         &#10094;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
//       >
//         &#10095;
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;





import React, { useState, useEffect } from 'react';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.webp';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image6.jpg';

const ImageSlider = () => {
  const images = [image1, image2, image3, image4, image5];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds interval for automatic sliding

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[300px]  sm:h-[400px] md:h-[500px] lg:h-[400px] border-white border-[5px] rounded-lg overflow-hidden">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt="Wedding"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full text-lg sm:text-xl"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full text-lg sm:text-xl"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;

