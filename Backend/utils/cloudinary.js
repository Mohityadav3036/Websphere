// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadToCloudinary = async (filePath) => {
//   try {
//     const result = await cloudinary.uploader.upload(filePath, {
//       resource_type: "auto",
//     });
//     fs.unlinkSync(filePath); // Delete the temp file
//     return result.secure_url; // Return Cloudinary URL
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     fs.unlinkSync(filePath); // Ensure the temp file is deleted
//     throw new Error("Failed to upload to Cloudinary");
//   }
// };





import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload to Cloudinary directly from memory
export const uploadToCloudinary = async (fileBuffer, fileName) => {
  try {
    console.log("Starting upload to Cloudinary...");
    console.log(`File Name: ${fileName}`);
    console.log(`File Buffer Length: ${fileBuffer.length}`);

    // Upload the file directly to Cloudinary using the buffer
    const result = await cloudinary.uploader.upload(
      `data:application/octet-stream;base64,${fileBuffer.toString('base64')}`,  // Convert buffer to base64
      {
        resource_type: "auto",  // Automatically detect image/video type
        public_id: fileName,    // Optional: Set a custom file name
      }
    );

    console.log("Cloudinary Upload Successful!");
    console.log("Cloudinary Result:", result);

    return result; // Return the Cloudinary result containing the URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload to Cloudinary");
  }
};