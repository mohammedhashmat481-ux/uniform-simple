import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    quote: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    organization: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5
    },
    avatar: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

testimonialSchema.index({ order: 1 });

export default mongoose.model('Testimonial', testimonialSchema);
