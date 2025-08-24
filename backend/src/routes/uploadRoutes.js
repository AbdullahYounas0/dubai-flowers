import express from 'express';
import upload from '../middleware/upload.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// Upload product files (image + model)
router.post('/product', authenticateAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'model', maxCount: 1 }
]), (req, res) => {
  try {
    const files = req.files;
    const result = {};

    if (files.image && files.image[0]) {
      result.imageUrl = `/uploads/images/${files.image[0].filename}`;
    }

    if (files.model && files.model[0]) {
      result.modelUrl = `/uploads/models/${files.model[0].filename}`;
    }

    res.json({
      success: true,
      message: 'Files uploaded successfully',
      data: result
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'File upload failed',
      error: error.message
    });
  }
});

// Handle upload errors
router.use((error, req, res, next) => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File too large. Maximum size is 50MB.'
    });
  }
  if (error.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({
      success: false,
      message: 'Too many files. Maximum 2 files allowed.'
    });
  }
  
  res.status(400).json({
    success: false,
    message: error.message || 'Upload error'
  });
});

export default router;
