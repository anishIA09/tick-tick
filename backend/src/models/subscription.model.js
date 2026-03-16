import mongoose from "mongoose";

const featureItemSchema = new mongoose.Schema({
  featureId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Feature",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ["DAILY", "MONTHLY", "HALF_YEARLY", "YEARLY"],
      required: true,
    },
    features: [featureItemSchema],
    razorpaySubscriptionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "active", "cancelled", "expired"],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
