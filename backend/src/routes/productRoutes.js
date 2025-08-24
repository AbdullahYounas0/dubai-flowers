import express from 'express';
import { body, validationResult, query } from 'express-validator';
import Product from '../models/Product.js';
import { authenticateAdmin, checkPermission } from '../middleware/auth.js';

const router = express.Router();

// Get all products (public)
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('category').optional().isIn(['Scottish', 'Colombian', 'Mixed', 'Seasonal', 'Premium']),
  query('type').optional().isIn(['average', 'premium']),
  query('productType').optional().isIn(['bouquet', 'arrangement', 'bundle', 'seasonal', 'centerpiece', 'occasion']),
  query('featured').optional().isBoolean(),
  query('inStock').optional().isBoolean(),
  query('search').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 12,
      category,
      type,
      productType,
      featured,
      inStock,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (productType) filter.productType = productType;
    if (featured !== undefined) filter.featured = featured === 'true';
    if (inStock !== undefined) filter.inStock = inStock === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate('createdBy', 'username')
        .lean(),
      Product.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalProducts: total,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });

  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'username email');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create product (admin only)
router.post('/', authenticateAdmin, checkPermission('products', 'create'), [
  body('name').notEmpty().trim().isLength({ max: 100 }),
  body('description').notEmpty().trim().isLength({ max: 1000 }),
  body('price').isFloat({ min: 0 }),
  body('category').isIn(['Scottish', 'Colombian', 'Mixed', 'Seasonal', 'Premium']),
  body('type').isIn(['average', 'premium']),
  body('productType').isIn(['bouquet', 'arrangement', 'bundle', 'seasonal', 'centerpiece', 'occasion']),
  body('image').notEmpty(),
  body('stockQuantity').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const productData = {
      ...req.body,
      createdBy: req.admin._id
    };

    const product = new Product(productData);
    await product.save();

    // Populate creator info
    await product.populate('createdBy', 'username email');

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update product (admin only)
router.put('/:id', authenticateAdmin, checkPermission('products', 'update'), [
  body('name').optional().trim().isLength({ max: 100 }),
  body('description').optional().trim().isLength({ max: 1000 }),
  body('price').optional().isFloat({ min: 0 }),
  body('category').optional().isIn(['Scottish', 'Colombian', 'Mixed', 'Seasonal', 'Premium']),
  body('type').optional().isIn(['average', 'premium']),
  body('productType').optional().isIn(['bouquet', 'arrangement', 'bundle', 'seasonal', 'centerpiece', 'occasion']),
  body('stockQuantity').optional().isInt({ min: 0 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const updateData = {
      ...req.body,
      updatedBy: req.admin._id
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy updatedBy', 'username email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });

  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete product (admin only)
router.delete('/:id', authenticateAdmin, checkPermission('products', 'delete'), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
