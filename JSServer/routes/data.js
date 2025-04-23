import express from "express";
import { getAllSensorData } from "../controllers/data.js";

const router = express.Router();

// Route to get all sensor data
router.get("/sensor-data", getAllSensorData);

export default router;
