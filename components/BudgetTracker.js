import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
    PlusCircle,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const budgetCategories = [
    { category: 'Housing', budgeted: 2000, spent: 1800, remaining: 200, status: 'good' },
    { category: 'Food & Dining', budgeted: 800, spent: 920, remaining: -120, status: 'over' },
    { category: 'Transportation', budgeted: 600, spent: 450, remaining: 150, status: 'good' },
    { category: 'Entertainment', budgeted: 400, spent: 380, remaining: 20, status: 'warning' },
    { category: 'Utilities', budgeted: 300, spent: 285, remaining: 15, status: 'good' },
    { category: 'Healthcare', budgeted: 200, spent: 150, remaining: 50, status: 'good' }
];

const monthlyBudgetData = [
    { month: 'Jan', budgeted: 4000, spent: 3800 },
    { month: 'Feb', budgeted: 4000, spent: 4200 },
    { month: 'Mar', budgeted: 4000, spent: 3600 },
    { month: 'Apr', budgeted: 4200, spent: 4100 },
    { month: 'May', budgeted: 4200, spent: 3900 },
    { month: 'Jun', budgeted: 4300, spent: 4185 }
];

export default function BudgetTracker() {
    const totalBudgeted = budgetCategories.reduce((sum, cat) => sum + cat.budgeted, 0);
    const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
    const totalRemaining = totalBudgeted - totalSpent;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1>Budget Tracker</h1>
                    <p className="text-muted-foreground">
                        Monitor your spending across categories
                    </p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add Category
                </Button>
            </div>

            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalBudgeted.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm">
                            {totalSpent > totalBudgeted ? (
                                <TrendingUp className="w-3 h-3 text-red-500" />
                            ) : (
                                <TrendingDown className="w-3 h-3 text-green-500" />
                            )}
                            <span
                                className={
                                    totalSpent > totalBudgeted ? 'text-red-500' : 'text-green-500'
                                }
                            >
                                {((totalSpent / totalBudgeted) * 100).toFixed(1)}%
                            </span>
                            <span className="text-muted-foreground">of budget</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div
                            className={`text-2xl font-bold ${totalRemaining < 0 ? 'text-red-500' : 'text-green-500'
                                }`}
                        >
                            ${Math.abs(totalRemaining).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {totalRemaining < 0 ? 'Over budget' : 'Left to spend'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Budget Categories */}
            <Card>
                <CardHeader>
                    <CardTitle>Budget Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {budgetCategories.map((category, index) => {
                            const percentage = (category.spent / category.budgeted) * 100;
                            return (
                                <div key={index} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium">{category.category}</span>

                                            {category.status === 'over' && (
                                                <Badge variant="destructive" className="text-xs">
                                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                                    Over Budget
                                                </Badge>
                                            )}

                                            {category.status === 'warning' && (
                                                <Badge variant="secondary" className="text-xs">
                                                    <AlertTriangle className="w-3 h-3 mr-1" />
                                                    Close to Limit
                                                </Badge>
                                            )}

                                            {category.status === 'good' &&
                                                category.remaining > category.budgeted * 0.2 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        <CheckCircle className="w-3 h-3 mr-1" />
                                                        On Track
                                                    </Badge>
                                                )}
                                        </div>

                                        <div className="text-sm text-muted-foreground">
                                            ${category.spent} / ${category.budgeted}
                                        </div>
                                    </div>

                                    <Progress
                                        value={Math.min(percentage, 100)}
                                        className={`h-2 ${category.status === 'over' ? 'bg-red-100' : ''}`}
                                    />

                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>{percentage.toFixed(1)}% used</span>
                                        <span
                                            className={
                                                category.remaining < 0 ? 'text-red-500' : 'text-green-500'
                                            }
                                        >
                                            ${Math.abs(category.remaining)}{' '}
                                            {category.remaining < 0 ? 'over' : 'remaining'}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Monthly Budget Trend */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Budget vs Spending</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyBudgetData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="budgeted" fill="#8884d8" name="Budgeted" />
                            <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Budget Tips */}
            <Card>
                <CardHeader>
                    <CardTitle>Budget Optimization Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-yellow-800">
                                    Food & Dining Over Budget
                                </p>
                                <p className="text-sm text-yellow-700">
                                    You have exceeded your dining budget by $120. Consider meal
                                    planning or cooking at home more often.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-blue-800">Transportation Savings</p>
                                <p className="text-sm text-blue-700">
                                    Great job! You saved $150 on transportation this month. Consider
                                    redirecting this to your emergency fund.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}