import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import {
    DollarSign,
    Plus,
    Target,
    TrendingUp,
    CheckCircle,
    Clock,
    CreditCard,
    PiggyBank,
    Wallet,
    History,
    Filter
} from 'lucide-react';

// Mock data for user goals
const userGoals = [
    {
        id: 1,
        name: 'Emergency Fund',
        currentAmount: 18500,
        targetAmount: 25000,
        monthlyTarget: 800,
        progress: 74,
        deadline: '2024-12-31',
        priority: 'high'
    },
    {
        id: 2,
        name: 'Buy a Laptop',
        currentAmount: 900,
        targetAmount: 1500,
        monthlyTarget: 200,
        progress: 60,
        deadline: '2024-10-15',
        priority: 'medium'
    },
    {
        id: 3,
        name: 'House Down Payment',
        currentAmount: 32000,
        targetAmount: 80000,
        monthlyTarget: 1200,
        progress: 40,
        deadline: '2026-06-30',
        priority: 'high'
    }
];

// Mock contribution history
const contributionHistory = [
    { id: 1, goalName: 'Emergency Fund', amount: 800, date: '2024-09-01', method: 'Bank Transfer', status: 'completed' },
    { id: 2, goalName: 'Buy a Laptop', amount: 200, date: '2024-09-01', method: 'Auto-Debit', status: 'completed' },
    { id: 3, goalName: 'House Down Payment', amount: 1200, date: '2024-08-30', method: 'Bank Transfer', status: 'completed' },
    { id: 4, goalName: 'Emergency Fund', amount: 500, date: '2024-08-15', method: 'Cash Deposit', status: 'completed' },
    { id: 5, goalName: 'Buy a Laptop', amount: 150, date: '2024-08-10', method: 'Credit Card', status: 'pending' }
];

export default function Contributions() {
    const [selectedGoal, setSelectedGoal] = useState('');
    const [contributionAmount, setContributionAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState('all');

    const totalMonthlyTarget = userGoals.reduce((sum, goal) => sum + goal.monthlyTarget, 0);
    const totalContributed = contributionHistory
        .filter(contrib => contrib.status === 'completed')
        .reduce((sum, contrib) => sum + contrib.amount, 0);

    const handleAddContribution = () => {
        if (!selectedGoal || !contributionAmount || !paymentMethod) return;

        // Add contribution logic here
        setSelectedGoal('');
        setContributionAmount('');
        setPaymentMethod('');
        setShowAddForm(false);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getMethodIcon = (method) => {
        switch (method) {
            case 'Bank Transfer':
                return <Wallet className="w-4 h-4" />;
            case 'Auto-Debit':
                return <CreditCard className="w-4 h-4" />;
            case 'Cash Deposit':
                return <DollarSign className="w-4 h-4" />;
            case 'Credit Card':
                return <CreditCard className="w-4 h-4" />;
            default:
                return <Wallet className="w-4 h-4" />;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Contributions</h1>
                    <p className="text-gray-600 mt-1">
                        Add contributions to your financial goals and track your progress
                    </p>
                </div>
                <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-700 hover:bg-blue-600 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contribution
                </Button>
            </div>

            {/* Monthly Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-gray-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Monthly Target</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ${totalMonthlyTarget.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Across all goals</p>
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
                                <p className="text-sm text-gray-600">This Month Contributed</p>
                                <p className="text-2xl font-semibold text-green-600">$2,200</p>
                                <p className="text-xs text-gray-500 mt-1">91% of target</p>
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
                                <p className="text-sm text-gray-600">Total Contributed</p>
                                <p className="text-2xl font-semibold text-blue-600">
                                    ${totalContributed.toLocaleString()}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <p className="text-xs text-green-600">On track</p>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <PiggyBank className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Contribution Form */}
            {showAddForm && (
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Add New Contribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="goal" className="text-sm font-medium text-gray-700">
                                        Select Goal
                                    </Label>
                                    <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Choose a goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {userGoals.map(goal => (
                                                <SelectItem key={goal.id} value={goal.id.toString()}>
                                                    <div className="flex items-center justify-between w-full">
                                                        <span>{goal.name}</span>
                                                        <span className="text-sm text-gray-500 ml-2">
                                                            ${goal.monthlyTarget}/month target
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                                        Contribution Amount ($)
                                    </Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={contributionAmount}
                                        onChange={e => setContributionAmount(e.target.value)}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="method" className="text-sm font-medium text-gray-700">
                                        Payment Method
                                    </Label>
                                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select payment method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="auto-debit">Auto-Debit</SelectItem>
                                            <SelectItem value="cash-deposit">Cash Deposit</SelectItem>
                                            <SelectItem value="credit-card">Credit Card</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAddContribution}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                        disabled={!selectedGoal || !contributionAmount || !paymentMethod}
                                    >
                                        Add Contribution
                                    </Button>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-3">Goal Progress Overview</h4>
                                <div className="space-y-3">
                                    {userGoals.map(goal => (
                                        <div key={goal.id} className="p-3 bg-white rounded-lg border">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">{goal.name}</span>
                                                <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                                                    {goal.priority}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                <span>${goal.currentAmount.toLocaleString()}</span>
                                                <span>${goal.targetAmount.toLocaleString()}</span>
                                            </div>
                                            <Progress value={goal.progress} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Goals Progress */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Goal Contribution Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {userGoals.map(goal => (
                            <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <Target className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{goal.name}</h4>
                                            <p className="text-sm text-gray-600">Target: ${goal.monthlyTarget}/month</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge className={`${getPriorityColor(goal.priority)}`}>
                                            {goal.priority} priority
                                        </Badge>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Due: {new Date(goal.deadline).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-3">
                                    <div className="text-center">
                                        <p className="text-2xl font-semibold text-gray-900">
                                            ${goal.currentAmount.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-600">Current</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-semibold text-blue-600">{goal.progress}%</p>
                                        <p className="text-xs text-gray-600">Complete</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-semibold text-blue-600">
                                            ${(goal.targetAmount - goal.currentAmount).toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-600">Remaining</p>
                                    </div>
                                </div>

                                <Progress value={goal.progress} className="h-3 mb-3" />

                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600">
                                        Monthly target: ${goal.monthlyTarget}
                                    </span>
                                    <Button
                                        onClick={() => {
                                            setSelectedGoal(goal.id.toString());
                                            setShowAddForm(true);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Contribution History */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                            <History className="w-5 h-5" />
                            Contribution History
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-600" />
                            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="month">This Month</SelectItem>
                                    <SelectItem value="quarter">This Quarter</SelectItem>
                                    <SelectItem value="year">This Year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {contributionHistory.map(contrib => (
                            <div
                                key={contrib.id}
                                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                                        {getMethodIcon(contrib.method)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{contrib.goalName}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm text-gray-600">{contrib.method}</p>
                                            <span className="text-gray-400">•</span>
                                            <p className="text-sm text-gray-600">
                                                {new Date(contrib.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-medium text-green-600">
                                        +${contrib.amount.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-1">
                                        {contrib.status === 'completed' ? (
                                            <CheckCircle className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <Clock className="w-3 h-3 text-yellow-500" />
                                        )}
                                        <span
                                            className={`text-xs ${contrib.status === 'completed'
                                                    ? 'text-green-600'
                                                    : 'text-yellow-600'
                                                }`}
                                        >
                                            {contrib.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
