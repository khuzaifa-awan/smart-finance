"use client";
import { useState } from "react";

export default function UserPreferencesForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    location: initialData.location || "",
    dependents: initialData.dependents || 0,
    monthlyFixedExpenses: initialData.monthlyFixedExpenses || 0,
    savingsGoal: initialData.savingsGoal || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="w-full border rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Number of Dependents</label>
        <input
          type="number"
          value={formData.dependents}
          onChange={(e) =>
            setFormData({ ...formData, dependents: parseInt(e.target.value) })
          }
          className="w-full border rounded-md p-2"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Monthly Fixed Expenses ($)
        </label>
        <input
          type="number"
          value={formData.monthlyFixedExpenses}
          onChange={(e) =>
            setFormData({
              ...formData,
              monthlyFixedExpenses: parseFloat(e.target.value),
            })
          }
          className="w-full border rounded-md p-2"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Monthly Savings Goal ($)
        </label>
        <input
          type="number"
          value={formData.savingsGoal}
          onChange={(e) =>
            setFormData({
              ...formData,
              savingsGoal: parseFloat(e.target.value),
            })
          }
          className="w-full border rounded-md p-2"
          min="0"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Save Preferences
      </button>
    </form>
  );
}
