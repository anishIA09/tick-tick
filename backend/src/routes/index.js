import express from "express";
import authRoutes from "./auth.route.js";
import featureRoutes from "./feature.route.js";

const app = express();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/features", featureRoutes);

export default app;
