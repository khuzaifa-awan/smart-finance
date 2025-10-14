import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";
import {
  DollarSign,
  Plus,
  Target,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Wallet,
  History,
  Filter,
  TrendingDown,
} from "lucide-react";

export default function Contributions() {
  const [userGoals, setUserGoals] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [isContributing, setIsContributing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [contributionAmount, setContributionAmount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [currentContribution, setCurrentContribution] = useState(0);
  const [totalMonthlyTarget, setTotalMonthlyTarget] = useState(0);
  const [totalContributed, setTotalContributed] = useState(0);

  const fetchGoals = useCallback(async () => {
    try {
      const response = await fetch("/api/goals");

      if (!response.ok) {
        throw new Error("Failed to fetch goals");
      }

      const { data: goals } = await response.json();
      setUserGoals((goals || []).map((goal) => ({ ...goal })));
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }, []);

  const fetchContributions = useCallback(async () => {
    try {
      const response = await fetch("/api/goals-contributions");

      if (!response.ok) {
        throw new Error("Failed to fetch goals contributions");
      }

      const { data } = await response.json();

      setContributions(
        data.map((contribution) => ({
          id: contribution._id,
          goalName: contribution.goalId.title,
          amount: contribution.contributionAmount,
          date: contribution.createdAt,
          method: contribution.paymentMethod,
        }))
      );
    } catch (error) {
      console.error("Error fetching contributions:", error);
    }
  }, []);

  const fetchTargets = useCallback(async () => {
    try {
      const response = await fetch("/api/goals-contributions/targets");

      if (!response.ok) {
        throw new Error("Failed to fetch goals contributions targets");
      }

      const { data } = await response.json();

      setTotalMonthlyTarget(data.totalMonthlyTarget);
      setCurrentContribution(data.currentMonthContributions);
      setTotalContributed(data.totalContributions);
    } catch (error) {
      console.error("Error fetching contributions targets:", error);
    }
  }, []);

  const refetchAllData = useCallback(async () => {
    await Promise.all([fetchGoals(), fetchContributions(), fetchTargets()]);
  }, [fetchGoals, fetchContributions, fetchTargets]);

  useEffect(() => {
    refetchAllData();
  }, [refetchAllData]);

  const calculateMonthsRemaining = (deadline) => {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    const monthsDiff =
      (deadlineDate.getFullYear() - currentDate.getFullYear()) * 12 +
      (deadlineDate.getMonth() - currentDate.getMonth());
    return Math.max(monthsDiff, 1);
  };

  const calculateMonthlyTarget = (goal) => {
    const remaining = goal.targetAmount - (goal.currentAmount || 0);
    if (remaining <= 0) return 0;

    const monthsRemaining = calculateMonthsRemaining(goal.deadline);
    return Math.ceil(remaining / monthsRemaining);
  };

  const handleAddContribution = async () => {
    if (!selectedGoal || !contributionAmount || !paymentMethod) return;

    setIsContributing(true);
    try {
      const response = await fetch("/api/goals-contributions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goalId: selectedGoal,
          contributionAmount,
          paymentMethod,
        }),
      });

      if (response.ok) {
        setSelectedGoal("");
        setContributionAmount("");
        setPaymentMethod("");
        setShowAddForm(false);
        await refetchAllData();
      }
    } catch (error) {
      console.error("Error adding contribution:", error);
    } finally {
      setIsContributing(false);
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case "Bank Transfer":
        return <Wallet className="w-4 h-4" />;
      case "Auto-Debit":
        return <CreditCard className="w-4 h-4" />;
      case "Cash Deposit":
        return <DollarSign className="w-4 h-4" />;
      case "Credit Card":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Wallet className="w-4 h-4" />;
    }
  };

  const monthlyTargetPercentage =
    totalMonthlyTarget > 0
      ? Math.round((currentContribution / totalMonthlyTarget) * 100)
      : 0;

  const calculateOnTrackStatus = () => {
    if (userGoals.length === 0 || totalMonthlyTarget === 0) {
      return { isOnTrack: true, percentage: 0 };
    }

    const totalTargetAmount = userGoals.reduce(
      (sum, goal) => sum + goal.targetAmount,
      0
    );

    const avgMonthsRemaining =
      userGoals.reduce((sum, goal) => {
        return sum + calculateMonthsRemaining(goal.deadline);
      }, 0) / userGoals.length;

    const totalMonthsToComplete = avgMonthsRemaining;
    const currentMonth = new Date().getMonth();
    const startMonth = new Date(
      Math.min(
        ...userGoals.map((g) => new Date(g.createdAt || Date.now()).getTime())
      )
    ).getMonth();
    const monthsElapsed = Math.max((currentMonth - startMonth + 12) % 12, 1);

    const expectedContribution =
      (totalTargetAmount / totalMonthsToComplete) * monthsElapsed;

    const percentage =
      expectedContribution > 0
        ? Math.round((totalContributed / expectedContribution) * 100)
        : 0;
    const isOnTrack = totalContributed >= expectedContribution * 0.9;

    return { isOnTrack, percentage };
  };

  const trackingStatus = calculateOnTrackStatus();

  const selectedGoalDetails = userGoals.find(
    (goal) => goal._id?.toString() === selectedGoal
  );

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Contributions
          </h1>
          <p className="text-gray-600 mt-1">
            Add contributions to your financial goals and track your progress
          </p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-700 hover:bg-blue-600 text-white"
          disabled={userGoals.length === 0}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Contribution
        </Button>
      </div>

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
                <p className="text-2xl font-semibold text-green-600">
                  ${currentContribution.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {monthlyTargetPercentage}% of target
                </p>
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
                  {trackingStatus.isOnTrack ? (
                    <TrendingUp className={`w-3 h-3 text-green-500`} />
                  ) : (
                    <TrendingDown className={`w-3 h-3 text-orange-500`} />
                  )}
                  <p
                    className={`text-xs ${
                      trackingStatus.isOnTrack
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {trackingStatus.isOnTrack ? "On track" : "Behind target"}
                  </p>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showAddForm && (
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              Add New Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="goal"
                    className="text-sm font-medium text-gray-700"
                  >
                    Select Goal
                  </Label>
                  <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose a goal">
                        {selectedGoalDetails
                          ? selectedGoalDetails.title
                          : "Choose a goal"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {userGoals.map((goal) => {
                        const monthlyTarget = calculateMonthlyTarget(goal);
                        return (
                          <SelectItem
                            key={goal._id}
                            value={goal._id?.toString()}
                          >
                            {goal.title} (${monthlyTarget.toLocaleString()}
                            /month)
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {selectedGoalDetails && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {selectedGoalDetails.title}
                    </p>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>
                        Current: ${selectedGoalDetails.currentAmount || 0}
                      </span>
                      <span>Target: ${selectedGoalDetails.targetAmount}</span>
                    </div>
                    <Progress
                      value={
                        ((selectedGoalDetails.currentAmount || 0) /
                          selectedGoalDetails.targetAmount) *
                        100
                      }
                      className="h-2 mt-2"
                    />
                  </div>
                )}

                <div>
                  <Label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Contribution Amount ($)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={contributionAmount}
                    onChange={(e) =>
                      setContributionAmount(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    className="mt-1"
                    min="1"
                  />
                  {selectedGoalDetails && contributionAmount && (
                    <p className="text-xs text-gray-600 mt-1">
                      After contribution:{" "}
                      <span className="font-medium">
                        $
                        {(
                          (selectedGoalDetails.currentAmount || 0) +
                          parseFloat(contributionAmount)
                        ).toLocaleString()}
                      </span>{" "}
                      /{" "}
                      <span className="font-medium">
                        ${selectedGoalDetails.targetAmount.toLocaleString()}
                      </span>
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="method"
                    className="text-sm font-medium text-gray-700"
                  >
                    Payment Method
                  </Label>
                  <Select
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">
                        Bank Transfer
                      </SelectItem>
                      <SelectItem value="Auto-Debit">Auto-Debit</SelectItem>
                      <SelectItem value="Cash Deposit">Cash Deposit</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => {
                      setShowAddForm(false);
                      setSelectedGoal("");
                      setContributionAmount("");
                      setPaymentMethod("");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddContribution}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={
                      !selectedGoal ||
                      !contributionAmount ||
                      !paymentMethod ||
                      isContributing
                    }
                  >
                    Add Contribution
                  </Button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">
                  Goal Progress Overview
                </h4>
                <div className="space-y-3">
                  {userGoals.length === 0 ? (
                    <p className="text-sm text-gray-600 text-center py-4">
                      No goals available
                    </p>
                  ) : (
                    userGoals.map((goal) => (
                      <div
                        key={goal._id}
                        className={`p-3 bg-white rounded-lg border ${
                          selectedGoal === goal._id?.toString()
                            ? "border-blue-500 ring-2 ring-blue-100"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {goal.title}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>${goal.currentAmount || 0}</span>
                          <span>${goal.targetAmount}</span>
                        </div>
                        <Progress
                          value={
                            ((goal.currentAmount || 0) / goal.targetAmount) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg text-gray-900">
            Goal Contribution Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userGoals.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <p>
                No goals found. Create a goal to start tracking contributions.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {userGoals.map((goal) => {
                const monthlyTarget = calculateMonthlyTarget(goal);
                const progress =
                  ((goal.currentAmount || 0) / goal.targetAmount) * 100;

                return (
                  <div
                    key={goal._id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {goal.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Target: ${monthlyTarget.toLocaleString()}/month
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mt-1">
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-gray-900">
                          ${(goal.currentAmount || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Current</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-blue-600">
                          {Math.floor(progress)}%
                        </p>
                        <p className="text-xs text-gray-600">Complete</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold text-blue-600">
                          $
                          {(
                            goal.targetAmount - (goal.currentAmount || 0)
                          ).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-600">Remaining</p>
                      </div>
                    </div>

                    <Progress value={progress} className="h-3 mb-3" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Monthly target: ${monthlyTarget.toLocaleString()}
                      </span>
                      <Button
                        onClick={() => {
                          setSelectedGoal(goal._id?.toString());
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
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

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
            {contributions.map((contrib) => (
              <div
                key={contrib.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                    {getMethodIcon(contrib.method)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {contrib.goalName}
                    </p>
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
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
