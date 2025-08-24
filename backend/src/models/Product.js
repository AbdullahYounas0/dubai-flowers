import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Scottish', 'Colombian', 'Mixed', 'Seasonal', 'Premium'],
    default: 'Mixed'
  },
  type: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['average', 'premium'],
    default: 'average'
  },
  productType: {
    type: String,
    required: [true, 'Product type is required'],
    enum: ['bouquet', 'arrangement', 'bundle', 'seasonal', 'centerpiece', 'occasion'],
    default: 'bouquet'
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  modelPath: {
    type: String,
    default: null
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 50,
    min: [0, 'Stock quantity cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  specifications: {
    vaseIncluded: {
      type: Boolean,
      default: true
    },
    vaseType: {
      type: String,
      default: 'Crystal'
    },
    longevity: {
      type: String,
      default: '7-10 days'
    },
    flowerCount: {
      type: Number,
      min: 1,
      default: 12
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
productSchema.index({ category: 1, type: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ inStock: 1 });
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ createdAt: -1 });

// Virtual for product URL
productSchema.virtual('url').get(function() {
  return `/product/${this._id}`;
});

// Pre-save middleware
productSchema.pre('save', function(next) {
  if (this.isModified('name') && !this.seo.metaTitle) {
    this.seo.metaTitle = this.name;
  }
  if (this.isModified('description') && !this.seo.metaDescription) {
    this.seo.metaDescription = this.description.substring(0, 160);
  }
  next();
});

export default mongoose.model('Product', productSchema);
