import { TrendingUp, TrendingDown, Users, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

export function StockOverview({ stock }) {
  const isPositive = stock.dailyChange >= 0;

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={stock.logo} alt={stock.companyName} />
              <AvatarFallback>
                <Building2 className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="flex items-center space-x-2">
                <span>{stock.companyName}</span>
                <Badge variant="secondary">{stock.symbol}</Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{stock.sector}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-medium">PKR {stock.currentPrice.toFixed(2)}</div>
              <div className={`flex items-center space-x-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{isPositive ? '+' : ''}{stock.dailyChange.toFixed(2)}</span>
                <span>({isPositive ? '+' : ''}{stock.dailyChangePercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Volume</p>
              <p className="font-medium">{stock.volume}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Market Cap</p>
              <p className="font-medium">{stock.marketCap}</p>
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
          <p className="text-sm leading-relaxed">{stock.description}</p>
          
          <div>
            <p className="text-sm font-medium mb-2">Key Competitors</p>
            <div className="flex flex-wrap gap-2">
              {stock.competitors?.map((competitor, index) => (
                <Badge key={index} variant="outline">
                  {competitor}
                </Badge>
              ))}
            </div>
          </div>
          
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
                  <p className="text-sm font-medium">{stock.ceo}</p>
                  <p className="text-xs text-muted-foreground">Chief Executive Officer</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{stock.ceoReputation}/10</p>
                <p className="text-xs text-muted-foreground">Reputation Score</p>
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
                  <span className="font-medium">{stock.pe}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(stock.pe / stock.industryAvgPE) * 100} className="flex-1 h-1" />
                  <span className="text-xs text-muted-foreground">Avg: {stock.industryAvgPE}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">EPS</span>
                  <span className="font-medium">{stock.eps}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ROE</span>
                  <span className="font-medium">{stock.roe}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(stock.roe / stock.industryAvgROE) * 100} className="flex-1 h-1" />
                  <span className="text-xs text-muted-foreground">Avg: {stock.industryAvgROE}%</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Debt/Equity</span>
                  <span className="font-medium">{stock.debtEquity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={(stock.debtEquity / stock.industryAvgDebtEquity) * 100} className="flex-1 h-1" />
                  <span className="text-xs text-muted-foreground">Avg: {stock.industryAvgDebtEquity}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Dividend Yield</span>
                  <span className="font-medium">{stock.dividendYield}%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}