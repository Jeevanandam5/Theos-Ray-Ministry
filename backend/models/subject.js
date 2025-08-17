import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  pdfUrl: { type: String }
}, { timestamps: true });

export default mongoose.model("Subject", subjectSchema);
