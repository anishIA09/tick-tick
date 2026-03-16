import { BadRequestError } from "../lib/api-error.js";
import { ApiResponse } from "../lib/api-response.js";
import { asyncHandler } from "../lib/async-handler.js";
import { Plan } from "../models/plan.model.js";

export const createPlanController = asyncHandler(async (req, res) => {
  const { name, code, isRecommended, features } = req.body;

  const existingPlan = await Plan.findOne({ code });

  if (existingPlan) {
    throw new BadRequestError({ message: "Plan already exist." });
  }

  await Plan.create({
    name,
    code,
    isRecommended,
    features,
  });

  return res.status(201).json(
    new ApiResponse(201, {
      message: "Plan created successfully.",
    }),
  );
});

export const getPlansController = asyncHandler(async (req, res) => {
  let plans = await Plan.find()
    .populate("features.featureId", "name code description")
    .sort({ sortOrder: 1 })
    .select("-__v -sortOrder")
    .lean();

  plans = plans.map((plan) => ({
    ...plan,
    features: plan.features.map((feature) => {
      return {
        _id: feature.featureId._id,
        name: feature.featureId.name,
        description: feature.featureId.description,
        code: feature.featureId.code,
        price: feature.price,
      };
    }),
  }));

  return res.status(200).json(
    new ApiResponse(200, {
      message: "Plans fetched successfully.",
      data: plans,
    }),
  );
});
