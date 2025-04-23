// sensorModel.js (ESM version)
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const sensorSchema = new Schema({
  temperature: Number,
  humidity: Number,
  created_time: {
    type: Date,
    default: Date.now
  }
});

// ✅ Prevent OverwriteModelError on hot reloads
export default models.SensorReading || model('SensorReading', sensorSchema);
