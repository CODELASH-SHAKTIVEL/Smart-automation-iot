'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import axios from 'axios';

export default function HistoricalData() {
  const [activeTab, setActiveTab] = useState<'temperature' | 'humidity'>('temperature');
  const [sensorData, setSensorData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/sensor-data');
        setSensorData(res.data);
      } catch (err) {
        console.error("Error fetching sensor data:", err);
      }
    };

    fetchSensorData();
  }, []);

  const chartData = sensorData.map((entry: any) => ({
    time: new Date(entry.created_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    value: activeTab === 'temperature' ? entry.temperature : entry.humidity,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historical Sensor Data</h1>
      <Card className="p-6">
        <Tabs value={activeTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="temperature" onClick={() => setActiveTab('temperature')}>
              Temperature
            </TabsTrigger>
            <TabsTrigger value="humidity" onClick={() => setActiveTab('humidity')}>
              Humidity
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>

        <CardContent>
          <ChartContainer config={{}}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Line
                dataKey="value"
                type="linear"
                stroke="rgb(128, 128, 128)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
