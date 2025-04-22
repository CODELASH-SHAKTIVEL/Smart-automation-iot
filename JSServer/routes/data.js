import express from "express";
import { getAllSensorData } from "../controller/dataController.js";

const router = express.Router();

// Route to get all sensor data
router.get("/", getAllSensorData);

export default router;
