import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { StockOverview } from "../components/StockOverview";
import { MainContent } from "../components/MainContent";
import { Footer } from "../components/FooterK";

export function FundamentalAnalysis() {
  const [selectedStock, setSelectedStock] = useState({
    symbol: "AAPL",
    companyName: "Apple Inc.",
  });
  const [activeTab, setActiveTab] = useState("overview");

  // Sequential Stock Data Fetching
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function fetchAllStockData() {
      setLoading(true);
      setError(null);
      try {
        // Step 1: Profile
        const profileRes = await fetch(
          `/api/stocks/profile?ticker=${selectedStock.symbol}`
        );
        if (!profileRes.ok) throw new Error("Profile request failed");
        const profileJson = await profileRes.json();
        const profile = profileJson.data;

        // Step 2: Overview
        const overviewRes = await fetch(
          `/api/stocks/overview?ticker=${selectedStock.symbol}`
        );
        if (!overviewRes.ok) throw new Error("Overview request failed");
        const overviewJson = await overviewRes.json();
        const overview = overviewJson.data;

        // Step 3: Indicators
        const indicatorsRes = await fetch(
          `/api/stocks/indicators?ticker=${selectedStock.symbol}`
        );
        if (!indicatorsRes.ok) throw new Error("Indicators request failed");
        const indicatorsJson = await indicatorsRes.json();
        const indicators = indicatorsJson.data;

        // Merge all data
        if (!ignore) {
          setStockData({ ...profile, ...overview, ...indicators });
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      }
    }
    fetchAllStockData();
    return () => {
      ignore = true;
    };
  }, [selectedStock]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onStockSelect={setSelectedStock} />
      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-full">
          <div className="col-span-5">
            <StockOverview
              stock={stockData}
              loading={loading}
              error={error}
              setStock={setSelectedStock}
            />
          </div>
          <div className="col-span-7">
            <MainContent
              stock={stockData}
              loading={loading}
              error={error}
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
