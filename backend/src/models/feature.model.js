import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
    unique: true,
  },
  pricing: {
    daily: {
      value: Number,
      isRecommended: {
        type: Boolean,
        default: false,
      },
    },
    monthly: {
      value: Number,
      isRecommended: {
        type: Boolean,
        default: false,
      },
    },
    halfYearly: {
      value: Number,
      isRecommended: {
        type: Boolean,
        default: false,
      },
    },
    yearly: {
      value: Number,
      isRecommended: {
        type: Boolean,
        default: false,
      },
    },
  },
});

export const Feature = mongoose.model("Feature", featureSchema);
