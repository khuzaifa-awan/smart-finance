import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import clientPromise from "@/utils/mongodb";
import dbConnect from "@/utils/mongoose";

// Utility to extract category: value pairs from text
function extractBudgetFromText(text) {
  const lines = text.split(/\n+/);
  const budget = {};

  for (const line of lines) {
    const match = line.match(/([a-zA-Z\s]+):\s*(\d+)/);
    if (match) {
      const category = match[1].trim().toLowerCase();
      const amount = parseFloat(match[2]);
      if (!isNaN(amount)) {
        budget[category] = amount;
      }
    }
  }

  return budget;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const { userData } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Ensure selectedCategories exists
    const selectedCategories = userData.selectedCategories || [];

    // Get user's income and expenses from the database
    const client = await clientPromise;
    const db = client.db();
    const userId = session.user.id;

    const [incomeData, expenseData] = await Promise.all([
      db
        .collection("budgets")
        .aggregate([
          { $match: { userId } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray(),
      db
        .collection("expenses")
        .aggregate([
          { $match: { userId } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ])
        .toArray(),
    ]);

    const monthlyIncome = (incomeData[0]?.total || 0) / 12;
    const monthlyExpenses = (expenseData[0]?.total || 0) / 12;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `As a financial advisor, create a monthly budget recommendation based on the following data:
Monthly Income: ${monthlyIncome}
Current Monthly Expenses: ${monthlyExpenses}
Categories to budget for: ${selectedCategories.join(", ")}
User Preferences: ${JSON.stringify(userData, null, 2)}

Provide ONLY a list of recommended monthly budget amounts for the specified categories.
Format each line as "Category: amount" with no additional text.
Important: Total budget should not exceed monthly income of ${monthlyIncome}.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await response.json();
    console.log("Gemini Response:", JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log("Raw Text Response:", text);
    if (!text) {
      console.error("Raw response:", data);
      return res.status(500).json({ error: "No content received from Gemini" });
    }

    // Remove any markdown or extra formatting
    const cleanText = text.replace(/\*\*/g, "").replace(/^\s*[\r\n]/gm, "");
    const recommendations = extractBudgetFromText(cleanText);
    console.log("Parsed Recommendations:", recommendations);
    if (!Object.keys(recommendations).length) {
      return res
        .status(500)
        .json({ error: "Could not extract any budget data from response" });
    }

    return res.status(200).json(recommendations);
  } catch (error) {
    console.error("Error in generateBudget:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate budget recommendations" });
  }
}
