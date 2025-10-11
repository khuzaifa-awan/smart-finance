import { TrendingUp, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { cn } from "./ui/utils";

export function Sidebar({ currentPage, onNavigate }) {
  const [fundamentalExpanded, setFundamentalExpanded] = useState(true);

  return (
    <div className="w-[200px] bg-blue-900 min-h-screen flex flex-col text-white">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6" />
          <span className="font-semibold">Finance</span>
        </div>
         <Link href="/home">
          <div className="flex items-center space-x-3 p-3 rounded-md mb-4 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
            <AiOutlineHome size={24} />
            <span>Home</span>
          </div>
        </Link>

        <nav className="space-y-2">
          <div>
            <button
              onClick={() => setFundamentalExpanded(!fundamentalExpanded)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                currentPage.startsWith("fundamental")
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm flex-1 text-left">Fundamental Analysis</span>
              {fundamentalExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {fundamentalExpanded && (
              <div className="ml-7 mt-1 space-y-1">
                <button
                  onClick={() => onNavigate("fundamental-dashboard")}
                  className={cn(
                    "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                    currentPage === "fundamental-dashboard"
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate("fundamental-analysis")}
                  className={cn(
                    "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                    currentPage === "fundamental-analysis"
                      ? "bg-white/10 text-white"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  Stock Analysis
                </button>
              </div>
            )}
          </div>
          <button
             onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}