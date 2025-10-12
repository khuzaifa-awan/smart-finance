import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Button } from "../ui/button";

export function FundamentalsTab({ stock }) {
  const [openSections, setOpenSections] = useState({
    income: false,
    balance: false,
    cashflow: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock financial data
  const incomeStatement = [
    { metric: "Revenue", fy2023: "150.2B", fy2022: "142.1B", fy2021: "135.8B", growth: "+5.7%" },
    { metric: "Gross Profit", fy2023: "45.1B", fy2022: "42.3B", fy2021: "39.8B", growth: "+6.6%" },
    { metric: "Operating Income", fy2023: "28.5B", fy2022: "26.1B", fy2021: "24.2B", growth: "+9.2%" },
    { metric: "Net Income", fy2023: "22.3B", fy2022: "20.1B", fy2021: "18.7B", growth: "+11.0%" }
  ];

  const balanceSheet = [
    { metric: "Total Assets", fy2023: "285.4B", fy2022: "268.2B", fy2021: "251.3B", growth: "+6.4%" },
    { metric: "Total Debt", fy2023: "45.2B", fy2022: "48.1B", fy2021: "52.3B", growth: "-6.0%" },
    { metric: "Shareholders' Equity", fy2023: "185.6B", fy2022: "172.8B", fy2021: "159.4B", growth: "+7.4%" },
    { metric: "Current Ratio", fy2023: "1.8", fy2022: "1.6", fy2021: "1.5", growth: "+12.5%" }
  ];

  const cashFlow = [
    { metric: "Operating Cash Flow", fy2023: "32.1B", fy2022: "29.8B", fy2021: "27.5B", growth: "+7.7%" },
    { metric: "Free Cash Flow", fy2023: "18.9B", fy2022: "17.2B", fy2021: "15.8B", growth: "+9.9%" },
    { metric: "Capital Expenditure", fy2023: "13.2B", fy2022: "12.6B", fy2021: "11.7B", growth: "+4.8%" },
    { metric: "Dividends Paid", fy2023: "8.5B", fy2022: "7.9B", fy2021: "7.3B", growth: "+7.6%" }
  ];

  const renderFinancialTable = (data, title) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 text-muted-foreground">Metric</th>
            <th className="text-right py-2 text-muted-foreground">FY 2023</th>
            <th className="text-right py-2 text-muted-foreground">FY 2022</th>
            <th className="text-right py-2 text-muted-foreground">FY 2021</th>
            <th className="text-right py-2 text-muted-foreground">Growth</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 font-medium">{row.metric}</td>
              <td className="text-right py-2">{row.fy2023}</td>
              <td className="text-right py-2">{row.fy2022}</td>
              <td className="text-right py-2">{row.fy2021}</td>
              <td className={`text-right py-2 ${row.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                <div className="flex items-center justify-end space-x-1">
                  {row.growth.startsWith('+') ? (
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
          <Collapsible open={openSections.income} onOpenChange={() => toggleSection('income')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
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

          <Collapsible open={openSections.balance} onOpenChange={() => toggleSection('balance')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
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

          <Collapsible open={openSections.cashflow} onOpenChange={() => toggleSection('cashflow')}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
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

      {/* Key Ratios Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Ratios Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Profitability Ratios</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Gross Margin</span>
                    <span className="text-sm font-medium">30.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Operating Margin</span>
                    <span className="text-sm font-medium">19.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Net Margin</span>
                    <span className="text-sm font-medium">14.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ROE</span>
                    <span className="text-sm font-medium">15.2%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Efficiency Ratios</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Asset Turnover</span>
                    <span className="text-sm font-medium">0.53x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Inventory Turnover</span>
                    <span className="text-sm font-medium">6.2x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Receivables Turnover</span>
                    <span className="text-sm font-medium">8.1x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Working Capital Ratio</span>
                    <span className="text-sm font-medium">1.8x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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