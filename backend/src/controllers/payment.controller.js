import { razorpay } from "../config/razorpay.js";
import { billingConfig } from "../constants/index.js";
import { ApiResponse } from "../lib/api-response.js";
import { asyncHandler } from "../lib/async-handler.js";
import { Plan } from "../models/plan.model.js";

export const createOrderController = asyncHandler(async (req, res) => {
  const { paymentType } = req.body;

  switch (paymentType) {
    case "SUBSCRIPTION": {
      const { locations, features, billingCycle } = req.body;

      const { period, interval } = billingConfig[billingCycle];

      const plan = await Plan.findOne({ code: billingCycle })
        .select("code features")
        .populate("features.featureId", "code")
        .lean();

      const totalAmount = plan.features.reduce((acc, curr) => {
        const featureCode = curr.featureId.code;
        if (features.includes(featureCode)) {
          acc += curr.price * locations;
        }

        return acc;
      }, 0);

      const razorpayPlan = await razorpay.plans.create({
        period,
        interval,
        item: {
          name: `${billingCycle} subscription`,
          description: `User has bought ${features.join(",")}.`,
          amount: totalAmount * 100,
          currency: "INR",
        },
      });

      const subscription = await razorpay.subscriptions.create({
        plan_id: razorpayPlan.id,
        total_count: 999,
      });

      res.status(200).json(
        new ApiResponse(200, {
          data: {
            subscriptionId: subscription.id,
          },
        }),
      );

      break;
    }
  }

  res.send("hello world");
});
