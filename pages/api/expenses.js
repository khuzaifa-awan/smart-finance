import clientPromise from "@/utils/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const client = await clientPromise;
    const db = client.db();

    const { category, amount, timestamp } = req.body;

    const result = await db.collection("expenses").insertOne({
      userId: session.user.id,
      category,
      amount,
      timestamp: new Date(timestamp), // Ensure timestamp is saved as Date object
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error saving expense:", error);
    res.status(500).json({ message: "Error saving expense" });
  }
}
