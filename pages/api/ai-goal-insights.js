import clientPromise from "@/utils/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import UserPreferences from "@/models/UserPreferences";
import dbConnect from "@/utils/mongoose";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  await dbConnect();

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const client = await clientPromise;
    const db = client.db();
    const userId = session.user.id;

    const userPreferences = await UserPreferences.findOne({ userId });

    // Calculate total income for this user from the budgets collection
    const budgets = await db.collection("budgets").find({ userId }).toArray();
    const totalIncome = budgets.reduce(
      (sum, entry) => sum + (entry.amount || 0),
      0
    );

    const months_remaining =
      new Date(req.body.deadline).getMonth() - new Date().getMonth();

    const expense_ratio = userPreferences.monthlyFixedExpenses / totalIncome;
    const savings_rate = userPreferences.savingsGoal / totalIncome;
    const dependents_impact = userPreferences.dependents / 6;
    const financial_health_score =
      0.4 * (1 - expense_ratio) +
      0.4 * savings_rate +
      0.2 * (1 - dependents_impact);

    const total_potential_savings =
      totalIncome * (userPreferences.desiredSavingsPercentage / 100);

    const suggested_monthly_plan =
      months_remaining > 0
        ? req.body.target / months_remaining
        : req.body.target;

    const payload = {
      income: totalIncome,
      total_expenses: userPreferences.monthlyFixedExpenses,
      goal_target_amount: req.body.target,
      months_remaining: months_remaining,
      monthly_saving_label_raw: userPreferences.savingsGoal,
      expense_ratio,
      savings_rate,
      financial_health_score,
      total_potential_savings,
      suggested_monthly_plan,
      savings_is_synthetic: 0,
      age: userPreferences.age,
      dependents: userPreferences.dependents,
      occupation: userPreferences.occupation,
      city_tier: userPreferences.cityTier,
      education: userPreferences.education,
      desired_savings_percentage: userPreferences.desiredSavingsPercentage,
      potential_savings_education: 0,
    };

    const response = await fetch(
      `${process.env.MODEL_API_URL}/predict_savings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    res.status(200).json({
      achievability: Math.floor(data.confidence * 100),
      detailedInsights: data.gemini_insights,
      monthlySavingsTarget: suggested_monthly_plan,
      timelineMonths: months_remaining,
    });
  } catch (error) {
    console.error("Error fetch Ai Insights:", error);
    res.status(500).json({ message: "Error fetch Ai Insights" });
  }
}
