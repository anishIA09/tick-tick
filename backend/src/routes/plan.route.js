import { Router } from "express";
import {
  createPlanController,
  getPlansController,
} from "../controllers/plan.controller.js";

const router = Router();

router.post("/", createPlanController);
router.get("/", getPlansController);

export default router;
