import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "16kb",
  }),
);

app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  }),
);

app.use(cookieParser());

app.use(indexRouter);

export default app;
