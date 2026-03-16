import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
    unique: true,
  },
});

export const Feature = mongoose.model("Feature", featureSchema);
