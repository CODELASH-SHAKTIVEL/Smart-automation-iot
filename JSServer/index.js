import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import billRoutes from './routes/ask_ai.js';

// import mongoose from "mongoose";

import dataRoutes from "./routes/data.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // replaces body-parser


// Routes
app.use("/api/data", dataRoutes);
app.use('/', billRoutes);
app.get("/", (req, res) => {
  res.send("API is running!");
});


// MongoDB (Optional, uncomment if using DB)
// mongoose.connect(process.env.MONGO_URI as string)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
