import React, { useState } from "react";
import {
    TrendingUp,

    DollarSign,
    Clock,
    PieChart,
    LineChart,
    Lightbulb,
    Star,
    ArrowRight,
    Filter,
    Download,
} from "lucide-react";

const personalizedRecommendations = [
    {
        id: 1,
        priority: "high",
        title: "Increase Emergency Fund Contribution",
        description:
            "Increase your Emergency Fund contribution by $200/month to reach your goal 2 months earlier.",
        impact: "High",
        effort: "Medium",
        savings: 2850,
        goalAffected: "Emergency Fund",
        currentContribution: 800,
        recommendedContribution: 1000,
        timeline: "2 months earlier completion",
    },
    {
        id: 2,
        priority: "medium",
        title: "Reallocate House Fund Contribution",
        description:
            "Reduce your House Down Payment contribution by $300/month to accelerate your Laptop goal completion.",
        impact: "Medium",
        effort: "Low",
        savings: 900,
        goalAffected: "Buy a Laptop",
        currentContribution: 1200,
        recommendedContribution: 900,
        timeline: "1 month earlier completion",
    },
    {
        id: 3,
        priority: "high",
        title: "Optimize Your Savings Rate",
        description:
            "Increase your savings rate from 30% to 35% to accelerate all goals significantly.",
        impact: "Very High",
        effort: "High",
        savings: 4800,
        goalAffected: "All Goals",
        currentContribution: 2400,
        recommendedContribution: 2800,
        timeline: "3-6 months earlier completion",
    },
];

const goalAnalysis = [
    {
        goalName: "Emergency Fund",
        currentProgress: 74,
        onTrackStatus: "ahead",
        monthsRemaining: 4,
        projectedCompletion: "2024-11-30",
        riskLevel: "low",
    },
    {
        goalName: "Buy a Laptop",
        currentProgress: 60,
        onTrackStatus: "behind",
        monthsRemaining: 1.5,
        projectedCompletion: "2024-11-15",
        riskLevel: "medium",
    },
    {
        goalName: "House Down Payment",
        currentProgress: 40,
        onTrackStatus: "on-track",
        monthsRemaining: 21,
        projectedCompletion: "2026-06-30",
        riskLevel: "low",
    },
];

const marketInsights = [
    {
        category: "Interest Rates",
        insight:
            "Savings rates are around 4.5%. Consider a high-yield account for your emergency fund.",
        impact: "Positive",
        action: "Switch to high-yield account",
    },
    {
        category: "Technology",
        insight:
            "Laptop prices usually drop 15-20% during holidays (Nov–Dec). Plan accordingly.",
        impact: "Opportunity",
        action: "Time purchase strategically",
    },
    {
        category: "Real Estate",
        insight:
            "Housing market stable — continue long-term saving strategy.",
        impact: "Neutral",
        action: "Stay consistent with plan",
    },
];

