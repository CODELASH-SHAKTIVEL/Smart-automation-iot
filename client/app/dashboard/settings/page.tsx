'use client';

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockPollingData = [
  { time: "10:00", latency: 120 },
  { time: "10:05", latency: 110 },
  { time: "10:10", latency: 140 },
  { time: "10:15", latency: 130 },
  { time: "10:20", latency: 115 },
];

export default function Settings() {
  const [pollingInterval, setPollingInterval] = useState(5);
  const [darkMode, setDarkMode] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(true);

  const handleSave = () => {
    console.log("Saved Settings:", {
      pollingInterval,
      darkMode,
      automationEnabled,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-slate-100 p-8 space-y-8">

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-emerald-700 text-center"
      >
        Greenhouse System Settings ⚙️
      </motion.h1>

      {/* Settings Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Sensor Settings */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 border-emerald-200">
            <h2 className="text-xl font-semibold text-emerald-700">
              Sensor Configuration
            </h2>

            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Sensor Polling Interval (seconds)</Label>
                <Input
                  type="number"
                  min={1}
                  value={pollingInterval}
                  onChange={(e) =>
                    setPollingInterval(Number(e.target.value))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label>Enable Automation</Label>
                <Switch
                  checked={automationEnabled}
                  onCheckedChange={setAutomationEnabled}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* System Preferences */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 border-teal-200">
            <h2 className="text-xl font-semibold text-teal-700">
              System Preferences
            </h2>

            <div className="flex items-center justify-between mt-6">
              <Label>Dark Mode</Label>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>

            <p className="text-sm text-slate-600 mt-4">
              Theme preference affects dashboard visibility and power usage.
            </p>
          </Card>
        </motion.div>
      </div>

      {/* System Health Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Sensor Polling Stability (Mock Data)
          </h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockPollingData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="latency"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>

          <p className="text-sm text-slate-600 mt-3">
            Lower latency indicates stable sensor communication.
          </p>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        className="max-w-md mx-auto"
      >
        <Button
          onClick={handleSave}
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}
