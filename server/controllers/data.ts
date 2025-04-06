import { Request, Response } from "express";

// Temporary in-memory store
let sensorLogs: { temperature: number; humidity: number; timestamp: string }[] = [];

export const receiveSensorData = (req: Request, res: Response) => {
  const { temperature, humidity } = req.body;

  if (typeof temperature !== "number" || typeof humidity !== "number") {
    return res.status(400).json({ message: "Invalid data format" });
  }

  const dataEntry = {
    temperature,
    humidity,
    timestamp: new Date().toISOString()
  };

  sensorLogs.push(dataEntry);

  // Just logging for now — you can later write this to MongoDB or file system
  console.log("Sensor Data Received:", dataEntry);

  res.status(200).json({ message: "Data received successfully" });
};

// Optional helper to fetch recent logs
export const getSensorLogs = (_req: Request, res: Response) => {
  res.status(200).json(sensorLogs.slice(-50)); // return last 50 logs
};
