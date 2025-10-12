import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
    Target,
    DollarSign,
    TrendingUp,
    Calendar,
    CheckCircle,
    AlertCircle,
    Plus,
    ArrowRight,
    PieChart,
    Bell
} from 'lucide-react';

// Dashboard data
const dashboardStats = {
    totalGoals: 4,
    activeGoals: 3,
    completedGoals: 1,
    totalSaved: 65500,
    monthlyTarget: 2400,
    currentMonthSaved: 1850,
    savingsRate: 35
};

const activeGoals = [
    {
        id: 1,
        name: 'Emergency Fund',
        currentAmount: 25000,
        targetAmount: 31200,
        progress: 80,
        deadline: '2024-12-31',
        monthlyContribution: 500,
        status: 'on-track',
        daysLeft: 168
    },
    {
        id: 2,
        name: 'House Down Payment',
        currentAmount: 48000,
        targetAmount: 120000,
        progress: 40,
        deadline: '2026-06-30',
        monthlyContribution: 1200,
        status: 'behind',
        daysLeft: 700
    },
    {
        id: 3,
        name: 'New Laptop',
        currentAmount: 1200,
        targetAmount: 2000,
        progress: 60,
        deadline: '2024-10-15',
        monthlyContribution: 300,
        status: 'ahead',
        daysLeft: 88
    }
];

const recentActivity = [
    {
        type: 'contribution',
        message: 'Added $500 to Emergency Fund',
        date: '2 days ago',
        amount: 500
    },
    {
        type: 'milestone',
        message: 'Reached 80% of Emergency Fund goal',
        date: '3 days ago',
        amount: null
    },
    {
        type: 'achievement',
        message: 'Completed &quot;Vacation Fund&quot; goal',
        date: '1 week ago',
        amount: 3000
    },
    {
        type: 'reminder',
        message: 'Monthly contribution due for House Down Payment',
        date: '2 weeks ago',
        amount: 1200
    }
];

export default function Dashboard({ onCreateNewGoal }) {
    const getStatusColor = (status) => {
        switch (status) {
            case 'ahead':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'on-track':
                return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'behind':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'contribution':
                return <DollarSign className="w-4 h-4 text-green-600" />;
            case 'milestone':
                return <Target className="w-4 h-4 text-blue-600" />;
            case 'achievement':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'reminder':
                return <Bell className="w-4 h-4 text-yellow-600" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Welcome back! Here&apos;s an overview of your financial goals.
                    </p>
                </div>
                <Button
                    onClick={onCreateNewGoal}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Goal
                </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Goals</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {dashboardStats.totalGoals}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {dashboardStats.activeGoals} active
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Saved</p>
                                <p className="text-2xl font-semibold text-green-600">
                                    ${dashboardStats.totalSaved.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Across all goals</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="text-2xl font-semibold text-blue-600">
                                    ${dashboardStats.currentMonthSaved.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    of ${dashboardStats.monthlyTarget.toLocaleString()} target
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Savings Rate</p>
                                <p className="text-2xl font-semibold text-blue-600">
                                    {dashboardStats.savingsRate}%
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <p className="text-xs text-green-600">Above target</p>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                                <PieChart className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Monthly Progress */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900">
                            Monthly Savings Progress
                        </CardTitle>
                        <Badge className="bg-blue-100 text-blue-800">
                            {Math.round(
                                (dashboardStats.currentMonthSaved / dashboardStats.monthlyTarget) *
                                100
                            )}
                            % Complete
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span>
                                Current: ${dashboardStats.currentMonthSaved.toLocaleString()}
                            </span>
                            <span>Target: ${dashboardStats.monthlyTarget.toLocaleString()}</span>
                        </div>
                        <Progress
                            value={
                                (dashboardStats.currentMonthSaved / dashboardStats.monthlyTarget) *
                                100
                            }
                            className="h-3"
                        />
                        <p className="text-sm text-gray-600">
                            $
                            {(
                                dashboardStats.monthlyTarget - dashboardStats.currentMonthSaved
                            ).toLocaleString()}{' '}
                            remaining to reach monthly target
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Goals */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg text-gray-900">Active Goals</CardTitle>
                            <Button variant="outline" size="sm">
                                <ArrowRight className="w-4 h-4 mr-2" />
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeGoals.map((goal) => (
                                <div
                                    key={goal.id}
                                    className="p-4 border border-gray-200 rounded-lg"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-900">{goal.name}</h4>
                                        <Badge className={`text-xs ${getStatusColor(goal.status)}`}>
                                            {goal.status.replace('-', ' ')}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>
                                            ${goal.currentAmount.toLocaleString()} / $
                                            {goal.targetAmount.toLocaleString()}
                                        </span>
                                        <span>{goal.progress}%</span>
                                    </div>
                                    <Progress value={goal.progress} className="h-2 mb-2" />
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Monthly: ${goal.monthlyContribution}</span>
                                        <span>{goal.daysLeft} days left</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">{activity.message}</p>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-xs text-gray-500">{activity.date}</p>
                                            {activity.amount && (
                                                <span className="text-xs font-medium text-green-600">
                                                    +${activity.amount.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <Plus className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-medium">Add Contribution</span>
                        </Button>

                        <Button
                            onClick={onCreateNewGoal}
                            variant="outline"
                            className="h-auto p-4 flex flex-col items-center gap-2"
                        >
                            <Target className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-medium">Create New Goal</span>
                        </Button>

                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium">View Recommendations</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

