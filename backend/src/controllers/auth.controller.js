import { COOKIE_OPTIONS } from "../constants/index.js";
import { BadRequestError, NotFoundError } from "../lib/api-error.js";
import { ApiResponse } from "../lib/api-response.js";
import { asyncHandler } from "../lib/async-handler.js";
import { User } from "../models/user.model.js";

export const signupController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError({ message: "Email already in use." });
  }

  const user = await User.create({
    email,
    password,
  });

  const token = user.generateToken();

  return res
    .status(201)
    .cookie("token", token, COOKIE_OPTIONS)
    .json(
      new ApiResponse(201, {
        message: "User created successfully.",
      }),
    );
});

export const signinController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError({ message: "User not found." });
  }

  const isPasswordMatching = user.isPasswordMatching(password);

  if (!isPasswordMatching) {
    throw new BadRequestError("Invalid password.");
  }

  const token = user.generateToken();

  return res
    .status(200)
    .cookie("token", token, COOKIE_OPTIONS)
    .json(
      new ApiResponse(200, {
        message: "User logged in successfully.",
      }),
    );
});
