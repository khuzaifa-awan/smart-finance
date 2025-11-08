import { TrendingUp, TrendingDown, Users, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function StockOverview({ stock, loading, error }) {
  const stockData = stock;
  const isPositive = stockData?.dailyChange >= 0;

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }
  if (!stockData) {
    return <div className="p-4 text-center">No data to display.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={stockData?.logo} alt={stockData?.companyName} />
              <AvatarFallback>
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="flex items-center space-x-2">
                <span>{stockData?.companyName}</span>
                <Badge variant="secondary">{stockData?.symbol}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {stockData?.sector}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-medium">
                ${stockData?.currentPrice?.toFixed(2)}
              </div>
              <div
                className={`flex items-center space-x-1 text-sm ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>
                  {isPositive ? "+" : ""}
                  {stockData?.dailyChange?.toFixed(2)}
                </span>
                <span>
                  ({isPositive ? "+" : ""}
                  {stockData?.dailyChangePercent?.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-medium">{stockData?.volume}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-medium">${stockData?.marketCap}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Company Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm leading-relaxed line-clamp-6">
            {stockData?.description}
          </p>

          <div className="pt-4 border-t">
            <p className="text-sm font-medium mb-2">Management</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Users className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{stockData?.ceo}</p>
                  <p className="text-xs text-muted-foreground">
                    Chief Executive Officer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Key Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">P/E Ratio</span>
                  <span className="font-medium">
                    {stockData?.pe?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">EPS</span>
                  <span className="font-medium">
                    {stockData?.eps?.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">
                    {stockData?.dividendYield?.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
