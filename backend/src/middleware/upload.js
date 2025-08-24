import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create upload directories if they don't exist
const createUploadDirs = () => {
  const dirs = ['./uploads', './uploads/images', './uploads/models'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'image') {
      cb(null, './uploads/images');
    } else if (file.fieldname === 'model') {
      cb(null, './uploads/models');
    } else {
      cb(null, './uploads');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image') {
    // Check if image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed for product images!'), false);
    }
  } else if (file.fieldname === 'model') {
    // Check if 3D model
    const allowedTypes = ['.glb', '.gltf'];
    const extension = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(extension) || file.mimetype === 'application/octet-stream') {
      cb(null, true);
    } else {
      cb(new Error('Only .glb and .gltf files are allowed for 3D models!'), false);
    }
  } else {
    cb(new Error('Invalid field name!'), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
    files: 2 // Maximum 2 files (image + model)
  }
});

export default upload;
