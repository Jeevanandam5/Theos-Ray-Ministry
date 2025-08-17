import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Subject from "../models/subject.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create subject (image + pdf support)
router.post("/", upload.fields([{ name: "image" }, { name: "pdf" }]), async (req, res) => {
  try {
    let imageUrl = "";
    let pdfUrl = "";

    // Upload Image
    if (req.files?.image) {
      const imageBuffer = req.files.image[0].buffer;
      const imageUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "subjects", resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(imageBuffer);
      });
      imageUrl = imageUpload.secure_url;
    }

    // Upload PDF
    if (req.files?.pdf) {
      const pdfBuffer = req.files.pdf[0].buffer;
      const pdfUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "subjects", resource_type: "raw", format: "pdf" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(pdfBuffer);
      });
      pdfUrl = pdfUpload.secure_url;
    }

    // Save subject in DB
    const subject = new Subject({
      image: imageUrl,
      pdfUrl: pdfUrl, // new field
      title: req.body.title,
      description: req.body.description,
      videoUrl: req.body.videoUrl,
    });

    await subject.save();
    return res.status(201).json(subject);

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
