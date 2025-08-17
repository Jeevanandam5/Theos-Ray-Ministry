import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import subjectRoutes from "./routes/subjectRoutes.js";
import watchlistRoute  from "./routes/watchlistRoute.js"

dotenv.config();
const app = express();
const port = 3000

app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server is Running!")
})

// Routes
app.use("/api/subjects", subjectRoutes);
app.use("/api/watchlist", watchlistRoute)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
