import express from 'express';
import mockDB from '../utils/mockDB.js';

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard-stats', async (req, res) => {
  try {
    const stats = await mockDB.getDashboardStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics'
    });
  }
});

// Get admin profile
router.get('/profile', async (req, res) => {
  try {
    // In a real app, this would get the admin from the token
    const admin = await mockDB.findAdminByEmail('admin@daffofils.com');
    
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        createdAt: admin.createdAt
      }
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile'
    });
  }
});

export default router;
