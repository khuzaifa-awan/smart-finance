import { Brain, TrendingUp, Activity } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { useEffect, useState } from "react";
import { cn } from "../ui/utils";

export function OverviewTab({ stock }) {
  const [aiInsights, setAiInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  const [snapshots, setSnapShots] = useState({
    dayChange: 0,
    weekChange: 0,
    monthChange: 0,
    qtyChange: 0,
  });

  const [indicators, setIndicators] = useState({
    rsi: 0,
    macd: "NEUTRAL",
    fiftyTwoWeekLow: 0,
    fiftyTwoWeekHigh: 0,
  });

  useEffect(() => {
    setAiInsights(null);
  }, [stock]);

  useEffect(() => {
    const fetchStockSnapshots = async () => {
      try {
        const response = await fetch(
          `/api/stocks/overview?ticker=${stock.symbol}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock snapshots");
        }

        const { data } = await response.json();
        setSnapShots(data);
      } catch (error) {
        console.error("Error fetching stock snapshots:", error);
      }
    };

    fetchStockSnapshots();
  }, [stock]);

  useEffect(() => {
    const fetchStockIndicators = async () => {
      try {
        const response = await fetch(
          `/api/stocks/indicators?ticker=${stock.symbol}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock indicators");
        }

        const { data } = await response.json();
        setIndicators(data);
      } catch (error) {
        console.error("Error fetching stock indicators:", error);
      }
    };

    fetchStockIndicators();
  }, [stock]);

  const generateAiInsights = async () => {
    setIsLoadingInsights(true);
    try {
      const response = await fetch("/api/stocks/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ticker: stock.symbol }),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI insights");
      }

      const { data } = await response.json();
      setAiInsights(data);
    } catch (error) {
      console.error("Error generating ai insights", error);
    } finally {
      setIsLoadingInsights(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>AI Investment Summary</span>
            {aiInsights && (
              <Badge variant="secondary" className="ml-auto">
                {aiInsights?.confidence}% Confidence
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!aiInsights ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Brain className="h-12 w-12 text-blue-600 opacity-50" />
              <p className="text-sm text-muted-foreground text-center">
                Generate AI-powered insights and recommendations for this stock
              </p>
              <button
                onClick={generateAiInsights}
                disabled={isLoadingInsights}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoadingInsights ? (
                  <span className="flex items-center space-x-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Analyzing...</span>
                  </span>
                ) : (
                  "Generate AI Insights"
                )}
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed">{aiInsights?.summary}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    AI Confidence Score
                  </span>
                  <span className="font-medium">{aiInsights?.confidence}%</span>
                </div>
                <Progress value={aiInsights?.confidence} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-medium text-green-600">
                    {aiInsights?.action}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommendation
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium">
                    ${aiInsights?.targetPrice}
                  </div>
                  <p className="text-xs text-muted-foreground">Target Price</p>
                </div>
                <div className="text-center">
                  <div
                    className={cn(
                      "text-lg font-medium",
                      aiInsights?.potential >= 0
                        ? "text-green-600"
                        : "text-orange-600"
                    )}
                  >
                    {aiInsights?.potential}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {aiInsights?.potential >= 0 ? "Upside" : "Downside"}{" "}
                    Potential
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Performance Snapshot</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">1 Day</span>
              <span
                className={`font-medium ${
                  snapshots.dayChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {snapshots.dayChange >= 0 ? "+" : ""}
                {snapshots.dayChange}%
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">1 Week</span>
              <span
                className={`font-medium ${
                  snapshots.weekChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {snapshots.weekChange >= 0 ? "+" : ""}
                {snapshots.weekChange}%
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">1 Month</span>
              <span
                className={`font-medium ${
                  snapshots.monthChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {snapshots.monthChange >= 0 ? "+" : ""}
                {snapshots.monthChange}%
              </span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">1 Quarter</span>
              <span
                className={`font-medium ${
                  snapshots.qtyChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {snapshots.qtyChange >= 0 ? "+" : ""}
                {snapshots.qtyChange}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Market Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">RSI (14)</span>
                <span className="text-sm font-medium">{indicators.rsi}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">MACD</span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    indicators.macd === "NEUTRAL" && "text-gray-600",
                    indicators.macd === "BULLISH" && "text-green-600",
                    indicators.macd === "BEARISH" && "text-orange-600"
                  )}
                >
                  {indicators.macd}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">52W High</span>
                <span className="text-sm font-medium">
                  ${indicators.fiftyTwoWeekHigh}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">52W Low</span>
                <span className="text-sm font-medium">
                  ${indicators.fiftyTwoWeekLow}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

OverviewTab.propTypes = {
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
