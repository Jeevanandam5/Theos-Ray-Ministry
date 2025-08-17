// models/watchlist.js
import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // changed from ObjectId to String
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);
