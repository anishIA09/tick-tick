import { Router } from "express";
import {
  createFeatureController,
  getAllFeaturesController,
} from "../controllers/feature.controller.js";

const router = Router();

router.get("/", getAllFeaturesController);
router.post("/", createFeatureController);

export default router;
