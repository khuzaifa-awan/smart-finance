"use client";
import { useState, useEffect } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

export default function FinancialCharts({
  incomeData,
  expenseData,
  expenseTimeline,
}) {
  const [timeRange, setTimeRange] = useState("day");

  const incomeChartData = {
    labels: Object.keys(incomeData),
    datasets: [
      {
        data: Object.values(incomeData),
        backgroundColor: [
          "#2563eb",
          "#7c3aed",
          "#db2777",
          "#ea580c",
          "#16a34a",
        ],
        borderWidth: 1,
      },
    ],
  };

  const expenseChartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        data: Object.values(expenseData),
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#84cc16",
          "#06b6d4",
          "#6366f1",
          "#a855f7",
          "#ec4899",
        ],
        borderWidth: 1,
      },
    ],
  };

  const timelineData = {
    labels: expenseTimeline[timeRange].labels,
    datasets: [
      {
        label: "Expenses",
        data: expenseTimeline[timeRange].data,
        borderColor: "#3b82f6",
        tension: 0.1,
      },
    ],
  };

  return (
    <section className="mt-12 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Income Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Income Distribution</h3>
          <div className="w-2/4 mx-auto">
            {" "}
            {/* Added wrapper div for size control */}
            <Doughnut data={incomeChartData} options={{ cutout: "80%" }} />
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>
          <div className="w-2/4 mx-auto">
            {" "}
            {/* Added wrapper div for size control */}
            <Doughnut data={expenseChartData} options={{ cutout: "80%" }} />
          </div>
        </div>

        {/* Expense Timeline */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Expense Timeline</h3>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border rounded p-1"
            >
              <option value="day">Daily</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>
          </div>
          <Line data={timelineData} />
        </div>
      </div>
    </section>
  );
}
