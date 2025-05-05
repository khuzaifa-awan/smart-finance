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

  const { id } = req.query;

  if (req.method === "DELETE") {
    const deleted = await Budget.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Budget not found" });
    }

    return res.status(200).json({ message: "Budget deleted" });
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
