import { useState } from "react";
import { FiInfo } from "react-icons/fi";

export default function BudgetAlertButton({ exceededLimits }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!exceededLimits || exceededLimits.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative ${
          isOpen ? "hidden" : "flex"
        } items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 transition-all duration-300 animate-glow`}
      >
        <FiInfo size={24} />
      </button>

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-4 w-80 animate-slideIn">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Budget Alerts
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="space-y-3">
            {exceededLimits.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-red-50 border border-red-200 rounded-md"
              >
                <p className="text-red-700 font-medium capitalize">
                  {item.category}
                </p>
                <p className="text-sm text-red-600">
                  Spent: ${item.spent.toFixed(2)} / Limit: $
                  {item.limit.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
