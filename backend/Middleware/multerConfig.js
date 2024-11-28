import multer from 'multer';
import path from 'path';

// Define storage for the profile images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/');  // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique file name
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Add file extension
  }
});

// File filter to only accept image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Only image files are allowed!'), false);
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // Maximum file size 5MB
  fileFilter
});

export default upload;
