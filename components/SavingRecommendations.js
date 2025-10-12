"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import {
    DollarSign,
    TrendingUp,
    Target,
    PiggyBank,
    Calendar,
    Lightbulb,
    ArrowRight,
} from "lucide-react";

const userProfile = {
    monthlyIncome: 8000,
    currentExpenses: 5200,
    currentSavingsRate: 35,
    recommendedSavingsRate: 30,
    totalSaved: 65500,
    emergencyFundTarget: 31200,
    currentEmergencyFund: 25000,
};

const savingAccounts = [
    {
        id: 1,
        name: "High-Yield Savings",
        type: "Emergency Fund",
        apy: 4.5,
        currentAmount: 25000,
        recommendedAmount: 31200,
        provider: "Marcus by Goldman Sachs",
        features: ["FDIC Insured", "No minimum balance", "Online banking"],
        color: "bg-green-50 border-green-200",
    },
    {
        id: 2,
        name: "Goal Saver Account",
        type: "Short-term Goals",
        apy: 4.2,
        currentAmount: 8500,
        recommendedAmount: 15000,
        provider: "Ally Bank",
        features: ["Goal tracking", "Auto-transfer", "Mobile app"],
        color: "bg-blue-50 border-blue-200",
    },
    {
        id: 3,
        name: "CD Ladder",
        type: "Medium-term Goals",
        apy: 5.1,
        currentAmount: 12000,
        recommendedAmount: 20000,
        provider: "Capital One",
        features: ["Fixed rate", "12-month terms", "Early withdrawal penalty"],
        color: "bg-purple-50 border-purple-200",
    },
];

const recommendations = [
    {
        id: 1,
        title: "Optimize Emergency Fund",
        description:
            "Move additional $6,200 to complete your 6-month emergency fund",
        priority: "high",
        impact: "High",
        effort: "Low",
        timeframe: "2-3 months",
        icon: PiggyBank,
        action: "Transfer funds to high-yield savings",
    },
    {
        id: 2,
        title: "Increase Savings Rate",
        description:
            "Your current 35% savings rate is excellent. Maintain this pace.",
        priority: "medium",
        impact: "Medium",
        effort: "Medium",
        timeframe: "Ongoing",
        icon: TrendingUp,
        action: "Continue current saving strategy",
    },
    {
        id: 3,
        title: "Diversify Savings Accounts",
        description:
            "Consider a CD ladder for goals 2+ years away to maximize returns",
        priority: "low",
        impact: "Medium",
        effort: "Low",
        timeframe: "1 month",
        icon: Target,
        action: "Open CD account for long-term goals",
    },
    {
        id: 4,
        title: "Automate Savings",
        description:
            "Set up automatic transfers to reach goals without thinking about it",
        priority: "medium",
        impact: "High",
        effort: "Low",
        timeframe: "1 week",
        icon: Calendar,
        action: "Setup auto-transfers",
    },
];

const monthlyAllocation = {
    totalAvailable: userProfile.monthlyIncome - userProfile.currentExpenses,
    recommended: {
        emergencyFund: 500,
        shortTermGoals: 800,
        longTermGoals: 600,
        investment: 900,
    },
};

