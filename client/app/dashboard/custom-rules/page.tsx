'use client'; 

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


// Define the interface for the rule
interface Rule {
  applianceName: string;
  temperatureThreshold: string;
  humidityThreshold: string;
}

export default function CustomRules() {
  const [applianceName, setApplianceName] = useState('');
  const [temperatureThreshold, setTemperatureThreshold] = useState('');
  const [humidityThreshold, setHumidityThreshold] = useState('');
  
  // Specify the type of rules as an array of Rule
  const [rules, setRules] = useState<Rule[]>([]);

  const handleAddRule = () => {
    if (applianceName && (temperatureThreshold || humidityThreshold)) {
      setRules([...rules, { applianceName, temperatureThreshold, humidityThreshold }]);
      setApplianceName('');
      setTemperatureThreshold('');
      setHumidityThreshold('');
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
              <Label htmlFor="applianceName">Appliance Name</Label>
              <Input
                id="applianceName"
                type="text"
                value={applianceName}
                onChange={(e) => setApplianceName(e.target.value)}
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
                  <p className="font-bold">{rule.applianceName}</p>
                  {rule.temperatureThreshold && (
                    <p>Notify to turn on if temperature {rule.temperatureThreshold}°C</p>
                  )}
                  {rule.humidityThreshold && (
                    <p>Notify to turn on if humidity {rule.humidityThreshold}%</p>
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