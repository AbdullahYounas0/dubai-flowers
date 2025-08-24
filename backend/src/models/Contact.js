import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 254
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  subject: {
    type: String,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  inquiryType: {
    type: String,
    enum: ['general', 'custom', 'wedding', 'corporate', 'delivery', 'complaint'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'in-progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  },
  referrer: {
    type: String,
    trim: true
  },
  submissionId: {
    type: String,
    required: true
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailSentAt: {
    type: Date
  },
  emailMessageId: {
    type: String,
    trim: true
  },
  responseRequired: {
    type: Boolean,
    default: true
  },
  respondedAt: {
    type: Date
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ inquiryType: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ submissionId: 1 }, { unique: true });

// Virtual for formatted submission date
contactSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual for time since submission
contactSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
});

// Static method to get contacts by status
contactSchema.statics.getByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to get unread contacts
contactSchema.statics.getUnread = function() {
  return this.find({ status: 'new' }).sort({ createdAt: -1 });
};

// Instance method to mark as read
contactSchema.methods.markAsRead = function(adminId) {
  this.status = 'read';
  if (adminId) {
    this.respondedBy = adminId;
  }
  return this.save();
};

// Instance method to generate email subject
contactSchema.methods.getEmailSubject = function() {
  const typeMap = {
    'general': 'General Inquiry',
    'custom': 'Custom Arrangement Request',
    'wedding': 'Wedding Flowers Inquiry',
    'corporate': 'Corporate Event Request',
    'delivery': 'Delivery Question',
    'complaint': 'Customer Feedback'
  };
  
  return `${typeMap[this.inquiryType] || 'Contact Form'} - ${this.name}`;
};

export default mongoose.model('Contact', contactSchema);
