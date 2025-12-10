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

      const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${ticker}&module=income-statement`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });

      const data = (await response.json()).body?.incomeStatementHistory
        ?.incomeStatementHistory;

      const incomeStatement = [
        {
          metric: "Revenue",
          fy2024: data[0]?.totalRevenue?.fmt || "N/A",
          fy2023: data[1]?.totalRevenue?.fmt || "N/A",
          fy2022: data[2]?.totalRevenue?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.totalRevenue?.raw || 0,
            data[0]?.totalRevenue?.raw || 0
          ),
        },
        {
          metric: "Gross Profit",
          fy2024: data[0]?.grossProfit?.fmt || "N/A",
          fy2023: data[1]?.grossProfit?.fmt || "N/A",
          fy2022: data[2]?.grossProfit?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.grossProfit?.raw || 0,
            data[0]?.grossProfit?.raw || 0
          ),
        },
        {
          metric: "Operating Income",
          fy2024: data[0]?.operatingIncome?.fmt || "N/A",
          fy2023: data[1]?.operatingIncome?.fmt || "N/A",
          fy2022: data[2]?.operatingIncome?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.operatingIncome?.raw || 0,
            data[0]?.operatingIncome?.raw || 0
          ),
        },
        {
          metric: "Net Income",
          fy2024: data[0]?.netIncome?.fmt || "N/A",
          fy2023: data[1]?.netIncome?.fmt || "N/A",
          fy2022: data[2]?.netIncome?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.netIncome?.raw || 0,
            data[0]?.netIncome?.raw || 0
          ),
        },
      ];

      res.status(200).json({
        message: "Income statement successfully fetched",
        data: incomeStatement,
      });
    } catch (error) {
      console.error("Error fetching income statement: ", error);
      res.status(500).json({ message: "Error fetching income statement" });
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
