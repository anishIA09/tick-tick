import mongoose from "mongoose";

const planFeatureSchema = new mongoose.Schema({
  featureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    unique: true,
  },
  isRecommended: {
    type: Boolean,
    default: false,
  },
  sortOrder: {
    type: Number,
    required: true,
  },
  features: [planFeatureSchema],
});

export const Plan = mongoose.model("Plan", planSchema);
