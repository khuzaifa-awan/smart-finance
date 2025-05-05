// pages/home.js
import clientPromise from "@/utils/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { signOut } from "next-auth/react";
import Link from "next/link";
import BudgetAlertButton from "../components/BudgetAlertButton";
import FinancialCharts from "../components/FinancialCharts";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

// Add this function before getServerSideProps
function processTimelineData(expenses) {
  const dayData = {};
  const monthData = {};
  const yearData = {};

  expenses.forEach((expense) => {
    // Skip if timestamp is invalid
    if (!expense.timestamp) return;

    try {
      const date = new Date(expense.timestamp);

      // Validate if date is valid
      if (isNaN(date.getTime())) return;

      // Daily format: YYYY-MM-DD
      const dayKey = date.toISOString().split("T")[0];
      dayData[dayKey] = (dayData[dayKey] || 0) + expense.amount;

      // Monthly format: YYYY-MM
      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      monthData[monthKey] = (monthData[monthKey] || 0) + expense.amount;

      // Yearly format: YYYY
      const yearKey = date.getFullYear().toString();
      yearData[yearKey] = (yearData[yearKey] || 0) + expense.amount;
    } catch (error) {
      console.error("Error processing expense:", expense);
      return; // Skip this expense if there's an error
    }
  });

  return {
    day: {
      labels: Object.keys(dayData),
      data: Object.values(dayData),
    },
    month: {
      labels: Object.keys(monthData),
      data: Object.values(monthData),
    },
    year: {
      labels: Object.keys(yearData),
      data: Object.values(yearData),
    },
  };
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const client = await clientPromise;
  const db = client.db();
  const userId = session.user.id;
  const userIdString = userId.toString();

  // Fetch budget limits (combined query)
  const budgetLimits = await db
    .collection("budgetlimits")
    .find({}) // Fetch all records first
    .toArray();

  // console.log("All budget limits:", budgetLimits);

  // Filter after fetching
  const filteredBudgetLimits = budgetLimits.filter((limit) =>
    limit.userId.toString().includes(userId.toString())
  );

  // console.log("Filtered budget limits:", filteredBudgetLimits);
  // console.log("Raw userId from session:", userId);
  // console.log("Budget limits query result:", budgetLimits);

  // Get current month's expenses
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  // Debug logs
  console.log("Querying for userId:", userIdString);
  console.log("Start of month:", startOfMonth);

  const expenses = await db
    .collection("expenses")
    .aggregate([
      {
        $match: {
          userId: userIdString, // Make sure this matches the format in your expenses collection
          timestamp: {
            $gte: startOfMonth,
            $type: "date", // Ensure timestamp is treated as a date
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ])
    .toArray();

  console.log("Grouped expenses:", expenses);
  console.log("Budget limits:", budgetLimits);

  // Compare expenses with limits
  const exceededLimits = [];
  expenses.forEach((expense) => {
    const limit = budgetLimits.find((l) => l.category === expense._id);
    console.log(
      `Comparing category ${expense._id}: spent ${expense.total} vs limit ${limit?.limit}`
    );
    if (limit && expense.total > limit.limit) {
      exceededLimits.push({
        category: expense._id,
        spent: expense.total,
        limit: limit.limit,
      });
    }
  });

  console.log("Exceeded limits:", exceededLimits);

  // Get categorized expense data for the current month only
  const categorizedExpenses = await db
    .collection("expenses")
    .aggregate([
      {
        $match: {
          userId,
          timestamp: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ])
    .toArray();

  const incomeData = await db
    .collection("budgets")
    .aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])
    .toArray();

  const expenseData = await db
    .collection("expenses")
    .aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ])
    .toArray();

  const totalIncome = incomeData[0]?.total || 0;
  const totalExpenses = expenseData[0]?.total || 0;
  const remainingBudget = totalIncome - totalExpenses;

  // Get categorized income data
  const categorizedIncome = await db
    .collection("budgets")
    .aggregate([
      { $match: { userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ])
    .toArray();

  // Get expense timeline data
  const timelineExpenses = await db
    .collection("expenses")
    .find({ userId })
    .sort({ timestamp: 1 })
    .toArray();

  const expenseTimeline = processTimelineData(timelineExpenses);

  return {
    props: {
      totalIncome,
      totalExpenses,
      remainingBudget,
      categorizedIncome,
      categorizedExpenses,
      expenseTimeline,
      exceededLimits: JSON.parse(JSON.stringify(exceededLimits)),
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}

export default function HomePage({
  totalIncome,
  totalExpenses,
  remainingBudget,
  categorizedIncome, // Change from incomeData
  categorizedExpenses, // Change from expenseData
  expenseTimeline,
  exceededLimits,
  session,
}) {
  // Transform categorized data into the format expected by FinancialCharts
  const incomeData = {};
  const expenseData = {};

  categorizedIncome?.forEach((item) => {
    incomeData[item._id] = item.total;
  });

  categorizedExpenses?.forEach((item) => {
    expenseData[item._id] = item.total;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="ml-64 flex-1 p-8 flex flex-col">
        <h1 className="text-4xl font-bold text-blue-800 mb-8">Dashboard</h1>

        <BudgetAlertButton exceededLimits={exceededLimits || []} />

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-green-500">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Income
            </h2>
            <p className="text-2xl font-bold text-green-600 mt-2">
              ${totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-red-500">
            <h2 className="text-lg font-semibold text-gray-600">
              Total Expenses
            </h2>
            <p className="text-2xl font-bold text-red-600 mt-2">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 border-t-4 border-blue-500">
            <h2 className="text-lg font-semibold text-gray-600">
              Remaining Budget
            </h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              ${remainingBudget.toFixed(2)}
            </p>
          </div>
        </section>
        {/* <div className="mb-6">
          <Link href="/budget-limits">
            <button className="bg-purple-600 text-white px-6 py-3 rounded hover:bg-purple-700 transition">
              💰 Manage Budget Limits
            </button>
          </Link>
        </div> */}
        <FinancialCharts
          incomeData={incomeData}
          expenseData={expenseData}
          expenseTimeline={expenseTimeline}
        />
      </div>
    </div>
  );
}
