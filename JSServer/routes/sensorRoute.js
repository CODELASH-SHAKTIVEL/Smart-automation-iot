import { Router } from 'express';
const router = Router();
import { fetchAndStoreSensorData } from '../services/fetchSensor.js';

router.get('/sensor-data', fetchAndStoreSensorData);

export default router;