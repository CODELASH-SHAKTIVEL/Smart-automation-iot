'use client';

import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';
import { motion } from "framer-motion";

/*
COLOR THEORY APPLIED (GREENHOUSE CONTEXT)
- Primary (Growth / Nature): Emerald / Green
- Secondary (Water): Teal / Blue-Green
- Accent (Attention / Insight): Amber
- Neutral (Background / Text): Slate / Muted Gray
- Status:
  - Healthy → Green
  - Moderate → Teal
  - Alert → Amber
*/

type IrrigationPhase = {
  phase: string;
  startDay: number;
  endDay: number;
  waterRequirement: number; // mm/day
  healthIndex: number; // %
};

type CropSchedule = {
  crop: string;
  season: string;
  soilType: string;
  totalDuration: number;
  idealTemp: string;
  idealMoisture: string;
  phases: IrrigationPhase[];
};

const mockCropSchedules: CropSchedule[] = [
  {
    crop: "Rice",
    season: "Kharif (June – October)",
    soilType: "Clay Soil",
    totalDuration: 120,
    idealTemp: "22°C – 32°C",
    idealMoisture: "70% – 85%",
    phases: [
      { phase: "Nursery", startDay: 1, endDay: 20, waterRequirement: 8, healthIndex: 86 },
      { phase: "Tillering", startDay: 21, endDay: 50, waterRequirement: 12, healthIndex: 89 },
      { phase: "Flowering", startDay: 51, endDay: 80, waterRequirement: 15, healthIndex: 93 },
      { phase: "Maturity", startDay: 81, endDay: 120, waterRequirement: 6, healthIndex: 91 },
    ],
  },
  {
    crop: "Tomato",
    season: "Rabi (October – February)",
    soilType: "Loamy Soil",
    totalDuration: 90,
    idealTemp: "18°C – 28°C",
    idealMoisture: "60% – 70%",
    phases: [
      { phase: "Seedling", startDay: 1, endDay: 15, waterRequirement: 4, healthIndex: 83 },
      { phase: "Vegetative", startDay: 16, endDay: 45, waterRequirement: 6, healthIndex: 87 },
      { phase: "Flowering", startDay: 46, endDay: 70, waterRequirement: 8, healthIndex: 92 },
      { phase: "Harvest", startDay: 71, endDay: 90, waterRequirement: 5, healthIndex: 90 },
    ],
  },
];

export default function CropIrrigationCalendar() {
  const [selectedCrop, setSelectedCrop] = useState<CropSchedule | null>(null);
  const [dailyData, setDailyData] = useState<any[]>([]);

  useEffect(() => {
    if (!selectedCrop) return;

    const data: any[] = [];
    selectedCrop.phases.forEach((phase) => {
      for (let day = phase.startDay; day <= phase.endDay; day++) {
        data.push({
          day,
          water: phase.waterRequirement,
          health: Math.min(
            100,
            phase.healthIndex + (Math.random() * 2 - 1)
          ),
          phase: phase.phase,
        });
      }
    });
    setDailyData(data);
  }, [selectedCrop]);

  return (
    <div className="space-y-10 bg-slate-50">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-emerald-700"
      >
        Smart Crop Irrigation & Health Calendar
      </motion.h1>

      {/* Crop Selector */}
      <div className="grid gap-6 md:grid-cols-2">
        {mockCropSchedules.map((crop) => (
          <motion.div key={crop.crop} whileHover={{ scale: 1.03 }}>
            <Card
              onClick={() => setSelectedCrop(crop)}
              className={`p-6 cursor-pointer border transition-all ${
                selectedCrop?.crop === crop.crop
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200 bg-white hover:border-emerald-300"
              }`}
            >
              <h2 className="text-xl font-semibold text-emerald-700">
                {crop.crop}
              </h2>
              <p className="text-sm text-slate-500 mt-1">{crop.season}</p>
              <p className="text-sm mt-1 text-slate-600">
                Soil Type: {crop.soilType}
              </p>
              <p className="text-sm text-slate-600">
                Growth Duration: {crop.totalDuration} days
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedCrop && (
        <>
          {/* Crop Conditions */}
          <Card className="p-6 grid gap-4 md:grid-cols-3 bg-white border border-slate-200">
            <div>
              <p className="text-sm text-slate-500">Ideal Temperature</p>
              <p className="font-semibold text-slate-700">
                {selectedCrop.idealTemp}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Ideal Soil Moisture</p>
              <p className="font-semibold text-slate-700">
                {selectedCrop.idealMoisture}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Season</p>
              <p className="font-semibold text-slate-700">
                {selectedCrop.season}
              </p>
            </div>
          </Card>

          {/* Phase Progress */}
          <Card className="p-6 bg-white border border-slate-200 space-y-5">
            <h2 className="text-xl font-semibold text-emerald-700">
              Growth & Irrigation Phases
            </h2>

            {selectedCrop.phases.map((phase) => {
              const duration = phase.endDay - phase.startDay + 1;
              const percent = (duration / selectedCrop.totalDuration) * 100;

              return (
                <motion.div key={phase.phase} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">
                      {phase.phase}
                    </span>
                    <span className="text-slate-500">
                      {duration} days • {phase.waterRequirement} mm/day
                    </span>
                  </div>
                  <Progress value={percent} className="bg-emerald-100" />
                </motion.div>
              );
            })}
          </Card>

          {/* Daily Irrigation Trend */}
          <Card className="p-6 bg-white border border-slate-200">
            <h2 className="text-xl font-semibold text-teal-700 mb-4">
              Daily Irrigation Requirement (Water Usage)
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis unit=" mm" stroke="#64748b" />
                <Tooltip />
                <Line
                  dataKey="water"
                  stroke="#0d9488"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Crop Health */}
          <Card className="p-6 bg-white border border-slate-200">
            <h2 className="text-xl font-semibold text-emerald-700 mb-4">
              Daily Crop Health Index
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis unit=" %" stroke="#64748b" />
                <Tooltip />
                <Area
                  dataKey="health"
                  stroke="#16a34a"
                  fill="url(#healthGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Phase-wise Water */}
          <Card className="p-6 bg-white border border-slate-200">
            <h2 className="text-xl font-semibold text-amber-600 mb-4">
              Phase-wise Average Water Distribution
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={selectedCrop.phases.map(p => ({
                  phase: p.phase,
                  water: p.waterRequirement,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="phase" stroke="#64748b" />
                <YAxis unit=" mm" stroke="#64748b" />
                <Tooltip />
                <Bar
                  dataKey="water"
                  fill="#f59e0b"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Advisory */}
          <Card className="p-6 bg-emerald-50 border border-emerald-200">
            <h2 className="text-lg font-semibold text-emerald-700">
              Smart Irrigation Advisory
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Maintain higher irrigation during flowering phases. Gradually
              reduce water supply near harvest to prevent root stress and
              optimize crop quality while conserving water.
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
              Apply Recommended Plan
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
