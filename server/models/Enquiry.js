import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    organisation: {
      type: String,
      default: '',
      trim: true
    },
    uniformType: {
      type: String,
      required: true,
      default: 'School Uniforms'
    },
    approxQuantity: {
      type: Number,
      default: 0
    },
    message: {
      type: String,
      default: ''
    },
    productName: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
      index: true
    }
  },
  {
    timestamps: true
  }
);

enquirySchema.index({ createdAt: -1 });

export default mongoose.model('Enquiry', enquirySchema);
