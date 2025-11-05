import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/utils/mongoose";
import { formatNumber } from "../../../components/ui/utils";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  await dbConnect();
  const userId = session.user.id;
  const api = process.env.RAPID_API_KEY;

  if (req.method === "GET") {
    try {
      const { search } = req.query;

      const searchUrl = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/search?search=${search}`;

      const response = await fetch(searchUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });

      const data = (await response.json()).body;

      res.status(200).json({
        message: "Search Data successfully fetched",
        data: data.map((stock) => ({
          symbol: stock.symbol,
          name: stock.shortname,
        })),
      });
    } catch (error) {
      console.error("Error fetching stock search: ", error);
      res.status(500).json({ message: "Error fetching stock search" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
