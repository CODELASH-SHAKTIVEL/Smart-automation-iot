import axios from 'axios';
import fetch from 'node-fetch';
import SensorData from '../models/SensorData.js';

export const fetchAndSaveSensorData = async (req, res) => {
  try {
    const response = await fetch('http://192.168.116.95:5000/sensor');
    // console.log("fetched successfully:");
    if (response.ok) {
      // throw new Error(`HTTP error! Status: ${response.status}`);
      console.log("success");
      
    }
     // Replace with actual Raspberry Pi IP
    // const { temperature, humidity, created_at } = response.data;
    const data = await response.json();
    const { temperature, humidity, created_at } = data;

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