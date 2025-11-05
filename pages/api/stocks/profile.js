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
      const { ticker } = req.query;

      const overviewUrl = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${ticker}&module=asset-profile`;
      const quoteUrl = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/quotes?ticker=${ticker}`;

      const overviewResponse = await fetch(overviewUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });
      const quoteResponse = await fetch(quoteUrl, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });

      const {
        sector,
        longBusinessSummary: description,
        companyOfficers,
      } = (await overviewResponse.json()).body;

      const {
        symbol,
        shortName: companyName,
        regularMarketVolume,
        regularMarketPrice,
        regularMarketChange,
        regularMarketChangePercent,
        marketCap,
        trailingPE,
        epsTrailingTwelveMonths,
        trailingAnnualDividendYield,
      } = (await quoteResponse.json()).body[0];

      res.status(200).json({
        message: "Profile Data successfully fetched",
        data: {
          symbol,
          companyName,
          marketCap: formatNumber(marketCap),
          description,
          sector,
          ceo: companyOfficers[0]?.name,
          volume: regularMarketVolume ? formatNumber(regularMarketVolume) : 0,
          currentPrice: regularMarketPrice,
          dailyChange: regularMarketChange,
          dailyChangePercent: regularMarketChangePercent,
          pe: trailingPE,
          eps: epsTrailingTwelveMonths,
          dividendYield: trailingAnnualDividendYield,
        },
      });
    } catch (error) {
      console.error("Error fetching stock profile: ", error);
      res.status(500).json({ message: "Error fetching stock profile" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
