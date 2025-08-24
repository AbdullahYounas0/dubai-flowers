import express from 'express';
import mockDB from '../utils/mockDB.js';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, inStock } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (inStock !== undefined) query.inStock = inStock === 'true';

    const products = await mockDB.findProducts(query);
    
    res.json({
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await mockDB.findProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// Create new product (Admin only)
router.post('/', async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.body.images || [],
      models: req.body.models || [],
      inStock: req.body.inStock !== undefined ? req.body.inStock : true
    };

    const product = await mockDB.createProduct(productData);
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
});

// Update product (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const product = await mockDB.updateProduct(req.params.id, req.body);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
});

// Delete product (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    console.log('Attempting to delete product with ID:', req.params.id);
    const deletedProduct = await mockDB.deleteProduct(req.params.id);
    
    if (!deletedProduct) {
      console.log('Product not found for deletion:', req.params.id);
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    console.log('Product deleted successfully:', deletedProduct);
    res.json({
      success: true,
      message: 'Product deleted successfully',
      data: deletedProduct
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
});

export default router;
