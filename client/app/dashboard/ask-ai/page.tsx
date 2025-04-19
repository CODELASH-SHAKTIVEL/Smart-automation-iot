'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

export default function AskAI() {
  const [billFile, setBillFile] = useState<File | null>(null);
  const [applianceCount, setApplianceCount] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [question, setQuestion] = useState<string>('');

  type ChatMessage = {
    role: 'user' | 'ai';
    message: string;
  };

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [aiSubmitResponse, setAiSubmitResponse] = useState<string>('');
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBillFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!billFile) {
      alert("Please upload a bill file.");
      return;
    }

    const formData = new FormData();
    formData.append("bill", billFile);
    formData.append("applianceCount", applianceCount);
    formData.append("additionalInfo", additionalInfo);

    setLoadingSubmit(true);
    try {
      const res = await axios.post("http://localhost:5000/estimate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAiSubmitResponse(res.data.formattedAnalysis);
    } catch (err: any) {
      console.error("Submit Error:", err.message);
      alert(`Submit failed: ${err.message}`);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleChat = async () => {
    if (!question.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { role: 'user', message: question },
    ]);

    setLoadingChat(true);

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: question,
        formattedAnalysis: aiSubmitResponse,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const aiMessage = {
        role: 'ai' as const,
        message: res.data.answer || "No response from AI",
      };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      console.error("Chat Error:", err.response?.data || err.message);
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', message: "Something went wrong." },
      ]);
    } finally {
      setLoadingChat(false);
      setQuestion('');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-4xl font-bold text-center">Ask AI About Your Electricity Bill</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* CARD 1: Upload Bill */}
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
                min={0}
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
            <Button onClick={handleSubmit} disabled={loadingSubmit}>
              {loadingSubmit ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </Card>

        {/* CARD 2: Chat Input */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Chat with AI</h2>
          <div className="space-y-4">
            <p>Ask your questions about your electricity bill and appliances.</p>
            <Textarea
              placeholder="Type your question here..."
              className="resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Button onClick={handleChat} disabled={loadingChat}>
              {loadingChat ? "Sending..." : "Send"}
            </Button>
          </div>
        </Card>

        {/* CARD 3: AI Analysis after Submit */}
        <Card className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">AI Analysis from Uploaded Bill</h2>
          <p className="whitespace-pre-line">
            {aiSubmitResponse || "No analysis yet. Please submit your bill."}
          </p>
        </Card>

        {/* CARD 4: Chat History */}
        <Card className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
          <h2 className="text-2xl font-semibold">AI Chat Response</h2>
          <div className="space-y-3">
            {chatHistory.length === 0 ? (
              <p className="text-gray-500">No chat history yet.</p>
            ) : (
              chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${chat.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}
                >
                  <span className="block text-sm font-semibold capitalize">{chat.role}</span>
                  <p className="whitespace-pre-wrap">{chat.message}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
