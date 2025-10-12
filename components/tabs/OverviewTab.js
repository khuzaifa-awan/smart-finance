import { Brain, TrendingUp, Activity } from "lucide-react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";

export function OverviewTab({ stock }) {
  const confidenceScore = 85;
  const aiSummary = `${stock.companyName} shows strong earnings performance with solid fundamentals. Current valuation appears undervalued compared to industry peers, presenting a potential buying opportunity. The company maintains healthy cash flows and competitive positioning in the ${stock.sector.toLowerCase()} sector.`;

  return (
    <div className="space-y-6">
      {/* AI Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-blue-600" />
            <span>AI Investment Summary</span>
            <Badge variant="secondary" className="ml-auto">
              {confidenceScore}% Confidence
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed">{aiSummary}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">AI Confidence Score</span>
              <span className="font-medium">{confidenceScore}%</span>
            </div>
            <Progress value={confidenceScore} className="h-2" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-medium text-green-600">Buy</div>
              <p className="text-xs text-muted-foreground">Recommendation</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">PKR 280</div>
              <p className="text-xs text-muted-foreground">Target Price</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium text-green-600">+9.6%</div>
              <p className="text-xs text-muted-foreground">Upside Potential</p>
            </div>
          </div>
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
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">1 Day</span>
                  <span className={`font-medium ${stock.dailyChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.dailyChangePercent >= 0 ? '+' : ''}{stock.dailyChangePercent.toFixed(2)}%
                  </span>
                </div>
                <Progress 
                  value={Math.abs(stock.dailyChangePercent) * 10} 
                  className="h-1"
                />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">1 Week</span>
                  <span className="font-medium text-green-600">+3.2%</span>
                </div>
                <Progress value={32} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">1 Month</span>
                  <span className="font-medium text-green-600">+7.8%</span>
                </div>
                <Progress value={78} className="h-1" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">3 Months</span>
                  <span className="font-medium text-green-600">+12.4%</span>
                </div>
                <Progress value={62} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">6 Months</span>
                  <span className="font-medium text-green-600">+18.7%</span>
                </div>
                <Progress value={93} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">1 Year</span>
                  <span className="font-medium text-green-600">+25.3%</span>
                </div>
                <Progress value={84} className="h-1" />
              </div>
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
                <span className="text-sm font-medium">58.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">MACD</span>
                <span className="text-sm font-medium text-green-600">Bullish</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Volume Ratio</span>
                <span className="text-sm font-medium">1.24x</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Beta</span>
                <span className="text-sm font-medium">0.87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">52W High</span>
                <span className="text-sm font-medium">PKR 295</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">52W Low</span>
                <span className="text-sm font-medium">PKR 180</span>
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