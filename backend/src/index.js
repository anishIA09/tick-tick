import dotenv from "dotenv";
import { connectToDb } from "./config/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT ?? 3000;

connectToDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error while connecting to database: `, error);
  });