export default function SavingRecommendations() {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800 border-red-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getProgressColor = (current, target) => {
        const percentage = (current / target) * 100;
        if (percentage >= 100) return "bg-green-500";
        if (percentage >= 75) return "bg-blue-500";
        if (percentage >= 50) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Monthly Saving Recommendations
                    </h1>
                    <p className="text-gray-600 mt-1">
                        Personalized saving suggestions based on your ${userProfile.monthlyIncome.toLocaleString()} income
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Monthly Income</p>
                    <p className="text-2xl font-semibold text-purple-600">
                        ${userProfile.monthlyIncome.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Available for Goals: $
                        {monthlyAllocation.totalAvailable.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Savings Rate</p>
                                <p className="text-2xl font-semibold text-green-600">
                                    {userProfile.currentSavingsRate}%
                                </p>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <p className="text-xs text-green-600">
                                        Above recommended {userProfile.recommendedSavingsRate}%
                                    </p>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Emergency Fund</p>
                                <p className="text-2xl font-semibold text-blue-600">
                                    {(
                                        (userProfile.currentEmergencyFund /
                                            userProfile.emergencyFundTarget) *
                                        100
                                    ).toFixed(0)}
                                    %
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    ${userProfile.currentEmergencyFund.toLocaleString()} / $
                                    {userProfile.emergencyFundTarget.toLocaleString()}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                <PiggyBank className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Saved</p>
                                <p className="text-2xl font-semibold text-purple-600">
                                    ${userProfile.totalSaved.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">Lifetime savings</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Monthly Available</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    ${monthlyAllocation.totalAvailable.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    For savings & goals
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-gray-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommended Monthly Allocation */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                        <Target className="w-5 h-5" />
                        Recommended Monthly Allocation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {Object.entries(monthlyAllocation.recommended).map(([key, value], i) => (
                            <div key={i} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-purple-900">
                                        {key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
                                    </span>
                                    <DollarSign className="w-4 h-4 text-purple-600" />
                                </div>
                                <p className="text-2xl font-bold text-purple-600">${value}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recommended Savings Accounts */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                        <PiggyBank className="w-5 h-5" />
                        Recommended Savings Accounts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {savingAccounts.map((account) => {
                            const percentage =
                                (account.currentAmount / account.recommendedAmount) * 100;
                            return (
                                <div
                                    key={account.id}
                                    className={`p-4 rounded-lg border ${account.color}`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">
                                                {account.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {account.type} • {account.provider}
                                            </p>
                                            <Badge className="bg-white text-green-800 border border-green-300 mt-1">
                                                {account.apy}% APY
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-gray-900">
                                                ${account.currentAmount.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                / ${account.recommendedAmount.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Progress</span>
                                            <span>{percentage.toFixed(0)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${getProgressColor(
                                                    account.currentAmount,
                                                    account.recommendedAmount
                                                )}`}
                                                style={{ width: `${Math.min(percentage, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {account.features.map((f, idx) => (
                                            <Badge key={idx} variant="outline" className="text-xs">
                                                {f}
                                            </Badge>
                                        ))}
                                    </div>

                                    <Button variant="outline" size="sm" className="w-full">
                                        <ArrowRight className="w-4 h-4 mr-2" />
                                        Learn More
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Personalized Recommendations */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                        <Lightbulb className="w-5 h-5" />
                        Personalized Recommendations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recommendations.map((rec) => {
                            const Icon = rec.icon;
                            return (
                                <div key={rec.id} className="p-4 border border-gray-200 rounded-lg">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-900">
                                                    {rec.title}
                                                </h4>
                                                <Badge className={getPriorityColor(rec.priority)}>
                                                    {rec.priority} priority
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600 mb-3">{rec.description}</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                                <div className="text-center p-2 bg-gray-50 rounded">
                                                    <p className="text-xs text-gray-600">Impact</p>
                                                    <p className="font-medium text-gray-900">
                                                        {rec.impact}
                                                    </p>
                                                </div>
                                                <div className="text-center p-2 bg-gray-50 rounded">
                                                    <p className="text-xs text-gray-600">Effort</p>
                                                    <p className="font-medium text-gray-900">
                                                        {rec.effort}
                                                    </p>
                                                </div>
                                                <div className="text-center p-2 bg-gray-50 rounded">
                                                    <p className="text-xs text-gray-600">Timeframe</p>
                                                    <p className="font-medium text-gray-900">
                                                        {rec.timeframe}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full text-purple-600 border-purple-300 hover:bg-purple-50"
                                            >
                                                {rec.action}
                                            </Button>
                                        </div>
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

