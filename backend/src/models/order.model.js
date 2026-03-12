import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    razorpayOrderId: {
      type: String,
      reqired: true,
    },
    razorpayPaymentId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      deault: "created",
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = mongoose.model("Order", orderSchema);
