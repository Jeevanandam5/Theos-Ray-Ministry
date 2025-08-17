import express from "express";
import Watchlist from "../models/watchlist.js";

const router = express.Router();

// Add to watchlist
router.post("/", async (req, res) => {
  try {
    const { userId, subjectId } = req.body;

    // prevent duplicates
    const existing = await Watchlist.findOne({ userId, subjectId });
    if (existing) return res.status(400).json({ message: "Already in watchlist" });

    const item = new Watchlist({ userId, subjectId });
    await item.save();

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get watchlist for a user
router.get("/:userId", async (req, res) => {
  try {
    const items = await Watchlist.find({ userId: req.params.userId }).populate("subjectId");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from watchlist
router.delete("/:id", async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
