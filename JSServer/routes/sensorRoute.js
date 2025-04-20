import express from 'express';
import { fetchAndSaveSensorData } from '../controllers/sensorController.js';

const router = express.Router();

router.get('/fetch-sensor', fetchAndSaveSensorData); // GET route to trigger data fetch

export default router;
