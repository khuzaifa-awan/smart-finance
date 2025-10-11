import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    PlusCircle,
    Eye,
    BarChart3,
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

// ✅ Portfolio Data
const portfolioData = [
    { date: 'Jan', value: 45000 },
    { date: 'Feb', value: 47200 },
    { date: 'Mar', value: 46800 },
    { date: 'Apr', value: 49500 },
    { date: 'May', value: 51200 },
    { date: 'Jun', value: 52800 },
];

// ✅ Holdings
const holdings = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        shares: 25,
        avgPrice: 180.5,
        currentPrice: 192.3,
        value: 4807.5,
        change: 656.25,
        changePercent: 6.54,
        allocation: 9.1,
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        shares: 15,
        avgPrice: 310.2,
        currentPrice: 338.5,
        value: 5077.5,
        change: 424.5,
        changePercent: 9.13,
        allocation: 9.6,
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        shares: 8,
        avgPrice: 2650.0,
        currentPrice: 2780.4,
        value: 22243.2,
        change: 1043.2,
        changePercent: 4.94,
        allocation: 42.1,
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        shares: 12,
        avgPrice: 890.75,
        currentPrice: 825.2,
        value: 9902.4,
        change: -786.6,
        changePercent: -7.36,
        allocation: 18.7,
    },
    {
        symbol: 'SPY',
        name: 'SPDR S&P 500 ETF',
        shares: 25,
        avgPrice: 420.3,
        currentPrice: 435.8,
        value: 10895.0,
        change: 387.5,
        changePercent: 3.69,
        allocation: 20.6,
    },
];

// ✅ Asset Allocation
const assetAllocation = [
    { name: 'Stocks', value: 75, color: '#8884d8' },
    { name: 'ETFs', value: 20, color: '#82ca9d' },
    { name: 'Bonds', value: 3, color: '#ffc658' },
    { name: 'Cash', value: 2, color: '#ff7c7c' },
];

export default function InvestmentPortfolio() {
    const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0);
    const totalChange = holdings.reduce((sum, holding) => sum + holding.change, 0);
    const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold">Investment Portfolio</h1>
                    <p className="text-muted-foreground">
                        Track your investments and performance
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Watchlist
                    </Button>
                    <Button className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Add Investment
                    </Button>
                </div>
            </div>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Portfolio Value
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalValue.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            {totalChange >= 0 ? (
                                <TrendingUp className="w-3 h-3 text-green-500" />
                            ) : (
                                <TrendingDown className="w-3 h-3 text-red-500" />
                            )}
                            <span
                                className={
                                    totalChange >= 0 ? 'text-green-500' : 'text-red-500'
                                }
                            >
                                ${Math.abs(totalChange).toLocaleString()} (
                                {totalChangePercent.toFixed(2)}%)
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Day&apos;s Change</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">+$1,245</div>
                        <div className="flex items-center gap-1 text-sm">
                            <TrendingUp className="w-3 h-3 text-green-500" />
                            <span className="text-green-500">+2.41%</span>
                            <span className="text-muted-foreground">today</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Cash Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$2,850</div>
                        <p className="text-xs text-muted-foreground">Ready to invest</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Portfolio Performance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Portfolio Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={portfolioData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip
                                    formatter={(value) => [
                                        `$${value.toLocaleString()}`,
                                        'Portfolio Value',
                                    ]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Asset Allocation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={assetAllocation}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {assetAllocation.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-4 space-y-2">
                            {assetAllocation.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Holdings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Current Holdings
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-2">Symbol</th>
                                    <th className="text-left py-2">Shares</th>
                                    <th className="text-right py-2">Avg Price</th>
                                    <th className="text-right py-2">Current Price</th>
                                    <th className="text-right py-2">Market Value</th>
                                    <th className="text-right py-2">Gain/Loss</th>
                                    <th className="text-right py-2">%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holdings.map((holding, index) => (
                                    <tr key={index} className="border-b hover:bg-muted/50">
                                        <td className="py-3">
                                            <div>
                                                <div className="font-medium">{holding.symbol}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {holding.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3">{holding.shares}</td>
                                        <td className="py-3 text-right">
                                            ${holding.avgPrice.toFixed(2)}
                                        </td>
                                        <td className="py-3 text-right">
                                            ${holding.currentPrice.toFixed(2)}
                                        </td>
                                        <td className="py-3 text-right font-medium">
                                            ${holding.value.toLocaleString()}
                                        </td>
                                        <td
                                            className={`py-3 text-right ${holding.change >= 0 ? 'text-green-500' : 'text-red-500'
                                                }`}
                                        >
                                            {holding.change >= 0 ? '+' : ''}$
                                            {holding.change.toFixed(2)}
                                        </td>
                                        <td className="py-3 text-right">
                                            <Badge
                                                variant={
                                                    holding.changePercent >= 0
                                                        ? 'default'
                                                        : 'destructive'
                                                }
                                                className="text-xs"
                                            >
                                                {holding.changePercent >= 0 ? '+' : ''}
                                                {holding.changePercent.toFixed(2)}%
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Investment Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-green-800">Strong Performance</p>
                                <p className="text-sm text-green-700">
                                    Your technology stocks (AAPL, MSFT, GOOGL) are outperforming
                                    the market by 3.2%.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <DollarSign className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-yellow-800">
                                    Diversification Opportunity
                                </p>
                                <p className="text-sm text-yellow-700">
                                    Consider adding international exposure or bonds to reduce
                                    portfolio volatility.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
