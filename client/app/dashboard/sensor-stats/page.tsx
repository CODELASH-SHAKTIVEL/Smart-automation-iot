'use client';

import { useEffect, useState } from 'react';
import {
  Thermometer,
  Droplets,
  Sun,
  Leaf,
  Layers,
} from 'lucide-react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/* ---------- Types ---------- */
type ZoneSensorEntry = {
  zone: string;
  soilMoisture: number;
  temperature: number;
  lightIntensity: number;
  created_time: string;
};

/* ---------- Mock Data (Multi-Acre / Multi-Zone) ---------- */
const mockZoneData: ZoneSensorEntry[] = [
  {
    zone: 'Zone A',
    soilMoisture: 62,
    temperature: 28,
    lightIntensity: 720,
    created_time: new Date().toISOString(),
  },
  {
    zone: 'Zone B',
    soilMoisture: 55,
    temperature: 30,
    lightIntensity: 680,
    created_time: new Date().toISOString(),
  },
  {
    zone: 'Zone C',
    soilMoisture: 70,
    temperature: 27,
    lightIntensity: 750,
    created_time: new Date().toISOString(),
  },
];

/* ---------- Historical Mock Trend ---------- */
const mockHistory = Array.from({ length: 10 }).map((_, i) => ({
  created_time: new Date(Date.now() - i * 600000).toISOString(),
  soilMoisture: 55 + Math.random() * 15,
  temperature: 26 + Math.random() * 5,
  lightIntensity: 650 + Math.random() * 150,
}));

export default function DashboardOverview() {
  const [zones, setZones] = useState<ZoneSensorEntry[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // Mock API replacement (future-ready)
    setZones(mockZoneData);
    setHistory(mockHistory.reverse());
  }, []);

  /* ---------- Aggregate Values ---------- */
  const avgSoil =
    zones.reduce((acc, z) => acc + z.soilMoisture, 0) / zones.length || 0;
  const avgTemp =
    zones.reduce((acc, z) => acc + z.temperature, 0) / zones.length || 0;
  const avgLight =
    zones.reduce((acc, z) => acc + z.lightIntensity, 0) / zones.length || 0;

  return (
    <div className="space-y-8">
      {/* ---------- Title ---------- */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
          Greenhouse Dashboard
        </h1>
        <p className="text-sm text-emerald-600 dark:text-emerald-500">
          Multi-zone smart greenhouse overview
        </p>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid gap-6 md:grid-cols-4">
        <SummaryCard
          title="Active Zones"
          value={zones.length}
          icon={Layers}
        />
        <SummaryCard
          title="Avg Soil Moisture"
          value={`${avgSoil.toFixed(1)}%`}
          icon={Droplets}
        />
        <SummaryCard
          title="Avg Temperature"
          value={`${avgTemp.toFixed(1)}°C`}
          icon={Thermometer}
        />
        <SummaryCard
          title="Avg Light Intensity"
          value={`${avgLight.toFixed(0)} lux`}
          icon={Sun}
        />
      </div>

      {/* ---------- Zone Status ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-400">
            Zone-wise Soil, Water & Light Emitters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {zones.map((zone) => (
              <div
                key={zone.zone}
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950"
              >
                <h3 className="mb-2 font-semibold text-emerald-800 dark:text-emerald-300">
                  {zone.zone}
                </h3>
                <div className="space-y-1 text-sm text-emerald-700 dark:text-emerald-400">
                  <p>🌱 Soil Moisture: {zone.soilMoisture}%</p>
                  <p>🌡️ Temperature: {zone.temperature}°C</p>
                  <p>🌞 Light Intensity: {zone.lightIntensity} lux</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ---------- Trend Chart ---------- */}
      <Card>
        <CardHeader>
          <CardTitle className="text-emerald-700 dark:text-emerald-400">
            Environmental Trends (All Zones)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={history}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_time"
                tickFormatter={(v) => new Date(v).toLocaleTimeString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(v) =>
                  new Date(v as string).toLocaleTimeString()
                }
              />
              <Line
                type="monotone"
                dataKey="soilMoisture"
                stroke="#10b981"
                strokeWidth={2}
                name="Soil Moisture (%)"
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                strokeWidth={2}
                name="Temperature (°C)"
              />
              <Line
                type="monotone"
                dataKey="lightIntensity"
                stroke="#eab308"
                strokeWidth={2}
                name="Light Intensity (lux)"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

/* ---------- Reusable Summary Card ---------- */
function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: any;
}) {
  return (
    <Card className="p-4">
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
