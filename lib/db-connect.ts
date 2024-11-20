import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database connection error:", error.message);
    }
    throw new Error("Connection failed");
  }
}
