import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
    Target,
    PlusCircle,
    Calendar,
    DollarSign,
    Home,
    Car,
    GraduationCap,
    Plane,
    Heart,
    Edit,
    Trash2
} from "lucide-react";

const goals = [
    {
        id: 1,
        title: "Emergency Fund",
        description: "6 months of expenses saved",
        target: 25000,
        current: 18500,
        deadline: "2024-12-31",
        category: "Security",
        icon: Heart,
        color: "bg-red-500",
        priority: "High"
    },
    {
        id: 2,
        title: "House Down Payment",
        description: "20% down payment for dream home",
        target: 80000,
        current: 32000,
        deadline: "2026-06-30",
        category: "Housing",
        icon: Home,
        color: "bg-blue-500",
        priority: "High"
    },
    {
        id: 3,
        title: "New Car",
        description: "Save for a reliable vehicle",
        target: 35000,
        current: 15000,
        deadline: "2025-03-31",
        category: "Transportation",
        icon: Car,
        color: "bg-green-500",
        priority: "Medium"
    },
    {
        id: 4,
        title: "European Vacation",
        description: "3-week trip across Europe",
        target: 8000,
        current: 2800,
        deadline: "2024-08-15",
        category: "Travel",
        icon: Plane,
        color: "bg-purple-500",
        priority: "Low"
    },
    {
        id: 5,
        title: "Master's Degree",
        description: "Advanced education fund",
        target: 50000,
        current: 12000,
        deadline: "2025-09-01",
        category: "Education",
        icon: GraduationCap,
        color: "bg-yellow-500",
        priority: "Medium"
    }
];

const monthlyContributions = [
    { goal: "Emergency Fund", amount: 800 },
    { goal: "House Down Payment", amount: 1200 },
    { goal: "New Car", amount: 600 },
    { goal: "European Vacation", amount: 300 },
    { goal: "Master's Degree", amount: 400 }
];

export default function GoalsTracker() {
    const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target, 0);
    const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0);
    const overallProgress = (totalSaved / totalGoalAmount) * 100;

    const getTimeRemaining = (deadline) => {
        const now = new Date();
        const end = new Date(deadline);
        const diffTime = end.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Overdue";
        if (diffDays < 30) return `${diffDays} days`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
        return `${Math.floor(diffDays / 365)} years`;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "High":
                return "destructive";
            case "Medium":
                return "default";
            case "Low":
                return "secondary";
            default:
                return "secondary";
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1>Financial Goals</h1>
                    <p className="text-muted-foreground">
                        Track progress towards your financial objectives
                    </p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add Goal
                </Button>
            </div>

            {/* Goals Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Goal Amount
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalGoalAmount.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Across {goals.length} goals
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalSaved.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {overallProgress.toFixed(1)}% of total goals
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Contributions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$3,300</div>
                        <p className="text-xs text-muted-foreground">
                            Total across all goals
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Individual Goals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goals.map((goal) => {
                    const Icon = goal.icon;
                    const progress = (goal.current / goal.target) * 100;
                    const remaining = goal.target - goal.current;
                    const monthlyNeeded =
                        monthlyContributions.find((c) => c.goal === goal.title)?.amount || 0;

                    return (
                        <Card key={goal.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${goal.color} text-white`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{goal.title}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {goal.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant={getPriorityColor(goal.priority)} className="text-xs">
                                            {goal.priority}
                                        </Badge>
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Edit className="w-3 h-3" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Progress</span>
                                        <span className="text-sm text-muted-foreground">
                                            ${goal.current.toLocaleString()} / $
                                            {goal.target.toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                        <span>{progress.toFixed(1)}% complete</span>
                                        <span>${remaining.toLocaleString()} remaining</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">Deadline</p>
                                            <p className="font-medium">
                                                {getTimeRemaining(goal.deadline)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-muted-foreground">Monthly</p>
                                            <p className="font-medium">${monthlyNeeded}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    <Button variant="outline" size="sm" className="w-full">
                                        Add Contribution
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Goals Insights */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Goals Insights & Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <Target className="w-5 h-5 text-green-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-green-800">On Track Goals</p>
                                <p className="text-sm text-green-700">
                                    Your Emergency Fund is 74% complete and on track to meet the
                                    deadline.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <Calendar className="w-5 h-5 text-yellow-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-yellow-800">
                                    Deadline Approaching
                                </p>
                                <p className="text-sm text-yellow-700">
                                    Your European Vacation goal needs $5,200 more with only 8
                                    months remaining. Consider increasing monthly contributions to
                                    $650.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <p className="font-medium text-blue-800">Optimization Tip</p>
                                <p className="text-sm text-blue-700">
                                    Consider redirecting funds from lower priority goals to
                                    high-priority ones like your Emergency Fund and House Down
                                    Payment.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
