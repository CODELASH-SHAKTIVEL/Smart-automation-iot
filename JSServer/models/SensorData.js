// sensorModel.js
import { Schema, model } from 'mongoose';

const sensorSchema = new Schema({
  temperature: Number,
  humidity: Number,
  created_time: {
    type: Date,
    default: Date.now
  }
});

export default model('SensorReading', sensorSchema);
