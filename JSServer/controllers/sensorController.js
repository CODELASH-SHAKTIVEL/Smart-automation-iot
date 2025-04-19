import axios from 'axios';
import SensorData from '../models/SensorData.js';

export const fetchAndSaveSensorData = async (req, res) => {
  try {
    const response = await axios.get('http://192.168.116.95:5000/sensor'); // Replace with actual Raspberry Pi IP
    const { temperature, humidity, created_at } = response.data;

    const sensorEntry = new SensorData({
      temperature,
      humidity,
      createdAt: new Date(created_at)
    });

    await sensorEntry.save();
    console.log('Sensor data saved:', sensorEntry);

    res.status(200).json({ message: "Sensor data saved successfully", data: sensorEntry });
  } catch (error) {
    console.error('Error fetching sensor data:', error.message);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
};