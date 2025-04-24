'use client';

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

type SensorData = {
  _id: string;
  temperature: number;
  humidity: number;
  created_time: string;
  __v: number;
};

export default function ExpenseTracker() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [monthlyLimit, setMonthlyLimit] = useState(300);
  const [rate, setRate] = useState(0.12);
  const [dailyUsage, setDailyUsage] = useState(0);
  const [hourlyChartData, setHourlyChartData] = useState<{ hour: string; kWh: number }[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await fetch('http://localhost:5000/sensor-data');
        const data: SensorData[] = await res.json();
        setSensorData(data);
        const { dailyTotal, chartData } = calculateUsage(data);
        setDailyUsage(dailyTotal);
        setHourlyChartData(chartData);
      } catch (err) {
        console.error('Failed to fetch sensor data', err);
      }
    };

    fetchSensorData();
  }, []);

  const calculateUsage = (data: SensorData[]) => {
    const sortedData = [...data].sort(
      (a, b) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
    );

    const hourlyMap = new Map<string, { total: number; count: number }>();

    let totalKWh = 0;
    const baseLoad = 0.5;

    for (let i = 1; i < sortedData.length; i++) {
      const prev = sortedData[i - 1];
      const curr = sortedData[i];

      const prevTime = new Date(prev.created_time).getTime();
      const currTime = new Date(curr.created_time).getTime();

      const timeDiffHrs = (currTime - prevTime) / (1000 * 60 * 60); // ms to hours

      if (timeDiffHrs <= 0 || timeDiffHrs > 2) continue; // skip invalid gaps

      const avgTemp = (prev.temperature + curr.temperature) / 2;
      const avgHumidity = (prev.humidity + curr.humidity) / 2;

      const tempFactor = Math.max(avgTemp - 24, 0) * 1.5;
      const humFactor = Math.max(avgHumidity - 50, 0) * 0.5;

      const usage = (tempFactor + humFactor) * baseLoad * timeDiffHrs;

      if (!isNaN(usage)) {
        totalKWh += usage;

        const hourKey = new Date(curr.created_time).getHours().toString().padStart(2, '0') + ":00";
        const current = hourlyMap.get(hourKey) || { total: 0, count: 0 };
        hourlyMap.set(hourKey, {
          total: current.total + usage,
          count: current.count + 1,
        });
      }
    }

    const chartData = Array.from(hourlyMap.entries())
      .map(([hour, { total, count }]) => ({
        hour,
        kWh: parseFloat((total / count).toFixed(2)),
      }))
      .sort((a, b) => a.hour.localeCompare(b.hour));

    return { dailyTotal: parseFloat(totalKWh.toFixed(2)), chartData };
  };

  const projectedExpense = dailyUsage * rate * 30;
  const remainingBudget = monthlyLimit - projectedExpense;
  const usagePercentage = (projectedExpense / monthlyLimit) * 100;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Expense Tracker</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyLimit">Monthly Expense Limit ($)</Label>
              <Input
                id="monthlyLimit"
                type="number"
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Electricity Rate (per kWh)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Usage Statistics</h2>
          <div className="space-y-4">
            <div>
              <Label>Daily Usage</Label>
              <p className="text-2xl font-bold">{dailyUsage} kWh</p>
            </div>
            <div>
              <Label>Projected Monthly Expense</Label>
              <p className="text-2xl font-bold">${projectedExpense.toFixed(2)}</p>
            </div>
            <div>
              <Label>Remaining Budget</Label>
              <p className="text-2xl font-bold">${remainingBudget.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <Label>Budget Usage</Label>
              <Progress value={usagePercentage} />
            </div>
          </div>
        </Card>
      </div>

      {usagePercentage >= 80 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Warning: Your projected usage exceeds 80% of your monthly budget!
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-semibold">Hourly Usage Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis unit=" kWh" />
            <Tooltip />
            <Line type="monotone" dataKey="kWh" stroke="#F25757" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
