// import multer from "multer";

// const storage = multer.diskStorage({

//   destination: (req, file, cb) => {
//     cb(null, "./public/temp"); // Temporary folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// export const upload = multer({ storage });

import multer from "multer";

// Use memory storage to store files in memory, not on disk
const storage = multer.memoryStorage(); // Store file in memory

export const upload = multer({ storage }); // Apply memory storage for multer