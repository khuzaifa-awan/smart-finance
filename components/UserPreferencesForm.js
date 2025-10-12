"use client";
import { useState } from "react";

export default function UserPreferencesForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    age: initialData.age || "",
    location: initialData.location || "",
    dependents: initialData.dependents || 0,
    occupation: initialData.occupation || "",
    cityTier: initialData.cityTier || "",
    education: initialData.education || 0,
    desiredSavingsPercentage: initialData.desiredSavingsPercentage || "",
    monthlyFixedExpenses: initialData.monthlyFixedExpenses || 0,
    savingsGoal: initialData.savingsGoal || 0,
  });

  const cityTiers = ["Tier 1", "Tier 2", "Tier 3"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) =>
            setFormData({ ...formData, age: parseInt(e.target.value) })
          }
          className="w-full border rounded-md p-2"
          min="18"
          max="100"
          required
        />
      </div>

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
        <label className="block text-gray-700 mb-2">Occupation</label>
        <input
          type="text"
          value={formData.occupation}
          onChange={(e) =>
            setFormData({ ...formData, occupation: e.target.value })
          }
          className="w-full border rounded-md p-2"
          placeholder="e.g., Software Engineer, Teacher, Doctor"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">City Tier</label>
        <div className="grid grid-cols-3 gap-3">
          {cityTiers.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => setFormData({ ...formData, cityTier: tier })}
              className={`p-3 rounded shadow-sm transition font-medium ${
                formData.cityTier === tier
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Years of Education</label>
        <input
          type="number"
          value={formData.education}
          onChange={(e) =>
            setFormData({ ...formData, education: parseInt(e.target.value) })
          }
          className="w-full border rounded-md p-2"
          placeholder="Total years of formal education"
          min="0"
          max="30"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">
          Desired Savings Percentage (%)
        </label>
        <input
          type="number"
          value={formData.desiredSavingsPercentage}
          onChange={(e) =>
            setFormData({
              ...formData,
              desiredSavingsPercentage: parseFloat(e.target.value),
            })
          }
          className="w-full border rounded-md p-2"
          placeholder="e.g., 20 for 20%"
          min="0"
          max="100"
          step="0.1"
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
