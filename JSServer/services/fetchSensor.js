import { get } from 'axios';
import SensorData from '../models/SensorData';

const fetchAndStoreSensorData = async () => {
  try {
    const res = await get('http://<YOUR_PI_IP>:5000/sensor');
    const { temperature, humidity, created_at } = res.data;

    const sensorEntry = new SensorData({
      temperature,
      humidity,
      createdAt: new Date(created_at)
    });

    await sensorEntry.save();
    console.log('Sensor data saved:', sensorEntry);
  } catch (err) {
    console.error('Error fetching sensor data:', err.message);
  }
};

export default fetchAndStoreSensorData;