'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateMockData = (type: 'temperature' | 'humidity') => {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    value: type === 'temperature' 
      ? Math.random() * (25 - 20) + 20 // Temperature between 20-25°C
      : Math.random() * (60 - 40) + 40  // Humidity between 40-60%
  }));
};

export default function HistoricalData() {
  const [activeTab, setActiveTab] = useState<'temperature' | 'humidity'>('temperature');
  const data = generateMockData(activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historical Data</h1>
      <Card className="p-6">
        <Tabs defaultValue="temperature" className="space-y-4">
          <TabsList>
            <TabsTrigger 
              value="temperature"
              onClick={() => setActiveTab('temperature')}
            >
              Temperature
            </TabsTrigger>
            <TabsTrigger 
              value="humidity"
              onClick={() => setActiveTab('humidity')}
            >
              Humidity
            </TabsTrigger>
          </TabsList>
          <TabsContent value="temperature" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="humidity" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}