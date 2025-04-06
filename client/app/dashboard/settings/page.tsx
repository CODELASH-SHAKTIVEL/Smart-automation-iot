'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [pollingInterval, setPollingInterval] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pollingInterval">Sensor Polling Interval (seconds)</Label>
            <Input
              id="pollingInterval"
              type="number"
              min="1"
              value={pollingInterval}
              onChange={(e) => setPollingInterval(Number(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode">Dark Mode</Label>
            <Switch
              id="darkMode"
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
          </div>
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </Card>
    </div>
  );
}