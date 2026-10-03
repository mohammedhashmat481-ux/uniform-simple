import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import Product from '../models/Product.js';
import Enquiry from '../models/Enquiry.js';
import Testimonial from '../models/Testimonial.js';
import Faq from '../models/Faq.js';
import { getCache, setCache } from '../utils/cache.js';
import { sendEnquiryEmails } from '../utils/emailService.js';

const router = express.Router();

// Rate limiter for enquiry submissions (5 submissions per IP per hour)
const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Too many enquiry requests from this IP. Please try again in an hour or contact us directly via WhatsApp.' }
});

// POST /api/enquiries
router.post(
  '/enquiries',
  enquiryLimiter,
  [
    body('fullName').trim().notEmpty().withMessage('Full Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone/WhatsApp number is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('uniformType').trim().notEmpty().withMessage('Uniform Type is required')
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
      }

      const { fullName, phone, email, organisation, uniformType, approxQuantity, message, productName } = req.body;

      const enquiry = new Enquiry({
        fullName,
        phone,
        email,
        organisation,
        uniformType,
        approxQuantity: approxQuantity ? parseInt(approxQuantity) : 0,
        message,
        productName,
        status: 'new'
      });

      await enquiry.save();

      // Trigger background emails asynchronously
      sendEnquiryEmails({
        fullName,
        phone,
        email,
        organisation,
        uniformType,
        approxQuantity,
        message,
        productName
      }).catch(err => console.error('Email background send error:', err));

      res.status(201).json({
        success: true,
        message: 'Enquiry submitted successfully! Our team will contact you shortly.',
        enquiryId: enquiry._id
      });
    } catch (error) {
      next(error);
    }
  }
);

// GET /api/products (Public with 5-minute caching)
router.get('/products', async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 20, featured } = req.query;
    const cacheKey = `products_${category || 'all'}_${search || ''}_${page}_${limit}_${featured || ''}`;

    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const query = { isActive: true };
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.featured = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { fabric: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [products, total] = await Promise.all([
      Product.find(query).sort({ featured: -1, createdAt: -1 }).skip(skip).limit(parseInt(limit)),
      Product.countDocuments(query)
    ]);

    const result = {
      success: true,
      products,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    };

    setCache(cacheKey, result, 300); // 5 min TTL
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id
router.get('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
});

// GET /api/faqs (Public with 5-minute caching)
router.get('/faqs', async (req, res, next) => {
  try {
    const cacheKey = 'public_faqs';
    const cachedData = getCache(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const faqs = await Faq.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    const result = { success: true, faqs };

    setCache(cacheKey, result, 300);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/testimonials
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, testimonials });
  } catch (error) {
    next(error);
  }
});

export default router;
