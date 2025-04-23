'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Rule {
  appliance: string;
  temperatureThreshold: string;
  humidityThreshold: string;
  email: string;
}

export default function CustomRules() {
  const [appliance, setAppliance] = useState('');
  const [temperatureThreshold, setTemperatureThreshold] = useState('');
  const [humidityThreshold, setHumidityThreshold] = useState('');
  const [email, setEmail] = useState('');
  const [rules, setRules] = useState<Rule[]>([]);

  const handleAddRule = async () => {
    if (appliance && email && (temperatureThreshold || humidityThreshold)) {
      const newRule = { appliance, temperatureThreshold, humidityThreshold, email };
      try {
        const response = await fetch('http://localhost:5000/api/rules/add-rule', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRule),
        });

        const result = await response.json();
        if (response.ok) {
          setRules([...rules, newRule]);
          setAppliance('');
          setTemperatureThreshold('');
          setHumidityThreshold('');
          setEmail('');
        } else {
          alert(result.error || "Failed to add rule");
        }
      } catch (error) {
        console.error("Error adding rule:", error);
        alert("Error adding rule");
      }
    } else {
      alert("Please fill appliance, email, and at least one threshold");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Custom Rules for Appliances</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add Appliance and Rules</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appliance">Appliance Name</Label>
              <Input
                id="appliance"
                type="text"
                value={appliance}
                onChange={(e) => setAppliance(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="temperatureThreshold">Temperature Threshold (°C)</Label>
              <Input
                id="temperatureThreshold"
                type="number"
                value={temperatureThreshold}
                onChange={(e) => setTemperatureThreshold(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="humidityThreshold">Humidity Threshold (%)</Label>
              <Input
                id="humidityThreshold"
                type="number"
                value={humidityThreshold}
                onChange={(e) => setHumidityThreshold(e.target.value)}
              />
            </div>
            <Button onClick={handleAddRule}>Add Rule</Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Current Rules</h2>
          <div className="space-y-4">
            {rules.length === 0 ? (
              <p>No rules added yet.</p>
            ) : (
              rules.map((rule, index) => (
                <div key={index} className="border-b py-2">
                  <p className="font-bold">{rule.appliance}</p>
                  <p>Email: {rule.email}</p>
                  {rule.temperatureThreshold && (
                    <p>Notify if temperature ≥ {rule.temperatureThreshold}°C</p>
                  )}
                  {rule.humidityThreshold && (
                    <p>Notify if humidity ≥ {rule.humidityThreshold}%</p>
                  )}
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
