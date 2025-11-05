import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";
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

      const url = `https://yahoo-finance15.p.rapidapi.com/api/v1/markets/stock/modules?ticker=${ticker}&module=cashflow-statement`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-key": api,
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
        },
      });

      const data = (await response.json()).body?.cashflowStatementHistory
        ?.cashflowStatements;

      const cashFlow = [
        {
          metric: "Operating Cash Flow",
          fy2024: data[0]?.totalCashFromOperatingActivities?.fmt || "N/A",
          fy2023: data[1]?.totalCashFromOperatingActivities?.fmt || "N/A",
          fy2022: data[2]?.totalCashFromOperatingActivities?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.totalCashFromOperatingActivities?.raw || 0,
            data[0]?.totalCashFromOperatingActivities?.raw || 0
          ),
        },
        {
          metric: "Investing Cash Flow",
          fy2024: data[0]?.totalCashflowsFromInvestingActivities?.fmt || "N/A",
          fy2023: data[1]?.totalCashflowsFromInvestingActivities?.fmt || "N/A",
          fy2022: data[2]?.totalCashflowsFromInvestingActivities?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.totalCashflowsFromInvestingActivities?.raw || 0,
            data[0]?.totalCashflowsFromInvestingActivities?.raw || 0
          ),
        },
        {
          metric: "Financing Cash Flow",
          fy2024: data[0]?.totalCashFromFinancingActivities?.fmt || "N/A",
          fy2023: data[1]?.totalCashFromFinancingActivities?.fmt || "N/A",
          fy2022: data[2]?.totalCashFromFinancingActivities?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.totalCashFromFinancingActivities?.raw || 0,
            data[0]?.totalCashFromFinancingActivities?.raw || 0
          ),
        },
        {
          metric: "Net Cash Flow",
          fy2024: data[0]?.changeInCash?.fmt || "N/A",
          fy2023: data[1]?.changeInCash?.fmt || "N/A",
          fy2022: data[2]?.changeInCash?.fmt || "N/A",
          growth: calculatePercentageChange(
            data[2]?.changeInCash?.raw || 0,
            data[0]?.changeInCash?.raw || 0
          ),
        },
      ];

      res.status(200).json({
        message: "Cashflow statement successfully fetched",
        data: cashFlow,
      });
    } catch (error) {
      console.error("Error fetching Cashflow statement: ", error);
      res.status(500).json({ message: "Error fetching Cashflow statement" });
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
