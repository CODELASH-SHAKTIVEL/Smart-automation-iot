'use client';

import { useEffect, useState } from "react";
import { Thermometer, Droplets } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SensorEntry = {
  temperature: number;
  humidity: number;
  created_time: string;
};

const COLORS = ['#FF8042', '#0088FE'];

export default function SensorStats() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [sensorHistory, setSensorHistory] = useState<SensorEntry[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-recent-sensor-data');
        const data = await response.json();
        const sensor = data[0];

        setTemperature(sensor.temperature);
        setHumidity(sensor.humidity);
      } catch (err) {
        console.error("Error fetching sensor data", err);
      }
    };

    const fetchSensorHistory = async () => {
      try {
        const res = await fetch('http://localhost:5000/sensor-data');
        const data: SensorEntry[] = await res.json();
        setSensorHistory(data);
      } catch (err) {
        console.error("Error fetching sensor history", err);
      }
    };

    fetchSensorData();
    fetchSensorHistory();
  }, []);

  const pieData = [
    { name: 'Temperature', value: temperature || 0 },
    { name: 'Humidity', value: humidity || 0 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sensor Statistics</h1>

      {/* Current Temperature and Humidity Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Thermometer className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <h2 className="text-3xl font-bold">{temperature !== null ? `${temperature}°C` : 'Loading...'}</h2>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Droplets className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <h2 className="text-3xl font-bold">{humidity !== null ? `${humidity}%` : 'Loading...'}</h2>
            </div>
          </div>
        </Card>
      </div>

      {/* Pie Chart */}
      {/* <Card className="p-6">
        <CardHeader>
          <CardTitle>Proportion: Temperature vs Humidity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      {/* Line Chart 1 - Temperature & Humidity */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Temperature & Humidity Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorHistory} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_time"
                tickFormatter={(value: string) => new Date(value).toLocaleTimeString()}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleTimeString()} />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" strokeWidth={2} name="Temperature (°C)" />
              <Line type="monotone" dataKey="humidity" stroke="#387908" strokeWidth={2} name="Humidity (%)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line Chart 2 - Temperature Only */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Temperature Only (Over Time)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorHistory} margin={{ left: 12, right: 12 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="created_time"
                tickFormatter={(value: string) => new Date(value).toLocaleTimeString()}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleTimeString()} />
              <Line type="monotone" dataKey="temperature" stroke="#007bff" strokeWidth={2} name="Temperature (°C)" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
