'use client';

import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";

export default function SensorStats() {
  const mockData = {
    temperature: 23.5,
    humidity: 45,
    lastUpdated: new Date().toLocaleString()
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sensor Statistics</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Thermometer className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temperature</p>
              <h2 className="text-3xl font-bold">{mockData.temperature}°C</h2>
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
              <h2 className="text-3xl font-bold">{mockData.humidity}%</h2>
            </div>
          </div>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">Last updated: {mockData.lastUpdated}</p>
    </div>
  );
}