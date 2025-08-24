import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === 'images' ? 
      path.join(__dirname, '../../uploads/images') : 
      path.join(__dirname, '../../uploads/models');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 10
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'images') {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid image file type'), false);
      }
    } else if (file.fieldname === 'models') {
      const allowedTypes = ['application/octet-stream'];
      const allowedExtensions = ['.glb', '.gltf'];
      if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(path.extname(file.originalname).toLowerCase())) {
        cb(null, true);
      } else {
        cb(new Error('Invalid model file type'), false);
      }
    } else {
      cb(new Error('Unknown field'), false);
    }
  }
});

// Upload files endpoint
router.post('/files', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'models', maxCount: 2 }
]), (req, res) => {
  try {
    const uploadedFiles = {
      images: req.files.images ? req.files.images.map(file => `/uploads/images/${file.filename}`) : [],
      models: req.files.models ? req.files.models.map(file => `/uploads/models/${file.filename}`) : []
    };

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      message: 'File upload failed'
    });
  }
});

export default router;
