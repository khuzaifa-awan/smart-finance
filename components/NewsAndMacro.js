import { 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ExternalLink,
  PieChart,
  DollarSign,
  Percent,
  ArrowUpDown
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function NewsAndMacro({ stock }) {
  // Mock news data
  const latestNews = [
    {
      headline: `${stock.companyName} Q3 Earnings Beat Expectations`,
      source: "Financial Express",
      time: "2h ago",
      sentiment: "positive",
      impact: "high"
    },
    {
      headline: "Chemical Sector Outlook Remains Strong Despite Headwinds",
      source: "Business Recorder",
      time: "4h ago",
      sentiment: "positive",
      impact: "medium"
    },
    {
      headline: "PKR Volatility Creates Mixed Market Sentiment",
      source: "Dawn Business",
      time: "6h ago",
      sentiment: "neutral",
      impact: "medium"
    }
  ];

  // Mock macro data
  const macroData = {
    sbpRate: 22.0,
    inflation: 29.2,
    pkrUsd: 278.45,
    psxIndex: 45672,
    psxChange: 1.24
  };

  // Mock analyst data
  const analystRatings = {
    buy: 8,
    hold: 3,
    sell: 1,
    total: 12,
    avgTarget: 285
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* News Feed Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Latest News</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestNews.map((news, index) => (
            <div key={index} className="space-y-2 pb-4 border-b last:border-b-0 last:pb-0">
              <div className="flex items-start justify-between space-x-2">
                <h4 className="text-sm font-medium leading-tight flex-1">
                  {news.headline}
                </h4>
                <Button variant="ghost" size="sm" className="h-auto p-1 flex-shrink-0">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getSentimentColor(news.sentiment)}>
                  {news.sentiment}
                </Badge>
                <Badge variant="outline" className={getImpactColor(news.impact)}>
                  {news.impact} impact
                </Badge>
              </div>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{news.time}</span>
                <span>•</span>
                <span>{news.source}</span>
              </div>
            </div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full">
            View All News
          </Button>
        </CardContent>
      </Card>

      {/* Macro Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Macro Snapshot</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">SBP Interest Rate</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{macroData.sbpRate}%</div>
                <Badge variant="secondary" className="text-xs">
                  ↓ hurts auto sector
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Inflation Rate</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{macroData.inflation}%</div>
                <Badge variant="secondary" className="text-xs">
                  ↑ hurts consumer
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">PKR/USD</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{macroData.pkrUsd}</div>
                <Badge variant="secondary" className="text-xs">
                  ↓ benefits exporters
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">PSX Index</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{macroData.psxIndex.toLocaleString()}</div>
                <div className={`text-xs ${macroData.psxChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {macroData.psxChange >= 0 ? '+' : ''}{macroData.psxChange}%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analyst Sentiment Widget */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Analyst Sentiment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Pie Chart Representation */}
          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="4"
              />
              {/* Buy segment */}
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeDasharray={`${(analystRatings.buy / analystRatings.total) * 88} 88`}
                strokeDashoffset="0"
              />
              {/* Hold segment */}
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                strokeDasharray={`${(analystRatings.hold / analystRatings.total) * 88} 88`}
                strokeDashoffset={`-${(analystRatings.buy / analystRatings.total) * 88}`}
              />
              {/* Sell segment */}
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                strokeDasharray={`${(analystRatings.sell / analystRatings.total) * 88} 88`}
                strokeDashoffset={`-${((analystRatings.buy + analystRatings.hold) / analystRatings.total) * 88}`}
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-medium">{analystRatings.total}</div>
                <div className="text-xs text-muted-foreground">Analysts</div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Buy</span>
              </div>
              <span className="text-sm font-medium">{analystRatings.buy}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Hold</span>
              </div>
              <span className="text-sm font-medium">{analystRatings.hold}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Sell</span>
              </div>
              <span className="text-sm font-medium">{analystRatings.sell}</span>
            </div>
          </div>
          
          <div className="pt-3 border-t text-center">
            <div className="text-sm text-muted-foreground">Avg Target Price</div>
            <div className="text-lg font-medium">PKR {analystRatings.avgTarget}</div>
            <div className="text-sm text-green-600">
              +{(((analystRatings.avgTarget - stock.currentPrice) / stock.currentPrice) * 100).toFixed(1)}% upside
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}