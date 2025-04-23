import mongoose from 'mongoose';

const RuleSchema = new mongoose.Schema({
  appliance: {
    type: String,
    required: true
  },
  temperatureThreshold: {
    type: Number,
    required: true
  },
  humidityThreshold: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Rule', RuleSchema);
