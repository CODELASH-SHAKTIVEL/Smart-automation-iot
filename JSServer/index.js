import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from 'axios';
import dataRoutes from "./routes/data.js";  // Existing routes for data
import billRoutes from './routes/ask_ai.js';  // Existing routes for AI
import ConnectDB from "./db/index.js";

// MongoDB model for sensor data
import SensorData from './models/SensorData.js';
import sensorRouter from "./routes/sensorRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Replaces body-parser

// Routes
app.use("/api/data", dataRoutes);  // Your existing data routes
app.use("/", billRoutes);  // Your existing AI routes
app.use("/sensor-data", sensorRouter)

// Route to check if the API is running
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Fetch sensor data from the Flask API and save to MongoDB
const fetchSensorData = async () => {
  try {
    // Make request to Flask API (replace with actual IP and port)
    const res = await axios.get('http://192.168.116.95:5000/sensor');  // Replace with your PI IP

    const { temperature, humidity, created_at } = res.data;

    // Save sensor data to MongoDB
    const sensorEntry = new SensorData({
      temperature,
      humidity,
      createdAt: new Date(created_at)
    });

    await sensorEntry.save();  // Save to database
    console.log('Sensor data saved:', sensorEntry);
  } catch (err) {
    console.error('Error fetching sensor data:', err.message);
  }
};

// Fetch data from the Flask API every 2 seconds
setInterval(fetchSensorData, 2000);

// Start the server
app.listen(process.env.PORT, async () => {
  try {
    await ConnectDB();
    console.log(`Server app listening on port ${process.env.PORT}`);
  } catch (error) {
    console.error(error);
  }
});