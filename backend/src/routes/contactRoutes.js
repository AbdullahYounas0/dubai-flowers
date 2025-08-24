import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email configuration
const createEmailTransporter = () => {
  // For development, we'll simulate email sending
  // In production, you would configure your actual email service
  if (process.env.NODE_ENV === 'production' && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Production email configuration
    return nodemailer.createTransporter({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }
  
  // For development, return null to indicate simulation
  return null;
};

// Send email function with real sending capability
const sendEmail = async (emailData, contactRecord) => {
  const transporter = createEmailTransporter();
  
  const emailContent = `
Contact Form Submission
━━━━━━━━━━━━━━━━━━━━━━

� Name: ${emailData.name}
�📧 Email: ${emailData.email}
📱 Phone: ${emailData.phone || 'Not provided'}
🏷️ Inquiry Type: ${emailData.inquiryType || 'General'}
📝 Subject: ${emailData.subject || 'No subject'}

Message:
${emailData.message}

━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString()}
IP: ${emailData.ipAddress || 'Unknown'}
Submission ID: ${contactRecord.submissionId}
  `;

  if (transporter) {
    // Real email sending
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || emailData.email,
        to: process.env.EMAIL_TO || 'admin@daffofils.com',
        subject: `Contact Form: ${emailData.inquiryType || 'General'} - ${emailData.name}`,
        text: emailContent,
        html: emailContent.replace(/\n/g, '<br>'),
        replyTo: emailData.email
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', result.messageId);
      
      return { 
        success: true, 
        messageId: result.messageId,
        method: 'real'
      };
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      throw error;
    }
  } else {
    // Simulate email sending for development
    console.log('📧 Email would be sent (SIMULATED):', {
      to: process.env.EMAIL_TO || 'admin@daffofils.com',
      from: emailData.email,
      subject: `Contact Form: ${emailData.inquiryType || 'General'} - ${emailData.name}`,
      content: emailContent
    });
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return { 
      success: true, 
      messageId: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      method: 'simulated'
    };
  }
};

// Contact form submission endpoint with database storage
router.post('/submit', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('subject').optional().trim().isLength({ max: 200 }).withMessage('Subject must not exceed 200 characters'),
  body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message must be between 10 and 2000 characters'),
  body('inquiryType').optional().isIn(['general', 'custom', 'wedding', 'corporate', 'delivery', 'complaint']).withMessage('Invalid inquiry type')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Please check your form data',
        errors: errors.array()
      });
    }

    const { name, email, phone, subject, message, inquiryType } = req.body;
    const submissionId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ipAddress = req.ip || req.connection.remoteAddress || 'Unknown';

    console.log('📋 New contact form submission:', {
      name,
      email,
      phone: phone || 'Not provided',
      inquiryType: inquiryType || 'general',
      subject: subject || `Contact from ${name}`,
      submissionId,
      timestamp: new Date().toISOString()
    });

    // Create contact record in database
    const contactData = {
      name,
      email,
      phone: phone || null,
      subject: subject || `Contact from ${name}`,
      message,
      inquiryType: inquiryType || 'general',
      submissionId,
      ipAddress,
      userAgent: req.get('User-Agent') || '',
      referrer: req.get('Referer') || ''
    };

    const contact = new Contact(contactData);
    await contact.save();

    console.log('💾 Contact saved to database:', contact._id);

    try {
      // Send email notification
      const emailResult = await sendEmail({
        name,
        email,
        phone,
        subject: subject || `Contact from ${name}`,
        message,
        inquiryType: inquiryType || 'general',
        ipAddress
      }, contact);

      // Update contact record with email info
      contact.emailSent = emailResult.success;
      contact.emailSentAt = new Date();
      contact.emailMessageId = emailResult.messageId;
      await contact.save();

      console.log('✅ Contact form processed successfully:', {
        submissionId: contact.submissionId,
        contactId: contact._id,
        emailMessageId: emailResult.messageId,
        emailMethod: emailResult.method
      });

      res.json({
        success: true,
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.',
        submissionId: contact.submissionId,
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          inquiryType: contact.inquiryType,
          submittedAt: contact.createdAt,
          emailSent: contact.emailSent
        }
      });

    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError.message);
      
      // Update contact record with email failure
      contact.emailSent = false;
      contact.adminNotes = `Email failed: ${emailError.message}`;
      await contact.save();

      // Still return success to user, but log the email failure
      res.json({
        success: true,
        message: 'Your message has been received! We\'ll get back to you within 24 hours.',
        submissionId: contact.submissionId,
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          inquiryType: contact.inquiryType,
          submittedAt: contact.createdAt,
          emailSent: false
        },
        note: 'Email notification may be delayed'
      });
    }

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'We\'re sorry, there was an issue processing your message. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get contact submissions from database (admin only)
router.get('/submissions', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const inquiryType = req.query.inquiryType;
    
    // Build query
    const query = {};
    if (status) query.status = status;
    if (inquiryType) query.inquiryType = inquiryType;

    // Execute query with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const totalContacts = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        submissions: contacts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalContacts / limit),
          totalSubmissions: totalContacts,
          hasNext: page * limit < totalContacts,
          hasPrev: page > 1,
          limit
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching submissions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get submission statistics from database
router.get('/stats', async (req, res) => {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get basic counts
    const [total, todayCount, weekCount, monthCount] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ createdAt: { $gte: today } }),
      Contact.countDocuments({ createdAt: { $gte: thisWeek } }),
      Contact.countDocuments({ createdAt: { $gte: thisMonth } })
    ]);

    // Get counts by inquiry type
    const inquiryTypeStats = await Contact.aggregate([
      { $group: { _id: '$inquiryType', count: { $sum: 1 } } }
    ]);

    // Get counts by status
    const statusStats = await Contact.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get recent submissions
    const recentSubmissions = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email inquiryType createdAt status');

    // Format aggregation results
    const byInquiryType = {};
    inquiryTypeStats.forEach(item => {
      byInquiryType[item._id] = item.count;
    });

    const byStatus = {};
    statusStats.forEach(item => {
      byStatus[item._id] = item.count;
    });

    const stats = {
      total,
      today: todayCount,
      thisWeek: weekCount,
      thisMonth: monthCount,
      byInquiryType,
      byStatus,
      recentSubmissions
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update contact status (admin only)
router.patch('/submissions/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!['new', 'read', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    contact.status = status;
    if (adminNotes) {
      contact.adminNotes = adminNotes;
    }
    
    if (status === 'read' || status === 'in-progress') {
      contact.respondedAt = new Date();
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('❌ Error updating contact status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating contact status'
    });
  }
});

// Get single contact submission
router.get('/submissions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('❌ Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching contact submission'
    });
  }
});

// Health check for contact service
router.get('/health', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    res.json({
      success: true,
      message: 'Contact service is running',
      timestamp: new Date().toISOString(),
      totalSubmissions: totalContacts,
      database: 'MongoDB connected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Contact service error',
      error: error.message
    });
  }
});

export default router;
