import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
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

      const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${ticker}&module=balance-sheet`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });

      const data = (await response.json()).body?.balanceSheetHistory
        ?.balanceSheetStatements;

      const balanceSheet = [
        {
          metric: "Total Assets",
          fy2024: data[0]?.totalAssets?.fmt || "N/A",
          fy2023: data[1]?.totalAssets?.fmt || "N/A",
          fy2022: data[2]?.totalAssets?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.totalAssets?.raw || 0,
            data[0]?.totalAssets?.raw || 0
          ),
        },
        {
          metric: "Total Debt",
          fy2024: data[0]?.longTermDebt?.fmt || "N/A",
          fy2023: data[1]?.longTermDebt?.fmt || "N/A",
          fy2022: data[2]?.longTermDebt?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.longTermDebt?.raw || 0,
            data[0]?.longTermDebt?.raw || 0
          ),
        },
        {
          metric: "Shareholders' Equity",
          fy2024: data[0]?.totalStockholderEquity?.fmt || "N/A",
          fy2023: data[1]?.totalStockholderEquity?.fmt || "N/A",
          fy2022: data[2]?.totalStockholderEquity?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.totalStockholderEquity?.raw || 0,
            data[0]?.totalStockholderEquity?.raw || 0
          ),
        },
        {
          metric: "Cash",
          fy2024: data[0]?.cash?.fmt || "N/A",
          fy2023: data[1]?.cash?.fmt || "N/A",
          fy2022: data[2]?.cash?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.cash?.raw || 0,
            data[0]?.cash?.raw || 0
          ),
        },
      ];

      res.status(200).json({
        message: "Balance sheet successfully fetched",
        data: balanceSheet,
      });
    } catch (error) {
      console.error("Error fetching balance sheet: ", error);
      res.status(500).json({ message: "Error fetching balance sheet" });
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
