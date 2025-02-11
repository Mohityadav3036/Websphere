import React from 'react';
import notFoundImage from '../images/notfound.png'; // Import your image
import { useNavigate } from 'react-router-dom';
function NotFoundPage() {

    
        const navigate = useNavigate();
      
        const handleBackToHome = () => {
          navigate('/');
        };
  return (
    <div >

   
    <div className="flex items-center justify-center pt-[100px] pb-[50px] bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <img 
          src={notFoundImage} 
          alt="404 Not Found" 
          className="w-full max-w-xs mx-auto mb-6" 
        />
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">404 - Page Not Found</h2>
        <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
      </div>


      
    </div>
    <div className='flex justify-center bg-gray-100 pb-[200px]'>
      <button className='p-4 bg-black text-white' onClick={handleBackToHome}>Back to Home</button>
    </div>
    </div>
  );
}

export default NotFoundPage;
