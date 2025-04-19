import { Router } from 'express';
const router = Router();
import { getAllSensorData } from '../controllers/sensorController';

router.get('/sensor-data', getAllSensorData);

export default router;