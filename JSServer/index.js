import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from 'axios';
import dataRoutes from "./routes/data.js";  // Existing routes for data
import billRoutes from './routes/ask_ai.js';  // Existing routes for AI
import ConnectDB from "./db/index.js";
import { fetchAndSaveSensorData } from './controllers/sensorController.js';
// import sensorRouter from "./routes/sensorRoute.js";
import ruleRouter from "./routes/ruleRoute.js"
import {checkSensorAndNotify} from "./controllers/ruleController.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Replaces body-parser

// Routes
app.use("/", dataRoutes);  // Your existing data routes
app.use("/", billRoutes);  // Your existing AI routes
// app.use("/", sensorRouter);
app.use("/", ruleRouter);

// Route to check if the API is running
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Fetch sensor data from the Flask API and save to MongoDB

// setInterval(() => fetchAndSaveSensorData({ }, { status: () => ({ json: () => {} }) }), 2000);

//  setInterval(() => checkSensorAndNotify({ }, { status: () => ({ json: () => {} }) }), 2000);
setInterval(() => {
  fetchAndSaveSensorData({ }, { status: () => ({ json: () => {} }) });
}, 2000);

setTimeout(() => {
  setInterval(() => {
    checkSensorAndNotify({ }, { status: () => ({ json: () => {} }) });
  }, 2000);
}, 10000); // Adjust delay time as necessary


// Start the server
app.listen(process.env.PORT, async () => {
  try {
    await ConnectDB();
    console.log(`Server app listening on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
});