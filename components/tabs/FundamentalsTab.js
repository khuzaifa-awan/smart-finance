import {
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";

export function FundamentalsTab({ stock }) {
  const [openSections, setOpenSections] = useState({
    income: false,
    balance: false,
    cashflow: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [incomeStatement, setIncomeStatement] = useState([]);
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [cashFlow, setCashFlow] = useState([]);

  useEffect(() => {
    const fetchStockIncomeStatement = async () => {
      try {
        const response = await fetch(
          `/api/stocks/fundamentals/income?ticker=${stock.symbol}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock income statement");
        }

        const { data } = await response.json();
        setIncomeStatement(data);
      } catch (error) {
        console.error("Error fetching stock income statement:", error);
      }
    };

    fetchStockIncomeStatement();
  }, [stock]);

  useEffect(() => {
    const fetchStockBalanceSheet = async () => {
      try {
        const response = await fetch(
          `/api/stocks/fundamentals/balance?ticker=${stock.symbol}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock balance sheet");
        }

        const { data } = await response.json();
        setBalanceSheet(data);
      } catch (error) {
        console.error("Error fetching stock balance sheet:", error);
      }
    };

    fetchStockBalanceSheet();
  }, [stock]);

  useEffect(() => {
    const fetchStockCashflow = async () => {
      try {
        const response = await fetch(
          `/api/stocks/fundamentals/cash-flow?ticker=${stock.symbol}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock cashflow");
        }

        const { data } = await response.json();
        setCashFlow(data);
      } catch (error) {
        console.error("Error fetching stock cashflow:", error);
      }
    };

    fetchStockCashflow();
  }, [stock]);

  const renderFinancialTable = (data, title) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-muted-foreground">Metric</th>
            <th className="text-right py-2 text-muted-foreground">FY 2024</th>
            <th className="text-right py-2 text-muted-foreground">FY 2023</th>
            <th className="text-right py-2 text-muted-foreground">FY 2022</th>
            <th className="text-right py-2 text-muted-foreground">Growth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 font-medium">{row.metric}</td>
              <td className="text-right py-2">{row.fy2024}</td>
              <td className="text-right py-2">{row.fy2023}</td>
              <td className="text-right py-2">{row.fy2022}</td>
              <td
                className={`text-right py-2 ${
                  row.growth > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                <div className="flex items-center justify-end space-x-1">
                  {row.growth > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{row.growth}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Financial Statements Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Statements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Collapsible
            open={openSections.income}
            onOpenChange={() => toggleSection("income")}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">Income Statement</div>
                  <div className="text-sm text-muted-foreground">
                    Strong revenue growth with improving profitability margins
                  </div>
                </div>
                {openSections.income ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              {renderFinancialTable(incomeStatement, "Income Statement")}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSections.balance}
            onOpenChange={() => toggleSection("balance")}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">Balance Sheet</div>
                  <div className="text-sm text-muted-foreground">
                    Solid balance sheet with decreasing debt levels
                  </div>
                </div>
                {openSections.balance ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              {renderFinancialTable(balanceSheet, "Balance Sheet")}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible
            open={openSections.cashflow}
            onOpenChange={() => toggleSection("cashflow")}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-4 h-auto"
              >
                <div className="text-left">
                  <div className="font-medium">Cash Flow Statement</div>
                  <div className="text-sm text-muted-foreground">
                    Consistent cash generation with healthy free cash flow
                  </div>
                </div>
                {openSections.cashflow ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              {renderFinancialTable(cashFlow, "Cash Flow Statement")}
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}

FundamentalsTab.propTypes = {
  stock: PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    currentPrice: PropTypes.number.isRequired,
    dailyChange: PropTypes.number.isRequired,
    dailyChangePercent: PropTypes.number.isRequired,
    volume: PropTypes.string.isRequired,
    marketCap: PropTypes.string.isRequired,
    sector: PropTypes.string.isRequired,
  }).isRequired,
};
