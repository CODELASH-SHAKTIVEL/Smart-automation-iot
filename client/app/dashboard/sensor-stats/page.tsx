'use client';

import { TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart";
import { Thermometer, Droplets } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Label, Pie, PieChart } from "recharts"

export default function SensorStats() {
  const mockData = {
    temperature: 23.5,
    humidity: 45,
    lastUpdated: new Date().toLocaleString()
  };

  const chartData = [
    { month: "January", expense: 186 },
    { month: "February", expense: 305 },
    { month: "March", expense: 237 },
    { month: "April", expense: 73 },
    { month: "May", expense: 209 },
    { month: "June", expense: 214 },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

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
        {/* <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Usage Chart</h2>
          <Chart data={mockData} />
        </Card> */}
        {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={[{ name: "Temperature", desktop: mockData.temperature, mobile: mockData.humidity }]}>
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer> */}
        <Card>
          <CardHeader>
            <CardTitle>Line Chart - Linear</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
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
                  dataKey="expense"
                  type="linear"
                  stroke="rgb(128, 128, 128)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={[
                    { name: "Temperature", value: mockData.temperature },
                    { name: "Humidity", value: mockData.humidity },
                  ]}
                  dataKey="value"
                  nameKey="name"
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      {/* <p className="text-sm text-muted-foreground">Last updated: {mockData.lastUpdated}</p> */}
    </div>
  );
}