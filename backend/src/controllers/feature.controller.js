import { BadRequestError } from "../lib/api-error.js";
import { ApiResponse } from "../lib/api-response.js";
import { asyncHandler } from "../lib/async-handler.js";
import { Feature } from "../models/feature.model.js";

export const createFeatureController = asyncHandler(async (req, res) => {
  const { name, code, description } = req.body;

  const existingFeature = await Feature.findOne({ code });

  if (existingFeature) {
    throw new BadRequestError({ message: "Feature already exist." });
  }

  await Feature.create({
    name,
    code,
    description,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, { message: "Feature created successfully." }));
});

export const getAllFeaturesController = asyncHandler(async (req, res) => {
  const features = await Feature.find({}).select("-__v");

  return res.status(200).json(
    new ApiResponse(200, {
      data: features,
      message: "Features fetched successfully.",
    }),
  );
});
