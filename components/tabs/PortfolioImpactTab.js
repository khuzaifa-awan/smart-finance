import { PieChart, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";

export function PortfolioImpactTab({ stock }) {
  const [positionSize, setPositionSize] = useState(1000000); // PKR 1M
  const [allocationPercentage, setAllocationPercentage] = useState(15); // 15%

  // Mock current portfolio data
  const currentPortfolio = {
    totalValue: 10000000, // PKR 10M
    positions: [
      {
        symbol: "HBL",
        name: "Habib Bank Limited",
        allocation: 25,
        value: 2500000,
        sector: "Banking",
      },
      {
        symbol: "OGDC",
        name: "Oil & Gas Development",
        allocation: 20,
        value: 2000000,
        sector: "Energy",
      },
      {
        symbol: "LUCK",
        name: "Lucky Cement",
        allocation: 18,
        value: 1800000,
        sector: "Cement",
      },
      {
        symbol: "PSO",
        name: "Pakistan State Oil",
        allocation: 15,
        value: 1500000,
        sector: "Energy",
      },
      {
        symbol: "CASH",
        name: "Cash & Equivalents",
        allocation: 22,
        value: 2200000,
        sector: "Cash",
      },
    ],
  };

  const shares = Math.floor(positionSize / stock.currentPrice);
  const newAllocation =
    (positionSize / (currentPortfolio.totalValue + positionSize)) * 100;

  // Calculate impact metrics
  const portfolioImpact = {
    diversificationScore: 85 - (newAllocation > 20 ? 10 : 0), // Reduce score if concentration too high
    expectedReturn: 12.5 + newAllocation * 0.1, // Simplified calculation
    riskScore: 65 + (newAllocation > 15 ? 5 : 0), // Risk increases with concentration
    sharpeRatio: 1.35,
  };

  const sectorAllocation = () => {
    const sectors = currentPortfolio.positions.reduce((acc, pos) => {
      acc[pos.sector] = (acc[pos.sector] || 0) + pos.allocation;
      return acc;
    }, {});

    // Add new stock sector
    sectors[stock.sector] = (sectors[stock.sector] || 0) + newAllocation;

    return Object.entries(sectors).map(([sector, allocation]) => ({
      sector,
      allocation: allocation.toFixed(1),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Position Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Position Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position-size">Investment Amount (PKR)</Label>
              <Input
                id="position-size"
                type="number"
                value={positionSize}
                onChange={(e) => setPositionSize(parseInt(e.target.value) || 0)}
                placeholder="1,000,000"
              />
              <p className="text-sm text-muted-foreground">
                = {shares.toLocaleString()} shares
              </p>
            </div>

            <div className="space-y-2">
              <Label>Portfolio Allocation (%)</Label>
              <div className="space-y-2">
                <Slider
                  value={[allocationPercentage]}
                  onValueChange={(value) => {
                    setAllocationPercentage(value[0]);
                    setPositionSize(
                      Math.round((currentPortfolio.totalValue * value[0]) / 100)
                    );
                  }}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1%</span>
                  <span className="font-medium">
                    {newAllocation.toFixed(1)}%
                  </span>
                  <span>30%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-medium">
                PKR {positionSize.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Investment Amount</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">
                {shares.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground">Shares</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">
                {newAllocation.toFixed(1)}%
              </div>
              <p className="text-sm text-muted-foreground">Portfolio Weight</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Impact Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Portfolio Impact Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Diversification Score
                  </span>
                  <span className="font-medium">
                    {portfolioImpact.diversificationScore}/100
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${portfolioImpact.diversificationScore}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Expected Return
                  </span>
                  <span className="font-medium">
                    {portfolioImpact.expectedReturn.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${(portfolioImpact.expectedReturn / 20) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Risk Score
                  </span>
                  <span className="font-medium">
                    {portfolioImpact.riskScore}/100
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-yellow-600 h-2 rounded-full"
                    style={{ width: `${portfolioImpact.riskScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Sharpe Ratio
                  </span>
                  <span className="font-medium">
                    {portfolioImpact.sharpeRatio}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${(portfolioImpact.sharpeRatio / 2) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sector Allocation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5" />
            <span>Updated Sector Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sectorAllocation().map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.sector}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.sector === stock.sector
                          ? "bg-blue-600"
                          : "bg-muted-foreground"
                      }`}
                      style={{
                        width: `${Math.min(
                          parseFloat(item.allocation) * 3,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.allocation}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Risk Assessment</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg space-y-3">
            <h4 className="font-medium">Portfolio Impact Summary</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    newAllocation <= 20 ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></div>
                <span>
                  Position size of {newAllocation.toFixed(1)}% is{" "}
                  {newAllocation <= 20 ? "appropriate" : "moderately high"} for
                  diversification
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>
                  Adding {stock.sector} exposure enhances sector diversification
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>
                  Expected to improve risk-adjusted returns based on
                  fundamentals
                </span>
              </li>
            </ul>

            <div className="pt-3 border-t">
              <p className="text-sm text-muted-foreground">
                <strong>Recommendation:</strong> This position aligns well with
                your portfolio objectives. Consider dollar-cost averaging to
                reduce timing risk.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

PortfolioImpactTab.propTypes = {
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
