import { ApiError, AuthError } from "../lib/api-error.js";
import { asyncHandler } from "../lib/async-handler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { COOKIE_OPTIONS } from "../constants/index.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.headers?.authorization?.replace("Bearer ", "") || req.cookies?.token;

  if (!token) {
    throw new AuthError({ statusCode: 401, message: "Invalid token." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?.id).select("-password -__v");

    if (!user) {
      throw new ApiError({ statusCode: 401 });
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token", COOKIE_OPTIONS);
      throw new AuthError({ statusCode: 401, message: "Token expired." });
    }

    throw new AuthError({ statusCode: 401, message: "Invalid token." });
  }
});
