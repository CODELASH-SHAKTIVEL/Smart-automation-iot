'use client';

import { useEffect, useState } from 'react';
import { Droplets, Waves, Layers } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* ---------- Mock Multi-Zone Soil & Water Data ---------- */
const mockSoilWaterHistory = Array.from({ length: 12 }).map((_, i) => ({
  time: new Date(Date.now() - i * 3600000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
  soilMoisture: 55 + Math.random() * 20,
  waterUsage: 10 + Math.random() * 15,
}));

const mockZoneComparison = [
  { zone: 'Zone A', moisture: 68, water: 18 },
  { zone: 'Zone B', moisture: 58, water: 22 },
  { zone: 'Zone C', moisture: 72, water: 15 },
];

export default function SoilAndWaterAnalytics() {
  const [history, setHistory] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setHistory(mockSoilWaterHistory.reverse());
      setZones(mockZoneComparison);
    }, 300); // light loading feel
  }, []);

  const avgSoil =
    history.reduce((a, b) => a + (b.soilMoisture || 0), 0) /
      (history.length || 1);

  const avgWater =
    history.reduce((a, b) => a + (b.waterUsage || 0), 0) /
      (history.length || 1);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ---------- Title ---------- */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
          Soil & Water Analytics
        </h1>
        <p className="text-sm text-emerald-600 dark:text-emerald-500">
          Moisture levels and irrigation insights across greenhouse zones
        </p>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid gap-6 md:grid-cols-3">
        <SummaryCard
          title="Active Zones"
          value="3"
          icon={Layers}
        />
        <SummaryCard
          title="Avg Soil Moisture"
          value={`${avgSoil.toFixed(1)}%`}
          icon={Droplets}
        />
        <SummaryCard
          title="Avg Water Usage"
          value={`${avgWater.toFixed(1)} L/hr`}
          icon={Waves}
        />
      </div>

      {/* ---------- Soil Moisture Trend ---------- */}
      <Card className="transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-400">
            Soil Moisture Trend (All Zones)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit="%" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="soilMoisture"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ---------- Water Usage Trend ---------- */}
      <Card className="transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-400">
            Water Pump Usage Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis unit=" L" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="waterUsage"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ---------- Zone-wise Comparison ---------- */}
      <Card className="transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-400">
            Zone-wise Soil & Water Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={zones}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="moisture" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="water" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Summary Card Component ---------- */
function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <Card className="p-4 transition hover:scale-[1.02] hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900">
          <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-sm text-emerald-600 dark:text-emerald-500">
            {title}
          </p>
          <h2 className="text-2xl font-bold text-emerald-800 dark:text-white">
            {value}
          </h2>
        </div>
      </div>
    </Card>
  );
}
