import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  PlusCircle,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Bell,
  Sparkles,
  DollarSign,
  Calendar,
  Loader2,
} from "lucide-react";

// ---- Main Component ----
export default function GoalPlanningModule() {
  const [goals, setGoals] = useState([]);
  const [isFetchingGoals, setIsFetchingGoals] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [aiInsights, setAiInsights] = useState(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    deadline: "",
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals");

        if (!response.ok) {
          throw new Error("Failed to fetch goals");
        }

        const { data: goals } = await response.json();
        setGoals(goals || []);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setIsFetchingGoals(false);
      }
    };

    fetchGoals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleGetAIInsights = async () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      alert("Please fill all fields before getting AI insights.");
      return;
    }

    setIsLoadingInsights(true);

    try {
      const response = await fetch("/api/ai-goal-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        throw new Error("Failed to get AI insights");
      }

      const data = await response.json();
      setAiInsights(data);
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      alert("Failed to get AI insights. Please try again.");
    } finally {
      setIsLoadingInsights(false);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
      alert("Please fill all fields.");
      return;
    }

    setIsCreatingGoal(true);

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      const { data: goal } = await response.json();

      setGoals([...goals, goal]);
      setNotifications([
        ...notifications,
        {
          id: Date.now(),
          message: `New goal "${newGoal.title}" created successfully!`,
          type: "success",
          date: new Date().toLocaleDateString(),
        },
      ]);

      setNewGoal({ title: "", target: "", deadline: "" });
      setAiInsights(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating goal:", error);
      alert("Failed to create goal. Please try again.");
    } finally {
      setIsCreatingGoal(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Active":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "Expired":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Goal Planning
          </h1>
          <p className="text-gray-600 mt-1">
            Track and plan your savings goals
          </p>
        </div>
        <Button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setAiInsights(null);
            }
          }}
          className="bg-blue-900 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          {showForm ? "Cancel" : "Add Goal"}
        </Button>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              Create a New Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Goal Title</Label>
              <Input
                name="title"
                value={newGoal.title}
                onChange={handleInputChange}
                placeholder="Enter goal name"
              />
            </div>
            <div>
              <Label>Target Amount ($)</Label>
              <Input
                type="number"
                name="target"
                value={newGoal.target}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div>
              <Label>Deadline</Label>
              <Input
                type="date"
                name="deadline"
                value={newGoal.deadline}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGetAIInsights}
                disabled={
                  !newGoal.title ||
                  !newGoal.target ||
                  !newGoal.deadline ||
                  isLoadingInsights
                }
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isLoadingInsights ? "Analyzing..." : "Get AI Insights"}
              </Button>
              <Button
                onClick={handleAddGoal}
                disabled={
                  !newGoal.title ||
                  !newGoal.target ||
                  !newGoal.deadline ||
                  isCreatingGoal
                }
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
              >
                {isCreatingGoal ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Goal"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Insights Display */}
      {aiInsights && (
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <CardHeader className="bg-white/50 border-b border-purple-200">
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI-Powered Goal Analysis
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-6 space-y-4">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Achievability</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {aiInsights.achievability}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {aiInsights.achievability >= 70
                    ? "Highly Achievable"
                    : aiInsights.achievability >= 50
                    ? "Moderately Achievable"
                    : "Challenging"}
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <DollarSign className="w-5 h-5" />
                  <span className="text-sm font-medium">Monthly Target</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ${aiInsights.monthlySavingsTarget}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Required monthly savings
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 text-orange-600 mb-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-sm font-medium">Timeline</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {aiInsights.timelineMonths}
                </p>
                <p className="text-xs text-gray-600 mt-1">Months to achieve</p>
              </div>
            </div>

            {/* AI Insights Markdown Content */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-3 border-b border-gray-200 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-700">
                  Detailed Analysis & Recommendations
                </h4>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-li:text-gray-700">
                  <ReactMarkdown>{aiInsights.detailedInsights}</ReactMarkdown>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Bell className="w-5 h-5" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((note) => (
              <div
                key={note.id}
                className={`p-3 rounded-lg border ${
                  note.type === "error"
                    ? "bg-red-100 border-red-200"
                    : "bg-green-100 border-green-200"
                }`}
              >
                <p
                  className={`text-sm ${
                    note.type === "error" ? "text-red-800" : "text-green-800"
                  }`}
                >
                  {note.message}
                </p>
                <p className="text-xs text-gray-600 mt-1">{note.date}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isFetchingGoals && (
        <Card className="border border-gray-200">
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              <p className="text-gray-600 text-lg">Loading your goals...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!isFetchingGoals && goals.length === 0 && (
        <Card className="border border-gray-200">
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Goals Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start planning your financial future by creating your first
                  goal
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Create Your First Goal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      {!isFetchingGoals && goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <Card key={goal.id} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-gray-900">
                    {goal.title}
                    {getStatusIcon(goal.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>${goal.currentAmount?.toLocaleString() || 0}</span>
                    <span>${goal.targetAmount?.toLocaleString() || 0}</span>
                  </div>
                  <Progress value={progress} className="h-3 mb-2" />
                  <p className="text-xs text-gray-500">
                    Deadline: {new Date(goal.deadline).toDateString()}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
