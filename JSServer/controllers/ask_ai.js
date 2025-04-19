import fs from 'fs';
import pdfParse from 'pdf-parse';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { extractTextFromPDF } from '../utils/extractTextFromPDF.js';
dotenv.config();


const GEMINI_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

// In-memory store
const billChatMemory = {};

// Store context and reset chat history
const storeBillContext = (userId, context) => {
  billChatMemory[userId] = {
    billContext: context,
    history: [],
  };
};

async function analyzeBillWithGemini(fullPromptText) {
  const prompt = `
You are an electricity usage expert and analyse and provide an report.

A user has uploaded a document, likely an electricity bill, along with some personal details and concerns. Your job is to analyze the document, extract key insights, and provide clear suggestions. The bill may be poorly formatted, partially unreadable, or contain irrelevant data — account for that in your response.

---

📌 Output Format Guidelines:

- Respond using bullet points only.
- Each bullet must be a **complete sentence**, begin with a **capital letter**, and be **separated by a blank line**.
- Use **no more than 10 bullet points**.
- Do **not** use symbols like *, -, or • for bullets.
- If the bill is unclear or not a valid electricity bill, clearly state that in one bullet, then still provide **2–3 practical energy-saving tips** based on the user's context.

---

📊 What to include in your output:

- The billing period (if identifiable).
- Total amount due and payment due date.
- Consumer name and type of connection (residential, commercial, etc., if available).
- Units consumed and any signs of abnormal usage or spikes.
- Whether the document appears to be a valid electricity bill or not.
- A clear response to the user's questions or concerns (if provided).
- Personalized and practical energy-saving suggestions based on the user's appliance list and situation.

---

and the ouput should be in bullet points and should consist of only 10 bullet points and each sentence must be printed in a new line
provide ouput in a structured way i.e each sentence in a new line i.e after full stop

📄 Input Data:
${fullPromptText}
`;



  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data.error?.message || "Gemini API failed");
  }

  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No analysis received from Gemini.";
}

function formatAnalysis(rawText) {
  const cleaned = rawText
    .replace(/\*\*/g, '')
    .replace(/\\n/g, '\n')
    .replace(/[^a-zA-Z0-9\s.,:()\-₹\n]/g, '');

  const mergedLines = cleaned
    .split('\n')
    .reduce((acc, line) => {
      const trimmed = line.trim();
      if (!trimmed) return acc;
      if (trimmed.startsWith('•')) {
        acc.push(trimmed);
      } else {
        if (acc.length > 0) acc[acc.length - 1] += ' ' + trimmed;
        else acc.push(trimmed);
      }
      return acc;
    }, []);

  return mergedLines.join('\n\n');
}


// ✅ Estimate controller with Gemini and memory setup
export const estimateBill = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Electricity bill file is required' });

    const { appliances, additionalInfo, questions } = req.body;

    const { text: billText, method, language } = await extractTextFromPDF(req.file.path);

    const fullPromptText = `
 📄 BILL DOCUMENT CONTENT (${method === 'ocr' ? 'OCR (Scanned)' : 'Text Parsed'}):
${billText}

🌐 Detected Language: ${language || 'unknown'}

📥 USER INFORMATION:
Number of appliances: ${appliances || 'Not provided'}
Additional information: ${additionalInfo || 'None'}

❓ USER QUESTIONS:
${questions || 'None'}
    `;

    const analysis = await analyzeBillWithGemini(fullPromptText);
    const formattedAnalysis = formatAnalysis(analysis);

    fs.unlinkSync(req.file.path); // Cleanup

    const userId = req.user?.id || 'demoUser';
    storeBillContext(userId, formattedAnalysis); // ✅ Save context

    return res.status(200).json({ formattedAnalysis });
  } catch (error) {
    console.error("❌ estimateBill error:", error);
    return res.status(500).json({ error: 'Something went wrong while estimating the bill.' });
  }
};

// ✅ Chat controller using stored context and OpenAI
export const chatWithBillAssistant = async (req, res) => {
  try {
    const { message, formattedAnalysis } = req.body;

    if (!message || !formattedAnalysis) {
      return res.status(400).json({ error: "Both user message and formatted analysis are required." });
    }

    const chatPrompt = [
      {
        role: "model",
        parts: [{
          text: `
You are an intelligent electricity bill assistant.

Your goals:
- Give concise, actionable advice in 2 lines.
- If asked for a number (like hours, units, cost), provide a reasonable estimate based on the bill data.
- Even if the data is incomplete, give best-effort numerical guidance based on average consumption patterns.
- Never say "I can't tell", always provide an estimation.
- Avoid repeating previous tips.

User electricity bill summary:
---
${formattedAnalysis}
---

Answer the user question clearly and numerically if possible.
 `
        }]
      },
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const chatResponse = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: chatPrompt })
    });

    const chatData = await chatResponse.json();
    const reply = chatData.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";

    res.status(200).json({ answer: reply });

  } catch (error) {
    console.error("❌ chatWithBillAssistant Error:", error.message);
    res.status(500).json({ error: "Something went wrong while answering your question." });
  }
};
