import express from 'express';
import { receiveSensorData, getSensorLogs } from '../controllers/data.js';

const router = express.Router();

router.post('/sensor-data', receiveSensorData);
router.get('/sensor-logs', getSensorLogs);

export default router;