export default function ViewRecommendations() {
    const [selectedTab, setSelectedTab] = useState("personalized");

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

    const getStatusColor = (status) => {
        switch (status) {
            case "ahead":
                return "text-green-600 bg-green-50";
            case "on-track":
                return "text-blue-600 bg-blue-50";
            case "behind":
                return "text-red-600 bg-red-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getImpactIcon = (impact) => {
        switch (impact) {
            case "Very High":
                return <Star className="w-4 h-4 text-yellow-500" />;
            case "High":
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case "Medium":
                return <LineChart className="w-4 h-4 text-blue-500" />;
            default:
                return <Lightbulb className="w-4 h-4 text-purple-500" />;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center flex-wrap gap-3">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                        View Recommendations
                    </h1>
                    <p className="text-gray-600 mt-1">
                        AI-powered insights for your financial goals
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 border px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                    <button className="flex items-center gap-2 bg-blue-900 hover:bg-blue-700 text-white px-3 py-2 rounded-md">
                        <Filter className="w-4 h-4" />
                        Customize
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 border rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">Active Recommendations</p>
                        <p className="text-2xl font-semibold text-purple-600">8</p>
                        <p className="text-xs text-gray-500 mt-1">3 high priority</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                <div className="p-6 border rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">Potential Savings</p>
                        <p className="text-2xl font-semibold text-green-600">$8,550</p>
                        <p className="text-xs text-gray-500 mt-1">If implemented</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                </div>

                <div className="p-6 border rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">Time Saved</p>
                        <p className="text-2xl font-semibold text-blue-600">6</p>
                        <p className="text-xs text-gray-500 mt-1">Months earlier</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                </div>

                <div className="p-6 border rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-sm text-gray-600">Recommendation Score</p>
                        <p className="text-2xl font-semibold text-orange-600">92%</p>
                        <p className="text-xs text-gray-500 mt-1">Optimization level</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-orange-600" />
                    </div>
                </div>
            </div>

            {/* Tab Switch Buttons */}
            <div className="flex gap-2 border-b pb-2">
                <button
                    onClick={() => setSelectedTab("personalized")}
                    className={`px-4 py-2 rounded-t-md ${selectedTab === "personalized"
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600"
                        }`}
                >
                    Personalized
                </button>
                <button
                    onClick={() => setSelectedTab("analysis")}
                    className={`px-4 py-2 rounded-t-md ${selectedTab === "analysis"
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600"
                        }`}
                >
                    Goal Analysis
                </button>
                <button
                    onClick={() => setSelectedTab("insights")}
                    className={`px-4 py-2 rounded-t-md ${selectedTab === "insights"
                            ? "bg-blue-100 text-blue-700"
                            : "text-gray-600"
                        }`}
                >
                    Market Insights
                </button>
            </div>

            {/* Personalized Tab */}
            {selectedTab === "personalized" && (
                <div className="space-y-6">
                    {personalizedRecommendations.map((rec) => (
                        <div key={rec.id} className="p-6 border rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                        {getImpactIcon(rec.impact)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900">
                                            {rec.title}
                                        </h3>
                                        <p
                                            className={`inline-block mt-1 text-xs px-2 py-1 rounded ${getPriorityColor(
                                                rec.priority
                                            )}`}
                                        >
                                            {rec.priority} priority
                                        </p>
                                        <p className="text-gray-600 mt-2">{rec.description}</p>
                                    </div>
                                </div>
                                <button className="text-purple-600 text-sm border px-3 py-1 rounded hover:bg-purple-50">
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Goal Analysis Tab */}
            {selectedTab === "analysis" && (
                <div className="space-y-6">
                    {goalAnalysis.map((goal, index) => (
                        <div key={index} className="p-6 border rounded-lg">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <h3 className="font-semibold text-lg">{goal.goalName}</h3>
                                    <p className="text-sm text-gray-600">
                                        {goal.monthsRemaining} months remaining
                                    </p>
                                </div>
                                <p
                                    className={`px-2 py-1 rounded text-xs ${getStatusColor(
                                        goal.onTrackStatus
                                    )}`}
                                >
                                    {goal.onTrackStatus}
                                </p>
                            </div>
                            <div className="text-sm text-gray-600">
                                Progress: <b>{goal.currentProgress}%</b>
                            </div>
                            <div className="w-full bg-gray-200 h-2 rounded mt-2">
                                <div
                                    className="h-2 bg-purple-600 rounded"
                                    style={{ width: `${goal.currentProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Market Insights Tab */}
            {selectedTab === "insights" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {marketInsights.map((item, i) => (
                        <div key={i} className="p-6 border rounded-lg">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <PieChart className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        {item.category}
                                    </h3>
                                    <p className="text-xs text-gray-500">{item.impact}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700 mb-3">{item.insight}</p>
                            <button className="w-full text-sm text-purple-600 border px-3 py-2 rounded hover:bg-purple-50">
                                {item.action} <ArrowRight className="inline w-3 h-3 ml-1" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
