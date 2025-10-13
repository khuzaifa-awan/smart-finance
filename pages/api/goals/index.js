import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import Goal from "@/models/Goal";
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
      const { title, target, deadline } = req.body;

      const goal = await Goal.create({
        title,
        targetAmount: target,
        deadline,
        createdBy: userId,
      });

      return res.status(201).json({ message: "New Goal Created", data: goal });
    } catch (error) {
      console.error("Error creating goal: ", error);
      res.status(500).json({ message: "Error creating goal" });
    }
  } else if (req.method === "GET") {
    try {
      const goals = await Goal.find({ createdBy: userId });
      return res
        .status(200)
        .json({ data: goals, message: "Goals fetched successfully" });
    } catch (error) {
      console.error("Error fetching goals: ", error);
      res.status(500).json({ message: "Error fetching goals" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
