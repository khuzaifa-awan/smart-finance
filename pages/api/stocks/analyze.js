import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/utils/mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  await dbConnect();

  const apiKey = process.env.GEMINI_API_KEY;

  // Initialize Gemini SDK
  const genAI = new GoogleGenerativeAI(apiKey);

  if (req.method === "POST") {
    try {
      const { ticker } = req.body;

      const today = new Date();
      const end = today.toISOString().split("T")[0];

      // Create a new date for 'start', move back 6 months
      const sixMonthsAgo = new Date(today);
      sixMonthsAgo.setMonth(today.getMonth() - 6);
      if (today.getDate() !== sixMonthsAgo.getDate()) sixMonthsAgo.setDate(0);
      const start = sixMonthsAgo.toISOString().split("T")[0];

      const payload = {
        ticker,
        start_date: start,
        end_date: end,
      };
      const modelResponse = await fetch(
        `${process.env.MODEL_API_URL}/stock_insights`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const { gemini_insights: aiInsights } = await modelResponse.json();

      // Gemini Prompt Construction
      const geminiPrompt = `
You are a finance AI. Your task is to strictly extract and provide the following details from the user-provided insights. 
You must always return all of these fields: "action", "targetPrice", "potential", "confidence", "summary". 
If any field is missing or is not directly mentioned in the insights, you must infer, estimate, or use your own finance knowledge (as of 2024-25) to return the most appropriate value. 
DO NOT leave any field missing or null. Always return ALL fields, and use your best judgment when data is not present.
Respond ONLY in valid, minified JSON, with no explanations, no markdown, and no extra text.

Here are the insights (may include price, action, confidence, and summary):
---
${aiInsights}
---

Strictly return a JSON object in this format (with ALL fields):
{
  "action": "Buy or Sell",
  "targetPrice": float,
  "potential": float, // upside or downside %, use your finance knowledge if missing
  "confidence": integer, // percent confidence (0-100), not string, use your own estimate if needed
  "summary": "3-4 line summary of these insights."
}
`;
      // Use Gemini SDK
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(geminiPrompt);
      const response = result.response;
      const text = response.text();
      console.log({ text });

      let extracted;
      try {
        extracted = JSON.parse(text);
      } catch {
        console.error("Gemini returned non-JSON output:", result);
        extracted = null;
      }

      res.status(200).json({
        message: "Ai analysis successfully completed",
        data: extracted,
      });
    } catch (error) {
      console.error("Error fetching stock search: ", error);
      res.status(500).json({ message: "Error fetching stock search" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
