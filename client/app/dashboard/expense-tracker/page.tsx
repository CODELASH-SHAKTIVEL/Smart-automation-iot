'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function ExpenseTracker() {
  const [monthlyLimit, setMonthlyLimit] = useState(300);
  const [rate, setRate] = useState(0.12);
  
  // Mock calculations
  const dailyUsage = 15; // kWh
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
    </div>
  );
}