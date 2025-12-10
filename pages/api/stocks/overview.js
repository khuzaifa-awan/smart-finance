import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/utils/mongoose";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  await dbConnect();
  const api = process.env.RAPID_API_KEY;

  if (req.method === "GET") {
    try {
      const { ticker } = req.query;

      const oneDay = `https://yahoo-finance15.p.rapidapi.com/api/v2/markets/stock/history?symbol=${ticker}&interval=1d&limit=1`;
      const oneWeek = `https://yahoo-finance15.p.rapidapi.com/api/v2/markets/stock/history?symbol=${ticker}&interval=1wk&limit=1`;
      const oneMonth = `https://yahoo-finance15.p.rapidapi.com/api/v2/markets/stock/history?symbol=${ticker}&interval=1mo&limit=1`;
      const oneQty = `https://yahoo-finance15.p.rapidapi.com/api/v2/markets/stock/history?symbol=${ticker}&interval=1qty&limit=1`;

      const oneDayResponse = await fetch(oneDay, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });
      const oneWeekResponse = await fetch(oneWeek, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });
      const oneMonthResponse = await fetch(oneMonth, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });
      const oneQtyResponse = await fetch(oneQty, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });

      const { open: openDay, close: closeDay } = (await oneDayResponse.json())
        .body[0];
      const { open: openWeek, close: closeWeek } = (
        await oneWeekResponse.json()
      ).body[0];
      const { open: openMonth, close: closeMonth } = (
        await oneMonthResponse.json()
      ).body[0];
      const { open: openQty, close: closeQty } = (await oneQtyResponse.json())
        .body[0];

      res.status(200).json({
        message: "Search Data successfully fetched",
        data: {
          dayChange: calculatePercentageChange(openDay, closeDay),
          weekChange: calculatePercentageChange(openWeek, closeWeek),
          monthChange: calculatePercentageChange(openMonth, closeMonth),
          qtyChange: calculatePercentageChange(openQty, closeQty),
        },
      });
    } catch (error) {
      console.error("Error fetching stock snapshots: ", error);
      res.status(500).json({ message: "Error fetching stock snapshots" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

function calculatePercentageChange(open, close) {
  // Handle the case where the old value is zero to avoid division by zero
  if (open === 0) {
    if (close === 0) {
      return 0; // No change if both are zero
    } else {
      return Infinity; // Infinite percentage change if old value is zero and new value is not
    }
  }

  const difference = close - open;
  const percentageChange = (difference / open) * 100;
  return percentageChange.toFixed(2);
}
