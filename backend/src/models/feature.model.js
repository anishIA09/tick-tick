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
    monthly: {
      type: Number,
      required: true,
    },
    halfYearly: {
      type: Number,
      required: true,
    },
    yearly: {
      type: Number,
      required: true,
    },
  },
});

export const Feature = mongoose.model("Feature", featureSchema);
