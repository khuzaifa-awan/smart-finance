import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
    Brain,
    TrendingUp,
    TrendingDown,
    Target,
    Lightbulb,
    AlertTriangle,
    CheckCircle,
    PieChart,
    BarChart3,
    Zap,
    RefreshCw
} from 'lucide-react';

const insights = [
    {
        id: 1,
        type: 'optimization',
        title: 'Savings Rate Optimization',
        description: 'Based on your income pattern, you can increase your savings rate by 5% without affecting your lifestyle.',
        impact: 'High',
        confidence: 92,
        recommendation: 'Increase monthly savings from $2,800 to $3,200',
        potentialSaving: 4800,
        timeframe: '1 year',
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    },
    {
        id: 2,
        type: 'warning',
        title: 'Goal Timeline Risk',
        description: 'Your "House Down Payment" goal may be delayed by 6 months at current contribution rate.',
        impact: 'Medium',
        confidence: 87,
        recommendation: 'Increase monthly contribution by $300 or extend deadline by 6 months',
        potentialSaving: -1800,
        timeframe: '6 months',
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    {
        id: 3,
        type: 'opportunity',
        title: 'Expense Pattern Analysis',
        description: 'Your spending decreases by 15% during months 3, 6, 9, 12. Plan larger goal contributions during these periods.',
        impact: 'Medium',
        confidence: 94,
        recommendation: 'Schedule automatic increased contributions during low-spend months',
        potentialSaving: 2400,
        timeframe: '3 months',
        icon: BarChart3,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    {
        id: 4,
        type: 'success',
        title: 'Achievement Predictor',
        description: "You're on track to complete your Emergency Fund 2 months ahead of schedule!",
        impact: 'High',
        confidence: 96,
        recommendation: 'Consider reallocating future emergency fund contributions to other goals',
        potentialSaving: 1600,
        timeframe: '2 months',
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    }
];

const spendingPatterns = [
    {
        category: 'Groceries',
        avgMonthly: 600,
        trend: 'stable',
        suggestion: 'Your grocery spending is consistent. Consider meal planning to save 10%.',
        potential: 60
    },
    {
        category: 'Entertainment',
        avgMonthly: 300,
        trend: 'increasing',
        suggestion: 'Entertainment costs increased 20% this quarter. Set a monthly limit.',
        potential: 60
    },
    {
        category: 'Transportation',
        avgMonthly: 250,
        trend: 'decreasing',
        suggestion: 'Great job reducing transport costs! You saved $40/month this year.',
        potential: 0
    },
    {
        category: 'Subscriptions',
        avgMonthly: 85,
        trend: 'stable',
        suggestion: 'Review subscriptions quarterly. Cancel unused services to save.',
        potential: 25
    }
];

const goalPredictions = [
    {
        goal: 'Emergency Fund',
        currentProgress: 74,
        predictedCompletion: '2024-10-15',
        originalTarget: '2024-12-31',
        status: 'ahead',
        confidence: 96
    },
    {
        goal: 'House Down Payment',
        currentProgress: 40,
        predictedCompletion: '2027-01-15',
        originalTarget: '2026-06-30',
        status: 'behind',
        confidence: 89
    },
    {
        goal: 'New Laptop',
        currentProgress: 60,
        predictedCompletion: '2024-09-20',
        originalTarget: '2024-10-15',
        status: 'ahead',
        confidence: 91
    }
];

const marketInsights = [
    {
        title: 'Interest Rate Opportunity',
        description: 'High-yield savings rates are at 4.5%. Consider moving funds from 2.1% account.',
        potential: '$23/month additional interest',
        action: 'Move to high-yield account'
    },
    {
        title: 'CD Ladder Strategy',
        description: 'CDs offering 5.2% APY for 12-month terms. Good for medium-term goals.',
        potential: '$156/year additional interest',
        action: 'Open CD for house fund'
    }
];

export default function AIInsights() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedTimeframe, setSelectedTimeframe] = useState('3months');

    const handleRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 2000);
    };

    const getImpactColor = (impact) => {
        switch (impact) {
            case 'High': return 'bg-red-100 text-red-800 border-red-200';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ahead': return 'text-green-600';
            case 'behind': return 'text-red-600';
            case 'on-track': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />;
            case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />;
            default: return <TrendingUp className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">AI Financial Insights</h1>
                    <p className="text-gray-600 mt-1">Smart analysis and predictions for your financial goals</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="1month">Last Month</option>
                        <option value="3months">Last 3 Months</option>
                        <option value="6months">Last 6 Months</option>
                        <option value="1year">Last Year</option>
                    </select>
                    <Button
                        onClick={handleRefresh}
                        variant="outline"
                        size="sm"
                        disabled={refreshing}
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                        Refresh
                    </Button>
                </div>
            </div>

            {/* AI Confidence Score */}
            <Card className="border border-gray-200 bg-gradient-to-r from-blue-50 to-blue-50">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Brain className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">AI Analysis Confidence</h3>
                                <p className="text-sm text-gray-600">Based on 6 months of financial data</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">92%</div>
                            <p className="text-sm text-gray-600">Prediction accuracy</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Insights */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900">Key Insights & Recommendations</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {insights.map((insight) => {
                        const Icon = insight.icon;
                        return (
                            <Card key={insight.id} className={`border ${insight.borderColor} ${insight.bgColor}`}>
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className={`w-10 h-10 ${insight.bgColor} rounded-lg flex items-center justify-center border ${insight.borderColor}`}>
                                            <Icon className={`w-5 h-5 ${insight.color}`} />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                                                <div className="flex gap-2">
                                                    <Badge className={getImpactColor(insight.impact)}>
                                                        {insight.impact} Impact
                                                    </Badge>
                                                    <Badge variant="outline">
                                                        {insight.confidence}% confidence
                                                    </Badge>
                                                </div>
                                            </div>

                                            <p className="text-gray-600 mb-3">{insight.description}</p>

                                            <div className="p-3 bg-white rounded-lg border border-gray-200 mb-3">
                                                <p className="text-sm font-medium text-gray-900 mb-1">Recommendation:</p>
                                                <p className="text-sm text-gray-700">{insight.recommendation}</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    {insight.potentialSaving > 0 && (
                                                        <div className="text-sm">
                                                            <span className="text-gray-600">Potential gain: </span>
                                                            <span className="font-medium text-green-600">
                                                                +${insight.potentialSaving.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="text-sm">
                                                        <span className="text-gray-600">Timeframe: </span>
                                                        <span className="font-medium text-gray-900">{insight.timeframe}</span>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Goal Predictions */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                        <Target className="w-5 h-5" />
                        Goal Completion Predictions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {goalPredictions.map((goal, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <Target className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{goal.goal}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Progress value={goal.currentProgress} className="w-20 h-2" />
                                            <span className="text-sm text-gray-600">{goal.currentProgress}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-600">Predicted:</span>
                                        <span className={`text-sm font-medium ${getStatusColor(goal.status)}`}>
                                            {new Date(goal.predictedCompletion).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-gray-500">Target:</span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(goal.originalTarget).toLocaleDateString()}
                                        </span>
                                        <Badge variant="outline" className="text-xs">
                                            {goal.confidence}% sure
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spending Pattern Analysis */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                            <PieChart className="w-5 h-5" />
                            Spending Pattern Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {spendingPatterns.map((pattern, index) => (
                                <div key={index} className="p-3 border border-gray-200 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-900">{pattern.category}</span>
                                            {getTrendIcon(pattern.trend)}
                                        </div>
                                        <span className="font-medium text-gray-900">
                                            ${pattern.avgMonthly}/month
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{pattern.suggestion}</p>
                                    {pattern.potential > 0 && (
                                        <div className="text-sm text-green-600">
                                            Potential monthly savings: ${pattern.potential}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Market Opportunities */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                            <Zap className="w-5 h-5" />
                            Market Opportunities
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {marketInsights.map((insight, index) => (
                                <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">{insight.title}</h4>
                                    <p className="text-sm text-blue-700 mb-3">{insight.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-green-600">
                                            {insight.potential}
                                        </span>
                                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                                            {insight.action}
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-4 h-4 text-purple-600" />
                                    <h4 className="font-medium text-purple-900">Smart Tip</h4>
                                </div>
                                <p className="text-sm text-purple-700">
                                    Based on your savings pattern, you could benefit from automating 70% of your contributions
                                    and manually adjusting 30% based on monthly income fluctuations.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}