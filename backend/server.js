import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import subjectRoutes from "./routes/subjectRoutes.js";
import watchlistRoute  from "./routes/watchlistRoute.js"

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

// Routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/watchlist", watchlistRoute)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
