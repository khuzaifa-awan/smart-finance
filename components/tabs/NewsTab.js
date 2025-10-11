import { Calendar, ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function NewsTab({ stock }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");

  // Mock news data
  const newsItems = [
    {
      id: "1",
      headline: `${stock.companyName} Reports Strong Q3 Earnings, Beats Analyst Expectations`,
      source: "Financial Express",
      publishedAt: "2 hours ago",
      sentiment: "positive",
      summary: "Company reported 15% increase in revenue with improved margins across all business segments.",
      url: "#",
      category: "Earnings"
    },
    {
      id: "2",
      headline: `Analyst Upgrades ${stock.symbol} Price Target Following Strategic Partnership`,
      source: "Business Recorder",
      publishedAt: "6 hours ago",
      sentiment: "positive",
      summary: "New partnership expected to drive growth in emerging markets and increase market share.",
      url: "#",
      category: "Analyst Coverage"
    },
    {
      id: "3",
      headline: "Chemical Sector Faces Regulatory Headwinds in New Environmental Policy",
      source: "Dawn Business",
      publishedAt: "1 day ago",
      sentiment: "negative",
      summary: "New environmental regulations may impact operational costs for chemical manufacturers.",
      url: "#",
      category: "Industry News"
    },
    {
      id: "4",
      headline: `${stock.companyName} Announces PKR 2B Investment in Green Technology`,
      source: "Tribune Business",
      publishedAt: "2 days ago",
      sentiment: "positive",
      summary: "Investment focused on sustainable production methods and renewable energy initiatives.",
      url: "#",
      category: "Corporate News"
    },
    {
      id: "5",
      headline: "PKR Volatility Creates Mixed Outlook for Export-Oriented Companies",
      source: "ProPakistani",
      publishedAt: "3 days ago",
      sentiment: "neutral",
      summary: "Currency fluctuations present both opportunities and challenges for exporters.",
      url: "#",
      category: "Market News"
    }
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-yellow-600" />;
    }
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

  const filteredNews = newsItems.filter(item => {
    // Simple time filtering logic (in real app, would use actual dates)
    if (selectedTimeframe === "1d") return item.publishedAt.includes("hour");
    if (selectedTimeframe === "7d") return !item.publishedAt.includes("week");
    return true;
  });

  const sentimentCounts = {
    positive: filteredNews.filter(item => item.sentiment === 'positive').length,
    negative: filteredNews.filter(item => item.sentiment === 'negative').length,
    neutral: filteredNews.filter(item => item.sentiment === 'neutral').length
  };

  return (
    <div className="space-y-6">
      {/* News Sentiment Overview */}
      <Card>
        <CardHeader>
          <CardTitle>News Sentiment Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="text-2xl font-medium text-green-600">{sentimentCounts.positive}</div>
              <p className="text-sm text-muted-foreground">Positive</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <div className="text-2xl font-medium text-yellow-600">{sentimentCounts.neutral}</div>
              <p className="text-sm text-muted-foreground">Neutral</p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
              <div className="text-2xl font-medium text-red-600">{sentimentCounts.negative}</div>
              <p className="text-sm text-muted-foreground">Negative</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Filter Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Latest News</CardTitle>
            <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="1d">24H</TabsTrigger>
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNews.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between space-x-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon(item.sentiment)}
                      <Badge variant="secondary" className={getSentimentColor(item.sentiment)}>
                        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                      </Badge>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    
                    <h3 className="font-medium leading-tight">{item.headline}</h3>
                    
                    <p className="text-sm text-muted-foreground">{item.summary}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{item.publishedAt}</span>
                        <span>•</span>
                        <span>{item.source}</span>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="h-auto p-1">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline">Load More News</Button>
          </div>
        </CardContent>
      </Card>

      {/* AI News Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI News Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg space-y-3">
            <h4 className="font-medium">Key Themes This Week</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Strong earnings performance driving positive sentiment</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Strategic partnerships expanding market reach</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Regulatory environment creating sector-wide concerns</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>ESG initiatives gaining investor attention</span>
              </li>
            </ul>
            
            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground">
                Overall news sentiment remains positive with 60% of coverage highlighting 
                company strengths and growth opportunities. Monitor regulatory developments 
                for potential sector impact.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

NewsTab.propTypes = {
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