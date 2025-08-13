import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    imdbID: { type: String, index: true, required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
    text: { type: String, default: "" },
    ipHash: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ReviewSchema.index({ imdbID: 1, createdAt: -1 });

export const Review = mongoose.model("Review", ReviewSchema);
