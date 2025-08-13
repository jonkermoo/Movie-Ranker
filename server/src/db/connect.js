import mongoose from "mongoose";
import { env } from "../env.js";

export async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(env.MONGODB_URI, { dbName: "movie_ranker" });
  console.log("✅ MongoDB connected");
}
