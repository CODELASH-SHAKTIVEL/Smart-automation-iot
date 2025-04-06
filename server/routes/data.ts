import express from "express";
import { receiveSensorData } from "../controllers/data";

const router = express.Router();

// POST /api/data — Receive temperature & humidity from Raspberry Pi
router.post("/", receiveSensorData);

export default router;
