import dbConnect from "@/utils/mongoose";
import UserPreferences from "@/models/UserPreferences";
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
      const preferences = await UserPreferences.findOne({ userId });
      res.status(200).json(preferences || {});
    } catch (error) {
      res.status(500).json({ message: "Error fetching preferences" });
    }
  }

  if (req.method === "POST") {
    try {
      const preferences = await UserPreferences.findOneAndUpdate(
        { userId },
        { ...req.body, userId, updatedAt: new Date() },
        { new: true, upsert: true }
      );
      res.status(200).json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Error saving preferences" });
    }
  }
}
