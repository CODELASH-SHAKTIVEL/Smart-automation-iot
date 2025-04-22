import SensorData from "../models/SensorData.js";

// Get all sensor data
export const getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ createdAt: 1 });
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch sensor data" });
  }
};
