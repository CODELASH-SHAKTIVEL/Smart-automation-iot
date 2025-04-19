import { find } from '../models/SensorData.js';

const getAllSensorData = async (req, res) => {
  try {
    const data = await find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

export default {
  getAllSensorData
};