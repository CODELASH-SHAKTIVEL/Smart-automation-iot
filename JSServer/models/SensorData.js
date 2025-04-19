import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "sensor_data",
  }
);

const SensorData = mongoose.model("SensorData", SensorDataSchema);

export default SensorData;

// baadme use karna hai when we have to save it 
 // import mongoose from "mongoose";
 // import { Request, Response } from "express";
 // import SensorData from "../models/SensorData";

 // export const createSensorData = async (req: Request, res: Response) => {
 //   const { temperature, humidity } = req.body;
 //   try {
 //     const sensorData = new SensorData({ temperature, humidity });
 //     await sensorData.save();
 //     res.status(201).json(sensorData);
 //   } catch (error) {
 //     res.status(400).json({ message: error.message });
 //   }
 // };
// // Usage in your routes file (e.g., routes/data.js):
// import SensorData from "../models/SensorData";

// // Then inside your controller:
// await SensorData.create({ temperature, humidity });