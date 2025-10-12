import { Calculator, Target, TrendingUp } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

export function ValuationTab({ stock }) {
  const [dcfInputs, setDcfInputs] = useState({
    growthRate: 8.5,
    discountRate: 12.0,
    terminalGrowthRate: 3.0,
    yearsToProject: 5
  });

  const calculateDCF = () => {
    // Simplified DCF calculation for demonstration
    const currentFCF = 18.9; // Billion PKR
    const { growthRate, discountRate, terminalGrowthRate, yearsToProject } = dcfInputs;
    
    let projectedFCF = currentFCF;
    let presentValue = 0;
    
    // Calculate present value of projected cash flows
    for (let year = 1; year <= yearsToProject; year++) {
      projectedFCF *= (1 + growthRate / 100);
      presentValue += projectedFCF / Math.pow(1 + discountRate / 100, year);
    }
    
    // Terminal value
    const terminalValue = (projectedFCF * (1 + terminalGrowthRate / 100)) / 
                         ((discountRate / 100) - (terminalGrowthRate / 100));
    const presentTerminalValue = terminalValue / Math.pow(1 + discountRate / 100, yearsToProject);
    
    const totalValue = presentValue + presentTerminalValue;
    const sharesOutstanding = 1.09; // Billion shares
    const fairValuePerShare = totalValue / sharesOutstanding;
    
    return fairValuePerShare;
  };

  const fairValue = calculateDCF();
  const upside = ((fairValue - stock.currentPrice) / stock.currentPrice) * 100;

  return (
    <div className="space-y-6">
      {/* DCF Valuation Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Discounted Cash Flow (DCF) Model</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="growth-rate">Revenue Growth Rate (%)</Label>
                <div className="space-y-2">
                  <Slider
                    value={[dcfInputs.growthRate]}
                    onValueChange={(value) => setDcfInputs(prev => ({ ...prev, growthRate: value[0] }))}
                    max={20}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0%</span>
                    <span className="font-medium">{dcfInputs.growthRate}%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="discount-rate">Discount Rate (WACC) (%)</Label>
                <div className="space-y-2">
                  <Slider
                    value={[dcfInputs.discountRate]}
                    onValueChange={(value) => setDcfInputs(prev => ({ ...prev, discountRate: value[0] }))}
                    max={20}
                    min={5}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>5%</span>
                    <span className="font-medium">{dcfInputs.discountRate}%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terminal-growth">Terminal Growth Rate (%)</Label>
                <div className="space-y-2">
                  <Slider
                    value={[dcfInputs.terminalGrowthRate]}
                    onValueChange={(value) => setDcfInputs(prev => ({ ...prev, terminalGrowthRate: value[0] }))}
                    max={5}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>1%</span>
                    <span className="font-medium">{dcfInputs.terminalGrowthRate}%</span>
                    <span>5%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="projection-years">Projection Years</Label>
                <Input
                  id="projection-years"
                  type="number"
                  value={dcfInputs.yearsToProject}
                  onChange={(e) => setDcfInputs(prev => ({ ...prev, yearsToProject: parseInt(e.target.value) || 5 }))}
                  min={3}
                  max={10}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-medium">PKR {fairValue.toFixed(0)}</div>
                <p className="text-sm text-muted-foreground">Fair Value</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-medium">PKR {stock.currentPrice.toFixed(0)}</div>
                <p className="text-sm text-muted-foreground">Current Price</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className={`text-2xl font-medium ${upside >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {upside >= 0 ? '+' : ''}{upside.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">Upside/Downside</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Relative Valuation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Relative Valuation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-muted-foreground">Metric</th>
                  <th className="text-right py-3 text-muted-foreground">{stock.symbol}</th>
                  <th className="text-right py-3 text-muted-foreground">Industry Avg</th>
                  <th className="text-right py-3 text-muted-foreground">Sector Avg</th>
                  <th className="text-right py-3 text-muted-foreground">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 font-medium">Price-to-Earnings (P/E)</td>
                  <td className="text-right py-3">12.5x</td>
                  <td className="text-right py-3">15.2x</td>
                  <td className="text-right py-3">16.8x</td>
                  <td className="text-right py-3">
                    <span className="text-green-600 font-medium">Attractive</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Price-to-Book (P/B)</td>
                  <td className="text-right py-3">1.8x</td>
                  <td className="text-right py-3">2.1x</td>
                  <td className="text-right py-3">2.4x</td>
                  <td className="text-right py-3">
                    <span className="text-green-600 font-medium">Attractive</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">EV/EBITDA</td>
                  <td className="text-right py-3">8.2x</td>
                  <td className="text-right py-3">9.8x</td>
                  <td className="text-right py-3">10.5x</td>
                  <td className="text-right py-3">
                    <span className="text-green-600 font-medium">Attractive</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 font-medium">Dividend Yield</td>
                  <td className="text-right py-3">4.2%</td>
                  <td className="text-right py-3">3.1%</td>
                  <td className="text-right py-3">2.8%</td>
                  <td className="text-right py-3">
                    <span className="text-green-600 font-medium">Superior</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">PEG Ratio</td>
                  <td className="text-right py-3">1.47</td>
                  <td className="text-right py-3">1.82</td>
                  <td className="text-right py-3">1.95</td>
                  <td className="text-right py-3">
                    <span className="text-green-600 font-medium">Attractive</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Fair Value Estimate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>AI Fair Value Estimate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-medium">PKR 280</div>
                <p className="text-sm text-muted-foreground">AI Consensus Fair Value</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-medium text-green-600">21% Undervalued</div>
                <p className="text-sm text-muted-foreground">vs Current Price (PKR {stock.currentPrice})</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>DCF Model Weight</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Relative Valuation Weight</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Technical Analysis Weight</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Market Sentiment Weight</span>
                <span className="font-medium">10%</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Our AI model combines multiple valuation methodologies to provide a comprehensive fair value estimate. 
                The current market price suggests the stock is trading at a significant discount to its intrinsic value.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

ValuationTab.propTypes = {
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