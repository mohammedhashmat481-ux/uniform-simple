import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import publicRoutes from './routes/publicRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/uniformdb';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Security & Optimization Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allowed for embedding maps & custom images
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Serve Uploads directory with long cache headers (1 year)
const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir, {
  maxAge: '1y',
  immutable: true
}));

// API Routes
app.use('/api', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Centralized 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Centralized Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('🔥 Centralized Express Error Handler:', err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// Connect to MongoDB & Start Server
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`✅ Connected to local MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 Apex Craft Backend Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failure:', err.message);
    console.log('⚠️ Running server in standalone mode without database connection.');
    app.listen(PORT, () => {
      console.log(`🚀 Apex Craft Backend Server running on http://localhost:${PORT} (Database Offline)`);
    });
  });
