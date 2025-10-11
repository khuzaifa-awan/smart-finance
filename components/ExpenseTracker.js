import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
    PlusCircle,
    Search,
    Filter,
    Download,
    CreditCard,
    ShoppingCart,
    Coffee,
    Car,
    Home,
    Gamepad2,
    MoreHorizontal
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line
} from 'recharts';

// Recent transactions
const recentTransactions = [
    { id: 1, date: '2024-01-15', description: 'Grocery Store', category: 'Food & Dining', amount: -85.42, type: 'debit', icon: ShoppingCart, color: 'bg-green-500' },
    { id: 2, date: '2024-01-15', description: 'Coffee Shop', category: 'Food & Dining', amount: -4.95, type: 'debit', icon: Coffee, color: 'bg-amber-500' },
    { id: 3, date: '2024-01-14', description: 'Gas Station', category: 'Transportation', amount: -68.2, type: 'debit', icon: Car, color: 'bg-blue-500' },
    { id: 4, date: '2024-01-14', description: 'Salary Deposit', category: 'Income', amount: 3500.0, type: 'credit', icon: CreditCard, color: 'bg-green-500' },
    { id: 5, date: '2024-01-13', description: 'Electric Bill', category: 'Utilities', amount: -120.5, type: 'debit', icon: Home, color: 'bg-yellow-500' },
    { id: 6, date: '2024-01-13', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, type: 'debit', icon: Gamepad2, color: 'bg-purple-500' },
    { id: 7, date: '2024-01-12', description: 'Restaurant', category: 'Food & Dining', amount: -45.8, type: 'debit', icon: Coffee, color: 'bg-amber-500' },
    { id: 8, date: '2024-01-12', description: 'Online Shopping', category: 'Shopping', amount: -129.99, type: 'debit', icon: ShoppingCart, color: 'bg-indigo-500' }
];

const weeklySpending = [
    { week: 'Week 1', amount: 680 },
    { week: 'Week 2', amount: 520 },
    { week: 'Week 3', amount: 720 },
    { week: 'Week 4', amount: 450 }
];

const categorySpending = [
    { category: 'Food & Dining', amount: 580, budget: 800 },
    { category: 'Transportation', amount: 420, budget: 600 },
    { category: 'Shopping', amount: 380, budget: 400 },
    { category: 'Entertainment', amount: 280, budget: 350 },
    { category: 'Utilities', amount: 350, budget: 400 },
    { category: 'Healthcare', amount: 150, budget: 200 }
];

export default function ExpenseTracker() {
    const totalSpent = Math.abs(
        recentTransactions
            .filter((t) => t.type === 'debit')
            .reduce((sum, t) => sum + t.amount, 0)
    );

    const totalIncome = recentTransactions
        .filter((t) => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1>Expense Tracker</h1>
                    <p className="text-muted-foreground">
                        Monitor and categorize your spending
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                    <Button className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        Add Expense
                    </Button>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            This Month&apos;s Spending
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalSpent.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Across all categories
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">
                            ${totalIncome.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Total received</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Net Cash Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">
                            ${(totalIncome - totalSpent).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Income minus expenses
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Spending Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={weeklySpending}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="week" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`$${value}`, 'Spending']} />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#8884d8"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Spending by Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={categorySpending}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="category"
                                    angle={-45}
                                    textAnchor="end"
                                    height={80}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="budget" fill="#e5e7eb" name="Budget" />
                                <Bar dataKey="amount" fill="#8884d8" name="Spent" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Recent Transactions</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input placeholder="Search transactions..." className="pl-9 w-64" />
                            </div>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentTransactions.map((transaction) => {
                            const Icon = transaction.icon;
                            return (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${transaction.color} text-white`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{transaction.description}</p>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm text-muted-foreground">{transaction.date}</p>
                                                <Badge variant="outline" className="text-xs">
                                                    {transaction.category}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <p
                                                className={`font-medium ${transaction.type === 'credit'
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                    }`}
                                            >
                                                {transaction.type === 'credit' ? '+' : ''}
                                                ${Math.abs(transaction.amount).toFixed(2)}
                                            </p>
                                            <p className="text-xs text-muted-foreground capitalize">
                                                {transaction.type}
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Spending Insights */}
            <Card>
                <CardHeader>
                    <CardTitle>Spending Insights</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <ShoppingCart className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-yellow-800">High Spending Alert</p>
                                <p className="text-sm text-yellow-700">
                                    Your food &amp; dining expenses are 72% of budget with 2 weeks
                                    remaining in the month.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <Car className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-green-800">Under Budget</p>
                                <p className="text-sm text-green-700">
                                    You&apos;re saving $180 on transportation this month. Consider
                                    allocating this to your emergency fund.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <CreditCard className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-blue-800">Recurring Expenses</p>
                                <p className="text-sm text-blue-700">
                                    You have $156 in subscription services. Review and cancel
                                    unused subscriptions to save money.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

