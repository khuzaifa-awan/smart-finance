import clientPromise from "@/utils/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const client = await clientPromise;
    const db = client.db();
    const userId = session.user.id;

    // Get last 12 months of data
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const [incomeData, expenseData] = await Promise.all([
      db
        .collection("budgets")
        .find({
          userId,
          timestamp: { $gte: twelveMonthsAgo },
        })
        .toArray(),
      db
        .collection("expenses")
        .find({
          userId,
          timestamp: { $gte: twelveMonthsAgo },
        })
        .toArray(),
    ]);

    // Process data
    const analysis = {
      averageMonthlyIncome: calculateAverageMonthly(incomeData),
      categorySpending: calculateCategorySpending(expenseData),
      seasonalTrends: calculateSeasonalTrends(expenseData),
      spendingPatterns: analyzeSpendingPatterns(expenseData),
    };

    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error analyzing budget:", error);
    res.status(500).json({ message: "Error analyzing budget" });
  }
}

function calculateAverageMonthly(transactions) {
  if (!transactions.length) return 0;
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  return total / 12;
}

function calculateCategorySpending(expenses) {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});
}

function calculateSeasonalTrends(expenses) {
  // Group expenses by month
  const monthlySpending = {};
  expenses.forEach((expense) => {
    const month = new Date(expense.timestamp).getMonth();
    monthlySpending[month] = (monthlySpending[month] || 0) + expense.amount;
  });
  return monthlySpending;
}

function analyzeSpendingPatterns(expenses) {
  // Group by category and calculate frequency
  const patterns = {};
  expenses.forEach((expense) => {
    if (!patterns[expense.category]) {
      patterns[expense.category] = {
        frequency: 0,
        averageAmount: 0,
        totalAmount: 0,
      };
    }
    patterns[expense.category].frequency++;
    patterns[expense.category].totalAmount += expense.amount;
  });

  // Calculate averages
  Object.values(patterns).forEach((pattern) => {
    pattern.averageAmount = pattern.totalAmount / pattern.frequency;
  });

  return patterns;
}
