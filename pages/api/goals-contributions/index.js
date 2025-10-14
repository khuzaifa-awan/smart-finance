import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import GoalContribution from "@/models/GoalContribution";
import dbConnect from "@/utils/mongoose";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  await dbConnect();
  const userId = session.user.id;

  if (req.method === "POST") {
    try {
      const { goalId, contributionAmount, paymentMethod } = req.body;

      const goalContribution = await GoalContribution.create({
        goalId,
        contributorId: userId,
        contributionAmount,
        paymentMethod,
      });

      return res
        .status(201)
        .json({ message: "Goal Contribution Created", data: goalContribution });
    } catch (error) {
      console.error("Error creating goal contribution: ", error);
      res.status(500).json({ message: "Error creating goal contribution" });
    }
  } else if (req.method === "GET") {
    try {
      const contributions = await GoalContribution.find({
        contributorId: userId,
      }).populate("goalId");
      return res.status(200).json({
        data: contributions,
        message: "Contributions fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching contributions: ", error);
      res.status(500).json({ message: "Error fetching contributions" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
