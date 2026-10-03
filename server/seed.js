import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import Product from './models/Product.js';
import Enquiry from './models/Enquiry.js';
import Testimonial from './models/Testimonial.js';
import Faq from './models/Faq.js';
import AdminUser from './models/AdminUser.js';

import { ALL_CATALOGUE_PRODUCTS } from '../src/data/catalogueProducts.js';
import { FAQS_DATA } from '../src/data/faqsData.js';
import { TESTIMONIALS } from '../src/data/dummyData.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uniformdb';

async function seedDatabase() {
  try {
    console.log(`Connecting to MongoDB at ${MONGODB_URI}...`);
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // Clear existing collections
    await Promise.all([
      Product.deleteMany({}),
      Faq.deleteMany({}),
      Testimonial.deleteMany({}),
      AdminUser.deleteMany({})
    ]);
    console.log('Cleared existing collections.');

    // 1. Seed First Admin User
    const passwordHash = await bcrypt.hash('admin@123', 10);
    const adminUser = new AdminUser({
      username: 'admin',
      email: 'admin@gmail.com',
      passwordHash: passwordHash,
      role: 'superadmin'
    });
    await adminUser.save();
    console.log('✅ Admin user created: admin@gmail.com / admin@123');

    // 2. Seed 16+ Products
    const productDocs = ALL_CATALOGUE_PRODUCTS.map(p => ({
      name: p.name,
      slug: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category: p.category,
      categoryName: p.categoryName,
      shortDescription: p.shortDescription,
      fullDescription: `${p.shortDescription} Engineered specifically for commercial durability, precision fit, and long-term color fastness. Sourced from certified textile mills with custom institutional branding.`,
      fabric: p.fabric,
      colors: p.colors,
      customization: p.customization,
      featured: p.featured,
      isActive: true,
      images: [p.image]
    }));
    await Product.insertMany(productDocs);
    console.log(`✅ Seeded ${productDocs.length} uniform products.`);

    // 3. Seed 16+ FAQs
    const faqDocs = FAQS_DATA.map((f, idx) => ({
      question: f.question,
      answer: f.answer,
      category: f.category,
      order: idx + 1,
      isActive: true
    }));
    await Faq.insertMany(faqDocs);
    console.log(`✅ Seeded ${faqDocs.length} institutional FAQs.`);

    // 4. Seed 3 Testimonials
    const testimonialDocs = TESTIMONIALS.map((t, idx) => ({
      quote: t.quote,
      name: t.name,
      title: t.title,
      organization: t.organization,
      rating: t.rating,
      avatar: t.avatar,
      order: idx + 1,
      isActive: true
    }));
    await Testimonial.insertMany(testimonialDocs);
    console.log(`✅ Seeded ${testimonialDocs.length} client testimonials.`);

    console.log('\n🎉 Database Seed Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
