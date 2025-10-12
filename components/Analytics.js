import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
    TrendingUp,
    DollarSign,
    Target,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Download
} from 'lucide-react';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from 'recharts';

const monthlyData = [
    { month: 'Jan', savings: 4500, expenses: 2800, goals: 3200 },
    { month: 'Feb', savings: 5200, expenses: 3100, goals: 3800 },
    { month: 'Mar', savings: 4800, expenses: 2900, goals: 3500 },
    { month: 'Apr', savings: 6100, expenses: 3400, goals: 4200 },
    { month: 'May', savings: 5800, expenses: 3200, goals: 4000 },
    { month: 'Jun', savings: 6500, expenses: 3600, goals: 4500 },
    { month: 'Jul', savings: 7200, expenses: 3800, goals: 4800 }
];

const goalPerformanceData = [
    { goal: 'Emergency Fund', target: 25000, achieved: 18500, progress: 74 },
    { goal: 'House Payment', target: 80000, achieved: 32000, progress: 40 },
    { goal: 'New Car', target: 35000, achieved: 15000, progress: 43 },
    { goal: 'Vacation', target: 8000, achieved: 2800, progress: 35 },
    { goal: 'Education', target: 50000, achieved: 50000, progress: 100 }
];

const categoryDistribution = [
    { name: 'Emergency Fund', value: 35, color: '#10B981' },
    { name: 'Housing', value: 25, color: '#3B82F6' },
    { name: 'Transportation', value: 20, color: '#8B5CF6' },
    { name: 'Travel', value: 10, color: '#F59E0B' },
    { name: 'Education', value: 10, color: '#EF4444' }
];

const savingsRateData = [
    { month: 'Jan', rate: 22 },
    { month: 'Feb', rate: 28 },
    { month: 'Mar', rate: 25 },
    { month: 'Apr', rate: 32 },
    { month: 'May', rate: 30 },
    { month: 'Jun', rate: 35 },
    { month: 'Jul', rate: 38 }
];

const insights = [
    {
        title: 'Savings Trend',
        value: '+18%',
        description: 'Your savings increased by 18% this month',
        trend: 'up',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        icon: TrendingUp
    },
    {
        title: 'Goal Completion',
        value: '1 of 5',
        description: 'You completed 1 goal this quarter',
        trend: 'neutral',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        icon: Target
    },
    {
        title: 'Average Monthly',
        value: '$2,600',
        description: 'Average monthly contribution to goals',
        trend: 'up',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        icon: DollarSign
    },
    {
        title: 'Savings Rate',
        value: '38%',
        description: 'Current savings rate of income',
        trend: 'up',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        icon: Activity
    }
];

export default function Analytics() {
    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
                    <p className="text-gray-600 mt-1">
                        Detailed insights into your financial goals and progress
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {insights.map((insight, index) => {
                    const Icon = insight.icon;
                    return (
                        <Card key={index} className="border border-gray-200">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">{insight.title}</p>
                                        <p className="text-2xl font-semibold text-gray-900 mt-1">
                                            {insight.value}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2">
                                            {insight.trend === 'up' && (
                                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                                            )}
                                            {insight.trend === 'down' && (
                                                <ArrowDownRight className="w-4 h-4 text-red-500" />
                                            )}
                                            <p className="text-xs text-gray-600">{insight.description}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={`w-12 h-12 ${insight.bgColor} rounded-lg flex items-center justify-center`}
                                    >
                                        <Icon className={`w-6 h-6 ${insight.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Monthly Financial Overview */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">
                            Monthly Financial Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
                                        labelStyle={{ color: '#374151' }}
                                    />
                                    <Bar dataKey="savings" fill="#10B981" name="Savings" />
                                    <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                                    <Bar dataKey="goals" fill="#3B82F6" name="Goal Contributions" />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Goal Category Distribution */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">
                            Goal Category Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <RechartsPieChart>
                                    <Pie
                                        data={categoryDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-1 gap-2 mt-4">
                            {categoryDistribution.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: item.color }}
                                        />
                                        <span className="text-sm text-gray-600">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                        {item.value}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Savings Rate Trend */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Savings Rate Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={savingsRateData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        formatter={(value) => [`${value}%`, 'Savings Rate']}
                                        labelStyle={{ color: '#374151' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="rate"
                                        stroke="#8B5CF6"
                                        fill="#8B5CF6"
                                        fillOpacity={0.1}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Goal Performance Table */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Goal Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {goalPerformanceData.map((goal, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-gray-900">{goal.goal}</span>
                                            <Badge
                                                variant={goal.progress === 100 ? 'default' : 'outline'}
                                                className={goal.progress === 100 ? 'bg-green-100 text-green-800' : ''}
                                            >
                                                {goal.progress}%
                                            </Badge>
                                        </div>
                                        <div className="text-sm text-gray-600 mb-2">
                                            ${goal.achieved.toLocaleString()} / ${goal.target.toLocaleString()}
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${goal.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Financial Health Score */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Financial Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">85</div>
                            <div className="text-sm text-gray-600 mb-1">Overall Score</div>
                            <div className="text-xs text-green-600">Excellent</div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Emergency Fund</span>
                                    <span>92/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Savings Rate</span>
                                    <span>88/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }} />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Goal Progress</span>
                                    <span>75/100</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-blue-600" />
                                    <span className="text-sm font-medium text-blue-900">Improvement</span>
                                </div>
                                <p className="text-xs text-blue-700">
                                    Increase emergency fund to reach 100% financial security
                                </p>
                            </div>

                            <div className="p-3 bg-purple-50 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <Target className="w-4 h-4 text-purple-600" />
                                    <span className="text-sm font-medium text-purple-900">Next Goal</span>
                                </div>
                                <p className="text-xs text-purple-700">Focus on house down payment completion</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


