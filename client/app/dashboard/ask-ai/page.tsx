'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const mockSensorData = [
  { time: "6 AM", moisture: 45, temp: 22 },
  { time: "9 AM", moisture: 42, temp: 26 },
  { time: "12 PM", moisture: 38, temp: 31 },
  { time: "3 PM", moisture: 35, temp: 34 },
  { time: "6 PM", moisture: 40, temp: 29 },
];

export default function AskCropAI() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState<string[]>([]);

  const handleAsk = () => {
    if (!question.trim()) return;
    setChat((prev) => [
      ...prev,
      `🌱 AI: Based on current soil moisture and temperature, irrigation is recommended in the evening.`,
    ]);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 p-8 space-y-8">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-emerald-700"
      >
        Smart Crop Intelligence Dashboard 🌾
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Crop Health Summary */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 border-emerald-200">
            <h2 className="text-xl font-semibold text-emerald-700">
              Crop Health Status
            </h2>
            <p className="mt-2 text-slate-700">
              ✅ Crop Condition: <span className="font-semibold text-emerald-600">Healthy</span><br />
              🌡 Avg Temperature: 28°C<br />
              💧 Soil Moisture: Moderate<br />
              💡 Light Exposure: Optimal
            </p>
          </Card>
        </motion.div>

        {/* AI Recommendation */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 border-teal-200">
            <h2 className="text-xl font-semibold text-teal-700">
              AI Smart Recommendation
            </h2>
            <ul className="list-disc pl-5 mt-2 text-slate-700">
              <li>Irrigate lightly in the evening</li>
              <li>Maintain current light duration</li>
              <li>No pest risk detected</li>
            </ul>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow p-6"
      >
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Sensor Trends (Mock IoT Data)
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockSensorData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="moisture" strokeWidth={2} />
            <Line type="monotone" dataKey="temp" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* AI Chat */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-emerald-700">
          Ask AI About Your Crops
        </h2>

        <Textarea
          placeholder="Ask about irrigation, crop health, yield..."
          className="mt-3"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Button
          className="mt-3 bg-emerald-600 hover:bg-emerald-700"
          onClick={handleAsk}
        >
          Ask AI
        </Button>

        <div className="mt-4 space-y-2">
          {chat.map((msg, i) => (
            <div
              key={i}
              className="bg-emerald-50 p-3 rounded text-slate-700"
            >
              {msg}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
