'use client';

import { useState } from 'react';
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
  Label,
} from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const temperatureData = [
  { time: '0:00', value: 21 },
  { time: '1:00', value: 22 },
  { time: '2:00', value: 21.5 },
  { time: '3:00', value: 20.8 },
  { time: '4:00', value: 20.3 },
  { time: '5:00', value: 21.1 },
  { time: '6:00', value: 22.4 },
  { time: '7:00', value: 23.2 },
  { time: '8:00', value: 24.1 },
  { time: '9:00', value: 25 },
  { time: '10:00', value: 24.7 },
  { time: '11:00', value: 23.5 },
  { time: '12:00', value: 22.6 },
  { time: '13:00', value: 21.9 },
  { time: '14:00', value: 22.3 },
  { time: '15:00', value: 23 },
  { time: '16:00', value: 23.5 },
  { time: '17:00', value: 22.8 },
  { time: '18:00', value: 21.7 },
  { time: '19:00', value: 20.9 },
  { time: '20:00', value: 20.4 },
  { time: '21:00', value: 20.2 },
  { time: '22:00', value: 20.5 },
  { time: '23:00', value: 21 },
];

const humidityData = [
  { time: '0:00', value: 55 },
  { time: '1:00', value: 56 },
  { time: '2:00', value: 57 },
  { time: '3:00', value: 58 },
  { time: '4:00', value: 59 },
  { time: '5:00', value: 60 },
  { time: '6:00', value: 58 },
  { time: '7:00', value: 57 },
  { time: '8:00', value: 55 },
  { time: '9:00', value: 53 },
  { time: '10:00', value: 52 },
  { time: '11:00', value: 50 },
  { time: '12:00', value: 49 },
  { time: '13:00', value: 48 },
  { time: '14:00', value: 47 },
  { time: '15:00', value: 46 },
  { time: '16:00', value: 45 },
  { time: '17:00', value: 46 },
  { time: '18:00', value: 47 },
  { time: '19:00', value: 48 },
  { time: '20:00', value: 50 },
  { time: '21:00', value: 51 },
  { time: '22:00', value: 52 },
  { time: '23:00', value: 54 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function HistoricalData() {
  const [activeTab, setActiveTab] = useState<'temperature' | 'humidity'>('temperature');
  const chartData = activeTab === 'temperature' ? temperatureData : humidityData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historical Data</h1>
      <Card className="p-6">
        <Tabs defaultValue="temperature" value={activeTab} className="space-y-4">
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
                <YAxis dataKey="value" />
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
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
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

