import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
    Target,
    PlusCircle,
    Calendar,
    DollarSign,
    Home,
    Car,
    Heart,
    Plane,
    GraduationCap,
    Edit3,
    Trash2,
    CheckCircle
} from 'lucide-react';

const goals = [
    {
        id: 1,
        title: 'Emergency Fund',
        description: '6 months of living expenses',
        target: 25000,
        current: 18500,
        monthlyContribution: 800,
        deadline: '2024-12-31',
        priority: 'High',
        status: 'active',
        icon: Heart,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
    },
    {
        id: 2,
        title: 'House Down Payment',
        description: '20% down payment for new home',
        target: 80000,
        current: 32000,
        monthlyContribution: 1200,
        deadline: '2026-06-30',
        priority: 'High',
        status: 'active',
        icon: Home,
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    {
        id: 3,
        title: 'New Car',
        description: 'Reliable family vehicle',
        target: 35000,
        current: 15000,
        monthlyContribution: 600,
        deadline: '2025-03-31',
        priority: 'Medium',
        status: 'active',
        icon: Car,
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    },
    {
        id: 4,
        title: 'European Vacation',
        description: 'Dream trip to Europe',
        target: 8000,
        current: 2800,
        monthlyContribution: 400,
        deadline: '2024-08-15',
        priority: 'Low',
        status: 'active',
        icon: Plane,
        color: 'text-purple-500',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
    },
    {
        id: 5,
        title: 'Education Fund',
        description: "Master's degree program",
        target: 50000,
        current: 50000,
        monthlyContribution: 0,
        deadline: '2024-01-15',
        priority: 'High',
        status: 'completed',
        icon: GraduationCap,
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    }
];

const goalTemplates = [
    { title: 'Emergency Fund', target: 25000, icon: Heart, description: '6 months expenses' },
    { title: 'House Down Payment', target: 80000, icon: Home, description: '20% down payment' },
    { title: 'New Vehicle', target: 35000, icon: Car, description: 'Reliable transportation' },
    { title: 'Vacation Fund', target: 8000, icon: Plane, description: 'Travel savings' },
    { title: 'Education', target: 50000, icon: GraduationCap, description: 'Learning investment' }
];

export default function MyGoals() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const calculateProgress = (current, target) => {
        return Math.min((current / target) * 100, 100);
    };

    const calculateMonthsRemaining = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const diffTime = end.getTime() - now.getTime();
        const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
        return Math.max(diffMonths, 0);
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">My Goals</h1>
                    <p className="text-gray-600 mt-1">Manage and track your financial objectives</p>
                </div>
                <Button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add New Goal
                </Button>
            </div>

            {/* Add Goal Form */}
            {showAddForm && (
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Create New Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Goal Templates */}
                            <div>
                                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                                    Choose a template
                                </Label>
                                <div className="space-y-2">
                                    {goalTemplates.map((template, index) => {
                                        const Icon = template.icon;
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => setSelectedTemplate(template)}
                                                className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedTemplate?.title === template.title
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <Icon className="w-4 h-4 text-gray-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">{template.title}</p>
                                                        <p className="text-xs text-gray-600">{template.description}</p>
                                                    </div>
                                                    <div className="ml-auto text-sm font-medium text-gray-900">
                                                        ${template.target.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Goal Details Form */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="goalName" className="text-sm font-medium text-gray-700">
                                        Goal Name
                                    </Label>
                                    <Input
                                        id="goalName"
                                        placeholder="Enter goal name"
                                        defaultValue={selectedTemplate?.title || ''}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="targetAmount" className="text-sm font-medium text-gray-700">
                                        Target Amount
                                    </Label>
                                    <Input
                                        id="targetAmount"
                                        type="number"
                                        placeholder="0"
                                        defaultValue={selectedTemplate?.target || ''}
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="monthlyContribution" className="text-sm font-medium text-gray-700">
                                        Monthly Contribution
                                    </Label>
                                    <Input
                                        id="monthlyContribution"
                                        type="number"
                                        placeholder="0"
                                        className="mt-1"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="deadline" className="text-sm font-medium text-gray-700">
                                        Target Date
                                    </Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        className="mt-1"
                                    />
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        onClick={() => setShowAddForm(false)}
                                        variant="outline"
                                        className="flex-1"
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                        Create Goal
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Goals List */}
            <div className="space-y-4">
                {goals.map((goal) => {
                    const Icon = goal.icon;
                    const progress = calculateProgress(goal.current, goal.target);
                    const monthsRemaining = calculateMonthsRemaining(goal.deadline);
                    const isCompleted = goal.status === 'completed';

                    return (
                        <Card key={goal.id} className={`border-2 ${goal.borderColor} ${isCompleted ? 'opacity-75' : ''}`}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${goal.bgColor} rounded-lg flex items-center justify-center relative`}>
                                            <Icon className={`w-6 h-6 ${goal.color}`} />
                                            {isCompleted && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-gray-900">{goal.title}</h3>
                                            <p className="text-gray-600 text-sm">{goal.description}</p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                                                    {goal.priority} Priority
                                                </Badge>
                                                {isCompleted && (
                                                    <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                                                        Completed
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" size="sm">
                                            <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-600">Progress</span>
                                            <span className="text-sm font-medium text-gray-900">
                                                ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                                            </span>
                                        </div>
                                        <Progress value={progress} className="h-3" />
                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                            <span>{progress.toFixed(1)}% complete</span>
                                            <span>${(goal.target - goal.current).toLocaleString()} remaining</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <DollarSign className="w-3 h-3 text-gray-600" />
                                                <p className="text-xs text-gray-600">Monthly</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">${goal.monthlyContribution}</p>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Target className="w-3 h-3 text-gray-600" />
                                                <p className="text-xs text-gray-600">Target</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">${goal.target.toLocaleString()}</p>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Calendar className="w-3 h-3 text-gray-600" />
                                                <p className="text-xs text-gray-600">Deadline</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                {new Date(goal.deadline).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-lg text-center">
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <Calendar className="w-3 h-3 text-gray-600" />
                                                <p className="text-xs text-gray-600">Time Left</p>
                                            </div>
                                            <p className="font-semibold text-gray-900">
                                                {isCompleted ? 'Completed' : `${monthsRemaining} months`}
                                            </p>
                                        </div>
                                    </div>

                                    {!isCompleted && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="flex-1">
                                                Add Contribution
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1">
                                                Adjust Goal
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
