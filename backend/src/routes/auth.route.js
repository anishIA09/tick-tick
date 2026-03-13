import { Router } from "express";
import {
  getUserSessionController,
  signinController,
  signupController,
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/session", verifyJwt, getUserSessionController);

export default router;
