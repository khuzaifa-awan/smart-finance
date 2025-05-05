import dbConnect from "@/utils/mongoose";
import Budget from "../../../models/Budget";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const userId = session.user.id;

  if (req.method === "GET") {
    const budgets = await Budget.find({ userId });
    return res.status(200).json(budgets);
  }

  if (req.method === "POST") {
    const { category, amount } = req.body;

    if (!category || !amount) {
      return res
        .status(400)
        .json({ message: "Category and amount are required" });
    }

    const newBudget = await Budget.create({
      userId,
      category,
      amount,
    });

    return res.status(201).json(newBudget);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
