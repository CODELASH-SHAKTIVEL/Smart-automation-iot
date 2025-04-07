'use client'; 

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component

export default function AskAI() {
  const [billFile, setBillFile] = useState<File | null>(null);
  const [applianceCount, setApplianceCount] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBillFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle the submission logic here
    console.log("Bill File:", billFile);
    console.log("Appliance Count:", applianceCount);
    console.log("Additional Info:", additionalInfo);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-4xl font-bold text-center">Ask AI About Your Electricity Bill</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Upload Your Electricity Bill</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billUpload">Select Bill File</Label>
              <Input
                id="billUpload"
                type="file"
                accept=".pdf, .jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="applianceCount">Number of Appliances</Label>
              <Input
                id="applianceCount"
                type="number"
                value={applianceCount}
                onChange={(e) => setApplianceCount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Any other details you want to share..."
              />
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Chat with AI</h2>
          <div className="space-y-4">
            <p>Ask your questions about your electricity bill and appliances.</p>
            <Textarea
              placeholder="Type your question here..."
              className="resize-none"
            />
            <Button>Send</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}