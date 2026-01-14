'use client';

import { useEffect, useState } from 'react';
import {
  Sun,
  Thermometer,
  AlertTriangle,
  Layers,
  Lightbulb,
} from 'lucide-react';
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
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

/* ---------- Mock Multi-Zone Light & Temperature Data ---------- */
const mockLightTempHistory = Array.from({ length: 12 }).map((_, i) => ({
  time: new Date(Date.now() - i * 3600000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }),
  temperature: 24 + Math.random() * 8,
  lightIntensity: 600 + Math.random() * 300,
}));

const mockZones = [
  { zone: 'Zone A', temp: 28, light: 820 },
  { zone: 'Zone B', temp: 30, light: 760 },
  { zone: 'Zone C', temp: 26, light: 880 },
];

export default function LightAndTemperature() {
  const [history, setHistory] = useState<any[]>([]);
  const [zones, setZones] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setHistory(mockLightTempHistory.reverse());
      setZones(mockZones);
    }, 300);
  }, []);

  const avgTemp =
    history.reduce((a, b) => a + (b.temperature || 0), 0) /
      (history.length || 1);

  const avgLight =
    history.reduce((a, b) => a + (b.lightIntensity || 0), 0) /
      (history.length || 1);

  const tempUsagePercent = Math.min((avgTemp / 35) * 100, 100);
  const lightUsagePercent = Math.min((avgLight / 1000) * 100, 100);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ---------- Header ---------- */}
      <div>
        <h1 className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">
          Light & Temperature Control
        </h1>
        <p className="text-sm text-emerald-600 dark:text-emerald-500">
          Monitor greenhouse climate and lighting emitters across zones
        </p>
      </div>

      {/* ---------- Summary Cards ---------- */}
      <div className="grid gap-6 md:grid-cols-4">
        <SummaryCard
          title="Active Zones"
          value="3"
          icon={Layers}
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
        <SummaryCard
          title="Lighting Load"
          value={`${lightUsagePercent.toFixed(0)}%`}
          icon={Lightbulb}
        />
      </div>

      {/* ---------- Temperature Trend ---------- */}
      <Card className="p-6 transition hover:shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
          Temperature Trend (All Zones)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="°C" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#f97316"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ---------- Light Intensity Trend ---------- */}
      <Card className="p-6 transition hover:shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
          Light Intensity Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit=" lux" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="lightIntensity"
              stroke="#eab308"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* ---------- Zone Comparison ---------- */}
      <Card className="p-6 transition hover:shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-emerald-700 dark:text-emerald-400">
          Zone-wise Light & Temperature
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={zones}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="zone" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="temp" fill="#f97316" radius={[6, 6, 0, 0]} />
            <Bar dataKey="light" fill="#eab308" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* ---------- Alerts ---------- */}
      {(avgTemp > 32 || avgLight > 900) && (
        <Alert className="border-orange-300 bg-orange-50 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700 dark:text-orange-400">
            Warning: High temperature or light intensity detected. Consider adjusting emitters.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

/* ---------- Summary Card ---------- */
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
