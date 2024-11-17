import mongoose from "mongoose";

const mongoUri =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/magic_transporters_db";

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
