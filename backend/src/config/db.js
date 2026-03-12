import mongoose from "mongoose";

export async function connectToDb() {
  const MONGODB_URI = process.env.MONGODB_URI ?? "";

  if (!MONGODB_URI) {
    throw new Error("Mongodb uri is required.");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.log(`Error while connecting to database: `, error);
    process.exit(1);
  }
}
