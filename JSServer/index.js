import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import axios from 'axios';
import dataRoutes from "./routes/data.js";  // Existing routes for data
import billRoutes from './routes/ask_ai.js';  // Existing routes for AI

// MongoDB model for sensor data
import SensorData from './models/SensorData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // Replaces body-parser

// Routes
app.use("/api/data", dataRoutes);  // Your existing data routes
app.use("/", billRoutes);  // Your existing AI routes

// MongoDB setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Route to check if the API is running
app.get("/", (req, res) => {
  res.send("API is running!");
});

// Fetch sensor data from the Flask API and save to MongoDB
// const fetchSensorData = async () => {
//   try {
//     // Make request to Flask API (replace with actual IP and port)
//     const res = await axios.get('http://<YOUR_PI_IP>:5000/sensor');  // Replace with your PI IP

//     const { temperature, humidity, created_at } = res.data;

//     // Save sensor data to MongoDB
//     const sensorEntry = new SensorData({
//       temperature,
//       humidity,
//       createdAt: new Date(created_at)
//     });

//     await sensorEntry.save();  // Save to database
//     console.log('Sensor data saved:', sensorEntry);
//   } catch (err) {
//     console.error('Error fetching sensor data:', err.message);
//   }
// };

// // Fetch data from the Flask API every 2 seconds
// setInterval(fetchSensorData, 2000);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});