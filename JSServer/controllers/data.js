import SensorData from '../models/SensorData.js';

// Get all sensor data
export const getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.find();  // Fetch all sensor data without sorting
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch sensor data" });
  }
};
