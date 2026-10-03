import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: ['school', 'corporate', 'healthcare', 'hospitality', 'industrial', 'sports', 'security'],
      index: true
    },
    categoryName: {
      type: String,
      required: true
    },
    shortDescription: {
      type: String,
      required: true
    },
    fullDescription: {
      type: String,
      default: ''
    },
    fabric: {
      type: String,
      required: true
    },
    colors: {
      type: [String],
      default: []
    },
    customization: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

productSchema.index({ createdAt: -1 });

export default mongoose.model('Product', productSchema);
