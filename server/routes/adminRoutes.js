import express from 'express';
import Product from '../models/Product.js';
import Enquiry from '../models/Enquiry.js';
import Testimonial from '../models/Testimonial.js';
import Faq from '../models/Faq.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload, processImage } from '../middleware/uploadMiddleware.js';
import { clearCache } from '../utils/cache.js';

const router = express.Router();

// Apply admin auth protection to all routes in this file
router.use(requireAdmin);

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const [totalEnquiries, newEnquiries, totalProducts, totalFaqs] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'new' }),
      Product.countDocuments(),
      Faq.countDocuments()
    ]);

    res.json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        totalProducts,
        totalFaqs
      }
    });
  } catch (error) {
    next(error);
  }
});

/* ==================== PRODUCTS CRUD ==================== */

// GET /api/admin/products
router.get('/products', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/products (Supports multi-image upload via multer + sharp)
router.post('/products', upload.array('images', 5), async (req, res, next) => {
  try {
    const { name, category, categoryName, shortDescription, fullDescription, fabric, colors, customization, featured, isActive } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const { url } = await processImage(file.buffer, 'product');
        imageUrls.push(url);
      }
    } else if (req.body.imageUrl) {
      imageUrls.push(req.body.imageUrl);
    }

    const product = new Product({
      name,
      slug: `${slug}-${Date.now()}`,
      category,
      categoryName: categoryName || category,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      fabric,
      colors: typeof colors === 'string' ? colors.split(',').map(c => c.trim()) : (colors || []),
      customization: customization || '',
      featured: featured === 'true' || featured === true,
      isActive: isActive !== 'false' && isActive !== false,
      images: imageUrls.length > 0 ? imageUrls : ['/images/products/school-blazer.webp']
    });

    await product.save();
    clearCache('products_'); // Flush product cache

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', upload.array('images', 5), async (req, res, next) => {
  try {
    const { name, category, categoryName, shortDescription, fullDescription, fabric, colors, customization, featured, isActive } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (name) product.name = name;
    if (category) product.category = category;
    if (categoryName) product.categoryName = categoryName;
    if (shortDescription) product.shortDescription = shortDescription;
    if (fullDescription) product.fullDescription = fullDescription;
    if (fabric) product.fabric = fabric;
    if (colors) product.colors = typeof colors === 'string' ? colors.split(',').map(c => c.trim()) : colors;
    if (customization !== undefined) product.customization = customization;
    if (featured !== undefined) product.featured = featured === 'true' || featured === true;
    if (isActive !== undefined) product.isActive = isActive === 'true' || isActive === true;

    if (req.files && req.files.length > 0) {
      const newUrls = [];
      for (const file of req.files) {
        const { url } = await processImage(file.buffer, 'product');
        newUrls.push(url);
      }
      product.images = newUrls;
    }

    await product.save();
    clearCache('products_');

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/products/:id
router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    clearCache('products_');
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

/* ==================== ENQUIRIES MANAGEMENT ==================== */

// GET /api/admin/enquiries
router.get('/enquiries', async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organisation: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.json({ success: true, enquiries });
  } catch (error) {
    next(error);
  }
});

// PATCH /api/admin/enquiries/:id (Status update)
router.patch('/enquiries/:id', async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({ success: true, enquiry });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/enquiries/:id
router.delete('/enquiries/:id', async (req, res, next) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/enquiries/export (CSV export)
router.get('/enquiries/export', async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    const headers = ['ID', 'Date', 'Full Name', 'Phone', 'Email', 'Organisation', 'Uniform Type', 'Quantity', 'Status', 'Message'];
    const rows = enquiries.map(e => [
      e._id.toString(),
      new Date(e.createdAt).toISOString().split('T')[0],
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.organisation || '').replace(/"/g, '""')}"`,
      `"${(e.uniformType || '').replace(/"/g, '""')}"`,
      e.approxQuantity || 0,
      e.status,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="apexcraft_enquiries.csv"');
    res.send(csvContent);
  } catch (error) {
    next(error);
  }
});

/* ==================== FAQS CRUD ==================== */

// GET /api/admin/faqs
router.get('/faqs', async (req, res, next) => {
  try {
    const faqs = await Faq.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, faqs });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/faqs
router.post('/faqs', async (req, res, next) => {
  try {
    const { question, answer, category, order, isActive } = req.body;
    const faq = new Faq({
      question,
      answer,
      category: category || 'General',
      order: order ? parseInt(order) : 0,
      isActive: isActive !== false
    });
    await faq.save();
    clearCache('public_faqs');
    res.status(201).json({ success: true, faq });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/faqs/:id
router.put('/faqs/:id', async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearCache('public_faqs');
    res.json({ success: true, faq });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/faqs/:id
router.delete('/faqs/:id', async (req, res, next) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    clearCache('public_faqs');
    res.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error) {
    next(error);
  }
});

/* ==================== TESTIMONIALS CRUD ==================== */

// GET /api/admin/testimonials
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json({ success: true, testimonials });
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/testimonials
router.post('/testimonials', async (req, res, next) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res.status(201).json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/testimonials/:id
router.put('/testimonials/:id', async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, testimonial });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/testimonials/:id
router.delete('/testimonials/:id', async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
