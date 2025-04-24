import SensorData from '../models/SensorData.js';
import Rule from"../models/rules.js"

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

export const getAllRules = async (req, res) => {
  try {
    const data = await Rule.find().sort({ createdAt: -1 }).limit(1);  // Fetch all sensor data without sorting
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch sensor data" });
  }
};

export const getrecentsensordata = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ createdAt: -1 }).limit(1);  // Fetch all sensor data without sorting
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ message: "Failed to fetch sensor data" });
  }
};
