import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import GoalContribution from "@/models/GoalContribution";
import dbConnect from "@/utils/mongoose";
import Goal from "@/models/Goal";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  await dbConnect();
  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      // 1. Find all active goals for this user
      const activeGoals = await Goal.find({
        createdBy: userId,
        status: "Active",
      });

      // helpers
      function monthsDiff(startDate, endDate) {
        // count inclusive, min 1
        let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += endDate.getMonth();
        if (endDate.getDate() > startDate.getDate()) months += 1;
        return Math.max(1, months);
      }

      let totalMonthlyTarget = 0;
      const today = new Date();
      activeGoals.forEach((goal) => {
        const deadline = new Date(goal.deadline);
        const monthsLeft = monthsDiff(today, deadline);
        totalMonthlyTarget += goal.targetAmount / monthsLeft;
      });

      const activeGoalIds = activeGoals.map((g) => g._id);
      // 2. Get all contributions for active goals, by this user
      const allContributions = await GoalContribution.find({
        goalId: { $in: activeGoalIds },
        contributorId: userId,
      });

      let totalContributions = 0;
      let currentMonthContributions = 0;
      const thisMonth = today.getMonth();
      const thisYear = today.getFullYear();

      allContributions.forEach((contrib) => {
        totalContributions += contrib.contributionAmount;
        if (
          contrib.createdAt.getMonth() === thisMonth &&
          contrib.createdAt.getFullYear() === thisYear
        ) {
          currentMonthContributions += contrib.contributionAmount;
        }
      });

      return res.status(200).json({
        data: {
          totalMonthlyTarget: Math.round(totalMonthlyTarget * 100) / 100,
          currentMonthContributions:
            Math.round(currentMonthContributions * 100) / 100,
          totalContributions: Math.round(totalContributions * 100) / 100,
        },
        message: "Targets and contribution aggregates fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching contributions: ", error);
      res.status(500).json({ message: "Error fetching contributions" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
