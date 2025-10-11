import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
    PlusCircle,
    DollarSign,
    Home,
    Car,
    Heart,
    Plane,
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts';

// Quick Stats Data
const quickStats = [
    { title: 'Total Savings', amount: '$65,500', change: '+12%', color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Total Expenses', amount: '$2,250', change: '+8%', color: 'text-red-600', bgColor: 'bg-red-50' },
    { title: 'Remaining Budget', amount: '$3,750', change: '-5%', color: 'text-blue-600', bgColor: 'bg-blue-50' },
];

// Pie Chart (Goal Data)
const goalData = [
    { name: 'Emergency Fund', value: 45, color: '#10B981' },
    { name: 'House Down Payment', value: 30, color: '#3B82F6' },
    { name: 'Vacation', value: 15, color: '#8B5CF6' },
    { name: 'Car', value: 10, color: '#F59E0B' },
];

// Area Chart (Progress Data)
const progressData = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 48500 },
    { month: 'Mar', amount: 52000 },
    { month: 'Apr', amount: 55800 },
    { month: 'May', amount: 59200 },
    { month: 'Jun', amount: 62800 },
    { month: 'Jul', amount: 65500 },
];

// Active Goals List
const activeGoals = [
    { id: 1, title: 'Emergency Fund', target: 25000, current: 18500, icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50', progress: 74 },
    { id: 2, title: 'House Down Payment', target: 80000, current: 32000, icon: Home, color: 'text-blue-500', bgColor: 'bg-blue-50', progress: 40 },
    { id: 3, title: 'New Car', target: 35000, current: 15000, icon: Car, color: 'text-green-500', bgColor: 'bg-green-50', progress: 43 },
    { id: 4, title: 'Vacation Fund', target: 8000, current: 2800, icon: Plane, color: 'text-purple-500', bgColor: 'bg-purple-50', progress: 35 },
];

export default function GoalOverview() {
    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
                    <p className="text-gray-600 mt-1">Track your financial goals and progress</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Goal
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quickStats.map((stat, index) => (
                    <Card key={index} className="border border-gray-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">{stat.title}</p>
                                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.amount}</p>
                                    <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                                </div>
                                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                                    <DollarSign className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Income Distribution */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Income Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={goalData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                        {goalData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            {goalData.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm text-gray-600">{item.name}</span>
                                    <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Savings Timeline */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Savings Timeline</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={progressData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" stroke="#6b7280" />
                                    <YAxis stroke="#6b7280" />
                                    <Tooltip
                                        formatter={(value) => [`$${value.toLocaleString()}`, 'Total Savings']}
                                        labelStyle={{ color: '#374151' }}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Goals */}
            <Card className="border border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg text-gray-900">Active Goals</CardTitle>
                    <Button variant="outline" size="sm">View All</Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activeGoals.map((goal) => {
                            const Icon = goal.icon;
                            return (
                                <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 ${goal.bgColor} rounded-lg flex items-center justify-center`}>
                                                <Icon className={`w-5 h-5 ${goal.color}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">{goal.title}</h3>
                                                <p className="text-sm text-gray-600">
                                                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs">{goal.progress}%</Badge>
                                    </div>
                                    <Progress value={goal.progress} className="h-2" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>{goal.progress}% complete</span>
                                        <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
