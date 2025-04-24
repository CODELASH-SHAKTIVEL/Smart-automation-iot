import express from "express";
import { getAllSensorData,getAllRules,getrecentsensordata } from "../controllers/data.js";

const router = express.Router();

// Route to get all sensor data
router.get("/sensor-data", getAllSensorData);

// Route to get rules
router.get("/get-rules", getAllRules);

router.get("/get-recent-sensor-data", getrecentsensordata);


export default router;
