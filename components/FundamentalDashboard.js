import { Card } from "./ui/card";
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock portfolio data
const portfolioData = {
  totalValue: 125000.00,
  totalGain: 8500.00,
  gainPercent: 7.29,
  totalInvested: 116500.00,
};

// Mock holdings distribution
const holdingsData = [
  { name: "ENGRO", value: 35, color: "#3b82f6" },
  { name: "HBL", value: 25, color: "#8b5cf6" },
  { name: "PSO", value: 20, color: "#06b6d4" },
  { name: "LUCK", value: 15, color: "#10b981" },
  { name: "Cash", value: 5, color: "#f59e0b" },
];

// Mock sector distribution
const sectorData = [
  { name: "Financials", value: 30, color: "#3b82f6" },
  { name: "Energy", value: 25, color: "#ef4444" },
  { name: "Materials", value: 20, color: "#f59e0b" },
  { name: "Chemicals", value: 15, color: "#10b981" },
  { name: "Others", value: 10, color: "#8b5cf6" },
];

// Mock portfolio timeline data
const timelineData = [
  { date: "2025-06", value: 105000 },
  { date: "2025-07", value: 108500 },
  { date: "2025-08", value: 115000 },
  { date: "2025-09", value: 118000 },
  { date: "2025-10", value: 125000 },
];

// Mock top performers
const topPerformers = [
  { symbol: "ENGRO", change: 12.5, value: 43750 },
  { symbol: "LUCK", change: 8.3, value: 18750 },
  { symbol: "HBL", change: 5.2, value: 31250 },
];

// Mock watchlist
const watchlist = [
  { symbol: "OGDC", price: 145.20, change: 2.3 },
  { symbol: "PPL", price: 82.50, change: -1.2 },
  { symbol: "MARI", price: 1580.00, change: 0.8 },
  { symbol: "MCB", price: 205.30, change: 1.5 },
];

export function FundamentalDashboard() {
  return (
    <div className="flex-1 bg-[#f5f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <h1 className="text-2xl mb-6">Dashboard</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <Card className="p-6 border-t-4 border-t-green-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Total Portfolio Value</p>
                <p className="text-3xl text-green-600 mb-1">
                  ${portfolioData.totalValue.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{portfolioData.gainPercent}%</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-t-4 border-t-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Total Gain/Loss</p>
                <p className="text-3xl text-blue-600 mb-1">
                  ${portfolioData.totalGain.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Last 4 months</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-t-4 border-t-purple-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Total Invested</p>
                <p className="text-3xl text-purple-600 mb-1">
                  ${portfolioData.totalInvested.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-purple-600 text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span>Across 5 stocks</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <PieChart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Overview Section */}
        <h2 className="text-xl mb-4">Overview</h2>

        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Holdings Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base">Holdings Distribution</h3>
            </div>
            <div className="h-[280px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={holdingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {holdingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {holdingsData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Sector Distribution */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base">Sector Distribution</h3>
            </div>
            <div className="h-[280px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {sectorData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Portfolio Timeline */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base">Portfolio Timeline</h3>
              <Select defaultValue="6m">
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    stroke="#9ca3af"
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, "Value"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Top Performers */}
          <Card className="p-6">
            <h3 className="text-base mb-4">Top Performers</h3>
            <div className="space-y-3">
              {topPerformers.map((stock, index) => (
                <div key={stock.symbol} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-sm text-muted-foreground">
                        ${stock.value.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span>+{stock.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Watchlist */}
          <Card className="p-6">
            <h3 className="text-base mb-4">Watchlist</h3>
            <div className="space-y-3">
              {watchlist.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{stock.symbol}</p>
                    <p className="text-sm text-muted-foreground">
                      ${stock.price.toLocaleString()}
                    </p>
                  </div>
                  <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{stock.change >= 0 ? '+' : ''}{stock.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}