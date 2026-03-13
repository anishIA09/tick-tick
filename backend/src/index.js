import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import app from "./app.js";
import { ApiError } from "./lib/api-error.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT ?? 3000;

connectToDb()
  .then(() => {
    app.use((err, req, res, next) => {
      if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
          success: false,
          message: err.message,
          statusCode: err.statusCode,
        });
      }

      return res.status(500).json({
        success: false,
        message:
          process.env.NODE_ENV === "development"
            ? err.message
            : "Something went wrong.",
      });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error while connecting to database: `, error);
  });
