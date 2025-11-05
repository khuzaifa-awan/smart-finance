import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/utils/mongoose";

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
      const { ticker } = req.query;

      const rsi = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/indicators/rsi?symbol=${ticker}&interval=1mo&series_type=close&time_period=14&limit=1`;
      const macdUrl = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/indicators/macd?symbol=${ticker}&interval=1mo&series_type=close&fast_period=12&slow_period=26&signal_period=9&limit=1`;
      const fiftyTwoWeek = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${ticker}`;

      const [rsiResponse, macdResponse, fiftyTwoWeekResponse] =
        await Promise.all([
          fetch(rsi, {
            method: "GET",
            headers: {
              "x-rapidapi-key": api,
              "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
            },
          }),
          fetch(macdUrl, {
            method: "GET",
            headers: {
              "x-rapidapi-key": api,
              "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
            },
          }),
          fetch(fiftyTwoWeek, {
            method: "GET",
            headers: {
              "x-rapidapi-key": api,
              "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
            },
          }),
        ]);

      const { RSI } = (await rsiResponse.json()).body[0];
      const { MACD: macd, MACD_Signal: signal } = (await macdResponse.json())
        .body[0];
      const { fiftyTwoWeekLow, fiftyTwoWeekHigh } = (
        await fiftyTwoWeekResponse.json()
      ).body[0];

      let trend = "NEUTRAL";

      if (macd > signal) {
        trend = "BULLISH";
      } else if (macd < signal) {
        trend = "BEARISH";
      } else {
        trend = "NEUTRAL";
      }

      res.status(200).json({
        message: "Search Data successfully fetched",
        data: {
          rsi: RSI,
          macd: trend,
          fiftyTwoWeekLow,
          fiftyTwoWeekHigh,
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
