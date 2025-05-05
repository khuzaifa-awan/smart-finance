import dbConnect from "@/utils/mongoose";
import BudgetLimit from "../../models/BudgetLimit";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      const limits = await BudgetLimit.find({ userId });
      return res.status(200).json(limits);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching budget limits" });
    }
  }

  if (req.method === "POST") {
    try {
      const { category, limit, period, subCategories } = req.body;

      // Check if limit already exists for this category
      const existingLimit = await BudgetLimit.findOne({ userId, category });

      if (existingLimit) {
        // Update existing limit
        const updated = await BudgetLimit.findByIdAndUpdate(
          existingLimit._id,
          { limit, period, subCategories },
          { new: true }
        );
        return res.status(200).json(updated);
      }

      // Create new limit
      const newLimit = await BudgetLimit.create({
        userId,
        category,
        limit,
        period,
        subCategories,
      });

      return res.status(201).json(newLimit);
    } catch (error) {
      return res.status(500).json({ message: "Error setting budget limit" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
