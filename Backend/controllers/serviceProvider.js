
// For regiter the service Provider :- POST
import { ServiceProvider } from '../models/ServiceProvider.js'; // Import ServiceProvider model
import { Service } from '../models/Service.js';
import { Address } from '../models/Address.js'; // If address is separate model
import jwt from 'jsonwebtoken';
import { upload } from '../middlewares/multer.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import bcrypt from 'bcrypt'
import { Booking } from '../models/Booking.js';
// import { Review } from '../models/Review.js';
const registerServiceProvider = async (req, res) => {
    try {
        const { name, email, password, phone, addressId } = req.body;
     
        // Validate input
        if (!name || !email || !password || !phone || !addressId ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if the service provider already exists by email
        const existingServiceProvider = await ServiceProvider.findOne({ email });
        if (existingServiceProvider) {
            return res.status(400).json({ message: 'Service provider with this email already exists.' });
        }

        // Check if the address exists (optional, if Address is a separate model)
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found.' });
        }

        // Create a new service provider
        const newServiceProvider = new ServiceProvider({
            name,
            email,
            password,
            phone,
            address: addressId,
            // Assuming Address ID is passed from the frontend
        });

        // Save the service provider
        await newServiceProvider.save();

        // Generate tokens (access token and refresh token)
        const accessToken = newServiceProvider.generateAccessToken();
        const refreshToken = newServiceProvider.generateRefreshToken();

        // Save refresh token to the database
        newServiceProvider.refreshToken = refreshToken;
        await newServiceProvider.save();

        // Respond with success message and tokens
        res.status(201).json({
            message: 'Service provider registered successfully.',
            accessToken,
            refreshToken,
            serviceProvider: {
                _id: newServiceProvider._id,
                name: newServiceProvider.name,
                email: newServiceProvider.email,
                phone: newServiceProvider.phone,
                address: newServiceProvider.address,
            },
        });
    } catch (error) {
        console.error('Error during service provider registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


//  For login the service Provider

const loginServiceProvider = async (req,res) => {
    try {
        
        const { email, password,role } = req.body;
         if(role !== "service-provider")
         {
            return res.status(400).json({ message: 'There is some Technical Issue' });
         }
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the service provider by email
        const serviceProvider = await ServiceProvider.findOne({ email });
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Invaild Email' });
        }
    

        const isMatch = await bcrypt.compare(password, serviceProvider.password);
        // Check if the password is correct
        // const isPasswordCorrect = await serviceProvider.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate tokens (access token and refresh token)
        const accessToken = serviceProvider.generateAccessToken();
        const refreshToken = serviceProvider.generateRefreshToken();

        // Save refresh token to the database (optional)
        serviceProvider.refreshToken = refreshToken;
        await serviceProvider.save();

        // Respond with tokens and service provider details
        res.status(200).json({
            message: 'Login successful.',
            accessToken,
            refreshToken,
            serviceProvider: {
                _id: serviceProvider._id,
                name: serviceProvider.name,
                email: serviceProvider.email,
                phone: serviceProvider.phone,
                address: serviceProvider.address,
            },
        });
    } catch (error) {
        console.error('Error during service provider login:', error);
        res.status(500).json({ message: 'Internal server error1.' });
    }
};

// For profile Views :- GET

 const profileServiceProvider = async (req, res) => {
    try {
        // Assuming the user is authenticated and their id is available in req.user
        const serviceProviderId = req.user.id;
     
        // Retrieve the service provider's profile details from the database
        const serviceProvider = await ServiceProvider.findById(serviceProviderId).populate('services address bookings'); // You can populate other fields if needed

        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found.' });
        }

        // Send the service provider's profile data in the response
        res.status(200).json({
            message: 'Profile retrieved successfully.',
            serviceProvider: {
                _id: serviceProvider._id,
                name: serviceProvider.name,
                email: serviceProvider.email,
                phone: serviceProvider.phone,
                address: serviceProvider.address, // If populated
                services: serviceProvider.services, // List of services they offer
                bookings: serviceProvider.bookings, // List of their bookings (if needed)
            },
        });
    } catch (error) {
        console.error('Error during service provider profile retrieval:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

const profileServiceProviderID = async (req, res) => {
    try {
        
        // Assuming the user is authenticated and their id is available in req.user
        const { id } = req.params; 

        
     
        // Retrieve the service provider's profile details from the database
        const serviceProvider = await ServiceProvider.findById(id).populate('services address bookings'); // You can populate other fields if needed
        
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found.' });
        }

        // Send the service provider's profile data in the response
        res.status(200).json({
            message: 'Profile retrieved successfully.',
            serviceProvider: {
                _id: serviceProvider._id,
                name: serviceProvider.name,
                email: serviceProvider.email,
                phone: serviceProvider.phone,
                address: serviceProvider.address, // If populated
                services: serviceProvider.services, // List of services they offer
                bookings: serviceProvider.bookings, // List of their bookings (if needed)
            },
        });
    } catch (error) {
        console.error('Error during service provider profile retrieval:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// for update the profiel :- POST
  
 const updateProfileServiceProvider = async (req, res) => {
    try {
        const { name, password, phone } = req.body; // Extract the fields to update
     
        // Validate input fields
      
       
           
        // Find the service provider by their authenticated ID
        const serviceProvider = await ServiceProvider.findById(req.user.id);
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found.' });
        }

        // Update the fields only if they are provided
        if (name) {
            serviceProvider.name = name;
        }

        if (phone) {
            serviceProvider.phone = phone;
        }


        if (password) {
            // The password is being updated, so it's automatically hashed via the pre-save middleware
            serviceProvider.password = password;
        }

        // Save the updated service provider profile (this will trigger the pre-save middleware for password hashing)
        await serviceProvider.save(); // The pre-save middleware will hash the password if it's changed

        // Respond with the updated service provider's data
        res.status(200).json({
            message: 'Service provider profile updated successfully.',
            serviceProvider: {
                _id: serviceProvider._id,
                name: serviceProvider.name,
                email: serviceProvider.email,
                phone: serviceProvider.phone,
                address: serviceProvider.address,
            },
        });
    } catch (error) {
        console.error('Error during service provider profile update:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// ADD the Services:- POST
// const addServiceByServiceProvider = async (req, res) => {
//     try {
//       console.log("insider rh addservice")
//         const { name, description, price, category,city } = req.body;
//         const serviceProviderId = req.user.id; // Assuming `req.user.id` is set by the authentication middleware
        
//         // Validate input
//         if (!name || !description || !price || !category) {
//           console.log("Missing required fields");
//             return res.status(400).json({ message: 'Service name, description, price, and category are required.' });
//         }

//         console.log("Fields are valid. Proceeding with file upload...");
//         if (!req.files || req.files.length === 0) {
//           console.log("No files uploaded");
//           return res.status(400).json({ message: 'Please upload at least one file.' });
//         }

//         console.log(`Number of files uploaded: ${req.files.length}`);
      

//         const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif','image/webp'];
//         const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];
    
//         // Check the file types
//         const invalidFiles = req.files.filter(file => {
//           // Check if the file is not of an allowed type
//           return !allowedImageTypes.includes(file.mimetype) && !allowedVideoTypes.includes(file.mimetype);
//         });
    
//         if (invalidFiles.length > 0) {
//           console.log("Invalid file types found:", invalidFiles);
//           return res.status(400).json({ message: 'Only image and video files are allowed.' });
//         }
    
//         console.log("File types are valid. Proceeding with file size check...");
//         // Check file sizes (e.g., max 10MB per file)
//         const maxFileSize = 10 * 1024 * 1024; // 10MB
//         const oversizedFiles = req.files.filter(file => file.size > maxFileSize);
    
//         if (oversizedFiles.length > 0) {
//           console.log("Oversized files found:", oversizedFiles);
//           return res.status(400).json({ message: 'File size exceeds the limit of 10MB.' });
//         }
  
//       // Find the ServiceProvider

//         const serviceProvider = await ServiceProvider.findById(serviceProviderId);
//         if (!serviceProvider) {
//           console.log("Service provider not found");
//             return res.status(404).json({ message: 'Service provider not found.' });
//         }

//         // const uploadedFiles = await Promise.all(
//         //     req.files.map((file) => uploadToCloudinary(file.path))
//         //   );

//         const uploadedFiles = await Promise.all(
//           req.files.map(async (file) => {
//             const fileBuffer = file.buffer;  // Get the file's buffer from memory
//             const fileName = `${Date.now()}-${file.originalname}`;  // Generate a unique file name
        
//             console.log(`Uploading file: ${fileName}`);
//             const cloudinaryResult = await uploadToCloudinary(fileBuffer, fileName);
//             console.log(`File uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
//             return cloudinaryResult.secure_url;  // Return the URL of the uploaded file from Cloudinary
//           })
//         );
//         console.log("All files uploaded successfully!");

//               // Separate images and videos based on file type
//     const images = uploadedFiles.filter((url) => url.match(/\.(jpeg|jpg|png|gif)$/i));
//     const videos = uploadedFiles.filter((url) => url.match(/\.(mp4|mov|avi|wmv)$/i));
    
//         // Create a new Service document
//         const newService = new Service({
//             name,
//             description,
//             price,
//             category,
//             images,
//             videos,
//             ServiceProvider: serviceProviderId, // Associate the service with the logged-in service provider
//            city,
//         });

//         // Save the new service to the database
//         await newService.save();

//         // Add the newly created service to the service provider's `services` array
//         serviceProvider.services.push(newService._id);
//         await serviceProvider.save();

//         // Return a success response
//         res.status(201).json({
//             message: 'Service added successfully!',
//             service: newService
//         });
//     } catch (error) {
//         console.error("Error during addServiceByServiceProvider:", error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };


const addServiceByServiceProvider = async (req, res) => {
  try {
    console.log("Inside the addServiceByServiceProvider function");

    const { name, description, price, category, city } = req.body;
    const serviceProviderId = req.user.id; // Assuming `req.user.id` is set by the authentication middleware

    // Validate input
    if (!name || !description || !price || !category) {
      console.log("Missing required fields");
      return res.status(400).json({ message: 'Service name, description, price, and category are required.' });
    }

    console.log("Fields are valid. Proceeding with file upload...");
    if (!req.files || req.files.length === 0) {
      console.log("No files uploaded");
      return res.status(400).json({ message: 'Please upload at least one file.' });
    }

    console.log(`Number of files uploaded: ${req.files.length}`);

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const allowedVideoTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv'];

    // Check the file types
    const invalidFiles = req.files.filter(file => {
      return !allowedImageTypes.includes(file.mimetype) && !allowedVideoTypes.includes(file.mimetype);
    });

    if (invalidFiles.length > 0) {
      console.log("Invalid file types found:", invalidFiles);
      return res.status(400).json({ message: 'Only image and video files are allowed.' });
    }

    console.log("File types are valid. Proceeding with file size check...");

    // Check file sizes (e.g., max 10MB per file)
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const oversizedFiles = req.files.filter(file => file.size > maxFileSize);

    if (oversizedFiles.length > 0) {
      console.log("Oversized files found:", oversizedFiles);
      return res.status(400).json({ message: 'File size exceeds the limit of 10MB.' });
    }

    // Find the ServiceProvider
    const serviceProvider = await ServiceProvider.findById(serviceProviderId);
    if (!serviceProvider) {
      console.log("Service provider not found");
      return res.status(404).json({ message: 'Service provider not found.' });
    }

    // Upload files to Cloudinary
    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileBuffer = file.buffer;  // Get the file's buffer from memory
        const fileName = `${Date.now()}-${file.originalname}`;  // Generate a unique file name

        console.log(`Uploading file: ${fileName}`);
        const cloudinaryResult = await uploadToCloudinary(fileBuffer, fileName);
        console.log(`File uploaded to Cloudinary: ${cloudinaryResult.secure_url}`);
        return cloudinaryResult.secure_url;  // Return the URL of the uploaded file from Cloudinary
      })
    );

    console.log("All files uploaded successfully!");

    // Separate images and videos based on file type
    const images = uploadedFiles.filter((url) => url.match(/\.(jpeg|jpg|png|gif|webp)$/i));
    const videos = uploadedFiles.filter((url) => url.match(/\.(mp4|mov|avi|wmv)$/i));

    // Create a new Service document
    const newService = new Service({
      name,
      description,
      price,
      category,
      images,
      videos,
      ServiceProvider: serviceProviderId, // Associate the service with the logged-in service provider
      city,
    });

    // Save the new service to the database
    await newService.save();

    // Add the newly created service to the service provider's `services` array
    serviceProvider.services.push(newService._id);
    await serviceProvider.save();

    // Return a success response
    res.status(201).json({
      message: 'Service added successfully!',
      service: newService
    });
  } catch (error) {
    console.error("Error during addServiceByServiceProvider:", error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Seen the Services :- GET
// const ServicesByServiceProvider = async (req, res) => {
//     try {
//         const serviceProviderId = req.user.id; // Assuming `req.user.id` is set by the authentication middleware

//         // Validate that the service provider exists
//         const serviceProvider = await ServiceProvider.findById(serviceProviderId);
//         if (!serviceProvider) {
//             return res.status(404).json({ message: 'Service provider not found.' });
//         }

//         // Fetch all services provided by the service provider
//         const services = await Service.find({ ServiceProvider: serviceProviderId }); 

//         // If no services are found, return a message indicating that
//         if (services.length === 0) {
//             return res.status(404).json({ message: 'No services found for this service provider.' });
//         }

//         // Return the list of services
//         res.status(200).json({
//             message: 'Services fetched successfully.',
//             services,
//         });
//     } catch (error) {
//         console.error("Error during fetching services by service provider:", error);
//         res.status(500).json({ message: 'Internal server error.' });
//     }
// };



const ServicesByServiceProvider = async (req, res) => {
 
    try {
        const serviceProviderId = req.user.id; // Assuming `req.user.id` is set by the authentication middleware
               
        // Validate that the service provider exists
        const serviceProvider = await ServiceProvider.findById(serviceProviderId);
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found.' });
        }

        // Fetch all services provided by the service provider
        const services = await Service.find({ ServiceProvider: serviceProviderId })
            .populate({
                path: 'reviews', // Populate the reviews field
                populate: {
                    path: 'reviewer', // Populate reviewer details
                    select: 'username', // Fetch only the username of the reviewer
                }
            });

        // If no services are found, return a message indicating that
        if (services.length === 0) {
            return res.status(404).json({ message: 'No services found for this service provider.' });
        }

        // Process the services to calculate average rating, likes, and add reviewer usernames
        const processedServices = services.map(service => {
            let totalRating = 0;
            let totalLikes = 0;
            let totalReviews = service.reviews.length;

            // Calculate total likes and ratings
            service.reviews.forEach(review => {
                totalRating += review.rating;
                totalLikes += review.likes.length;
            });

            // Calculate the average rating
            const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(2) : 0;

            return {
                ...service.toObject(),
               
                totalLikes,
                totalReviews,
            };
        });

        // Return the list of services with additional information
        res.status(200).json({
            message: 'Services fetched successfully.',
            services: processedServices,
        });
    } catch (error) {
        console.error("Error during fetching services by service provider:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};


// fetch data by id
const GetdatabyID = async (req, res) => {
    
    try {
        const { id } = req.params;
      
        const service = await Service.findById(id);
    
        if (!service) {
          return res.status(404).json({ message: "Service not found." });
        }
    
        res.status(200).json(service);
      } catch (error) {
        console.error("Error fetching service:", error);
        res.status(500).json({ message: "Internal server error." });
      }
};

// Update the services: - POST

const UpdateServiceByServiceProvider = async (req, res) => {
    try {
  
      
      const { id } = req.params; // Assuming serviceId is passed as a URL parameter

      const { name, description, price, category, images, videos,city } = req.body;
     
    //   if (price && typeof price !== 'number') {
    //     return res.status(400).json({ message: 'Price must be a number.' });
    //   }
     
      // Check if the service exists
      const service = await Service.findById(id);
      
      if (!service) {
        return res.status(404).json({ message: 'Service not found.' });
      }
  
      // Check if the service provider is authorized to update this service
      if (service.ServiceProvider.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not authorized to update this service.' });
      }
  
      // Update the service with the provided data
      service.name = name || service.name;
      service.description = description || service.description;
      service.price = price || service.price;
      service.category = category || service.category;
      service.images = images || service.images;
      service.videos = videos || service.videos;
  
      // Save the updated service
      await service.save();
  
      // Return the updated service as a response
      res.status(200).json({
        message: 'Service updated successfully.',
        service,
      });
    } catch (error) {
      console.error('Error during updating service:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

// Seen Booking  :- GET
const BookingServicesInServiceProvider = async (req, res) => {
    try {
 
      // Get the service provider's ID from the authenticated user
      const serviceProviderId = req.user.id; // This assumes the authentication middleware sets req.user

      const serviceProvider = await ServiceProvider.findById(serviceProviderId);
      if (!serviceProvider) {
        return res.status(404).json({ message: 'Service provider not found' });
      }
      // Query the Booking model to get all bookings for the services provided by this service provider
      const bookings = await Booking.find({ serviceProvider: serviceProviderId })
        .populate('user', 'name email') // Populate user details (name, email)
        .populate('service', 'name description price') // Populate service details (name, description, price)
        .exec();
  
      if (bookings.length === 0) {
        return res.status(404).json({ message: 'No bookings found for your services.' });
      }
  
      // Return the list of bookings to the service provider
      res.status(200).json({
        message: 'Bookings fetched successfully.',
        bookings,
      });
    } catch (error) {
      console.error('Error during fetching bookings:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };


// ADD media in services......pending
const uploadMedia = (req,res) => {
    try {
     
    } catch (error) {
    
    }
}



// added the more images
// const uploadImageForService = async (req, res) => {
//     try {
        
//       // Upload the image to Cloudinary
//       const uploadedFiles = await Promise.all(
//         req.files.map((file) => uploadToCloudinary(file.path))
//       );
      

      


//           // Separate images and videos based on file type
//                 const imageUrl1 = uploadedFiles.filter((url) => url.match(/\.(jpeg|jpg|png|gif)$/i));
//       // Extract the Cloudinary image URL
//     //   const imageUrl = result.secure_url;
   
          
//       const { id } = req.params; // Get service ID from URL
     
//       const service = await Service.findById(id); // Find the service by ID
//       if (!service) {
//         return res.status(404).json({ message: 'Service not found.' });
//       }

//       // Add the image URL to the service's images field (or wherever you want to store the image)
//       service.images.push(...imageUrl1);
  
//       // Save the updated service
//       await service.save();
  
//       // Respond with success
//       res.status(200).json({
//         message: 'Image uploaded successfully.',
//         imageUrl1,
//         service,
//       });
//     } catch (error) {
//       console.error('Error during image upload to Cloudinary:', error);
//       res.status(500).json({ message: 'Internal server error.' });
//     }
//   };


const uploadImageForService = async (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded.' });
    }

    // Upload the images to Cloudinary
    const uploadedFiles = await Promise.all(
      req.files.map(async (file) => {
        const fileBuffer = file.buffer; // Get the file buffer from memory
        const fileName = `${Date.now()}-${file.originalname}`; // Generate a unique file name
        const cloudinaryResult = await uploadToCloudinary(fileBuffer, fileName); // Upload to Cloudinary
        return cloudinaryResult.secure_url; // Return the secure URL of the uploaded file
      })
    );

    // Separate images and videos based on file type (if needed)
    const imageUrls = uploadedFiles.filter((url) => url.match(/\.(jpeg|jpg|png|gif|webp)$/i));

    const { id } = req.params; // Get service ID from URL

    // Find the service by ID
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    // Add the image URLs to the service's images field
    service.images.push(...imageUrls);

    // Save the updated service
    await service.save();

    // Respond with success
    res.status(200).json({
      message: 'Images uploaded successfully.',
      imageUrls,
      service,
    });
  } catch (error) {
    console.error('Error during image upload to Cloudinary:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
  // delete the service
  const deleteService = async (req, res) => {
   
    const { id } = req.params; // The service ID from the URL parameter
    const userId = req.user.id; // Assuming you're using JWT authentication and the user's ID is in the request object
   
    try {
      // Find the service by ID
      const service = await Service.findById(id);
        
      // Check if service exists
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Check if the logged-in user is the owner of the service
      if (service.ServiceProvider.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this service' });
      }
  
      // Delete the service
      await Service.deleteOne({ _id: id });
  
      return res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
      console.error('Error deleting service:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };


export  {registerServiceProvider,loginServiceProvider,profileServiceProvider,profileServiceProviderID,updateProfileServiceProvider,addServiceByServiceProvider,
    ServicesByServiceProvider,UpdateServiceByServiceProvider,BookingServicesInServiceProvider,uploadMedia,GetdatabyID,uploadImageForService,deleteService
};