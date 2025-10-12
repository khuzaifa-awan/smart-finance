"use client";

import { useState, useEffect } from "react";
import UserPreferencesForm from "./UserPreferencesForm";
import { generateBudgetRecommendations } from "../utils/openai";

export default function BudgetLimitComponent({ session }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [, setBudgetLimits] = useState({});
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = {
    income: ["salary", "investments", "part-time", "bonus", "others"],
    expenses: [
      "shopping",
      "food",
      "phone",
      "entertainment",
      "education",
      "beauty",
      "sports",
      "social",
      "transportation",
      "clothing",
      "car",
      "alcohol",
      "cigarettes",
      "electronics",
      "travel",
      "health",
      "pets",
      "repairs",
      "housing",
      "home",
      "gifts",
      "donations",
      "lottery",
      "snacks",
      "kids",
      "vegetables",
      "fruits",
      "others",
    ],
  };

  useEffect(() => {
    fetchBudgetLimits();
    fetchPreferences();
  }, []);

  const fetchBudgetLimits = async () => {
    try {
      const res = await fetch("/api/budget-limits");
      const data = await res.json();
      const limitsMap = {};
      data.forEach((limit) => {
        limitsMap[limit.category] = limit;
      });
      setBudgetLimits(limitsMap);
    } catch (error) {
      console.error("Error fetching budget limits:", error);
    }
  };

  // Add new state for checking if user has preferences
  const [hasPreferences, setHasPreferences] = useState(false);

  // Modify fetchPreferences to update hasPreferences
  const fetchPreferences = async () => {
    try {
      const res = await fetch("/api/user-preferences");
      const data = await res.json();
      setPreferences(data);
      setHasPreferences(!!data && Object.keys(data).length > 0);
    } catch (error) {
      console.error("Error fetching preferences:", error);
    }
  };

  const handleGenerateBudget = async () => {
    if (!preferences) {
      setShowPreferences(true);
      return;
    }

    if (selectedCategories.length === 0) {
      alert("Please select at least one category");
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);
      const res = await fetch("/api/budget-analysis");
      const historicalData = await res.json();

      if (!historicalData || Object.keys(historicalData).length === 0) {
        alert(
          "Please add some transactions first to get personalized recommendations."
        );
        setIsLoading(false);
        return;
      }

      const userData = {
        preferences,
        historicalData,
        selectedCategories,
      };

      const recommendations = await generateBudgetRecommendations(userData);
      setRecommendations(recommendations);
    } catch (error) {
      console.error("Error generating budget:", error);
      alert("Error generating budget recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Add this before the return statement
  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  // Add this after handleCategorySelection
  const handleAcceptRecommendations = async () => {
    if (!recommendations) return;

    try {
      // Save each recommendation as a budget limit
      for (const [category, amount] of Object.entries(recommendations)) {
        await fetch("/api/budget-limits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            limit: amount,
            period: "monthly",
            userId: session?.user?.id,
          }),
        });
      }

      // Update preferences to indicate AI-generated budget
      await fetch("/api/user-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...preferences,
          budgetSource: "AI_GENERATED",
        }),
      });

      alert("Budget recommendations have been saved!");
      fetchBudgetLimits();
      setRecommendations(null);
    } catch (error) {
      console.error("Error saving recommendations:", error);
      alert("Failed to save budget recommendations");
    }
  };

  // Move handleSubmit inside the component
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/budget-limits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          limit: parseFloat(limit),
          period,
          userId: session?.user?.id,
        }),
      });

      if (res.ok) {
        alert("Budget limit set successfully!");
        setLimit("");
        setSelectedCategory("");
        fetchBudgetLimits();
      } else {
        alert("Failed to set budget limit");
      }
    } catch (error) {
      console.error("Error setting budget limit:", error);
      alert("Error setting budget limit");
    }
  };

  // Update the JSX where the generate button is
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Budget Limits</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Set New Budget Limit</h2>
            <button
              onClick={() => setShowPreferences(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Change Preferences
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="">Select Category</option>
                {categories.expenses.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Period</label>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full border rounded-md p-2"
                required
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Limit Amount ($)
              </label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="w-full border rounded-md p-2"
                placeholder="Enter limit amount"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Set Budget Limit
            </button>
          </form>

          {!hasPreferences && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Add user information to generate budget using AI
              </p>
              <button
                onClick={() => setShowPreferences(true)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Add User Information
              </button>
            </div>
          )}
        </div>
        {showPreferences && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {preferences ? "Update" : "Add"} User Information
              </h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            <UserPreferencesForm
              initialData={preferences}
              onSubmit={async (data) => {
                try {
                  await fetch("/api/user-preferences", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  setPreferences(data);
                  setHasPreferences(true);
                  setShowPreferences(false);
                  alert("Preferences updated successfully!");
                } catch (error) {
                  console.error("Error saving preferences:", error);
                  alert("Error saving preferences. Please try again.");
                }
              }}
            />
          </div>
        )}

        {hasPreferences && !showPreferences && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Select Categories for Budget Recommendations
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {categories.expenses.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategorySelection(category)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleGenerateBudget}
              disabled={isLoading || selectedCategories.length === 0}
              className={`w-full ${
                isLoading || selectedCategories.length === 0
                  ? "bg-gray-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white px-6 py-3 rounded transition`}
            >
              {isLoading
                ? "⏳ Generating..."
                : "🤖 Generate AI Budget Recommendations"}
            </button>
          </div>
        )}

        {recommendations && (
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              AI Budget Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(recommendations).map(([category, amount]) => (
                <div key={category} className="p-4 bg-gray-50 rounded shadow">
                  <h3 className="font-medium capitalize">{category}</h3>
                  <p className="text-lg text-blue-600">
                    ${amount.toFixed(2)}/month
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleAcceptRecommendations}
              className="mt-6 w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              ✅ Accept Recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
