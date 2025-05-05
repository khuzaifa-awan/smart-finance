"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
export default function AddDetailsComponent({ session }) {
  const [tab, setTab] = useState("income");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  // const router = useRouter();

  const incomeCategories = [
    "salary",
    "investments",
    "part-time",
    "bonus",
    "others",
  ];
  const expenseCategories = [
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
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/${tab}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: selectedCategory,
        amount: parseFloat(amount),
        userId: session?.user?.id,
        timestamp: new Date().toISOString(), // Add timestamp
      }),
    });

    if (res.ok) {
      alert(`${tab === "income" ? "Income" : "Expense"} added!`);
      setAmount("");
      setSelectedCategory("");
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 pr-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          Add Financial Details
        </h1>

        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setTab("income")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              tab === "income"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Income
          </button>
          <button
            onClick={() => setTab("expenses")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              tab === "expenses"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Expenses
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {(tab === "income" ? incomeCategories : expenseCategories).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`p-3 rounded shadow-sm transition text-sm font-medium capitalize ${
                  selectedCategory === cat
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 hover:bg-green-100"
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {selectedCategory && (
          <form onSubmit={handleSubmit} className="mt-6">
            <label className="block mb-2 text-gray-700 font-medium">
              Enter Amount for{" "}
              <span className="capitalize font-semibold text-blue-600">
                {selectedCategory}
              </span>
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount in USD"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
