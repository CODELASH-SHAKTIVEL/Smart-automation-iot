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
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  notified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Rule', RuleSchema);
