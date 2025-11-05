import { useState } from "react";
import { Header } from "../components/Header";
import { StockOverview } from "../components/StockOverview";
import { MainContent } from "../components/MainContent";
import { NewsAndMacro } from "../components/NewsAndMacro";
import { Footer } from "../components/FooterK";

export function FundamentalAnalysis() {
  const [selectedStock, setSelectedStock] = useState({
    symbol: "AAPL",
    companyName: "Apple Inc.",
  });
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onStockSelect={setSelectedStock} />

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Left Column - Stock Overview (40%) */}
          <div className="col-span-5">
            <StockOverview stock={selectedStock} />
          </div>

          {/* Center Column - Fundamentals & Valuation (40%) */}
          <div className="col-span-7">
            <MainContent
              stock={selectedStock}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
