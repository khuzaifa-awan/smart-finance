// import { useState } from "react";
// import { Header } from "../components/Header";
// import { StockOverview } from "../components/StockOverview";
// import { MainContent } from "../components/MainContent";
// import { NewsAndMacro } from "../components/NewsAndMacro";
// import { Footer } from "../components/FooterK";

// // Mock stock data
// const mockStockData = {
//   symbol: "ENGRO",
//   companyName: "Engro Corporation Limited",
//   currentPrice: 255.40,
//   dailyChange: 5.60,
//   dailyChangePercent: 2.24,
//   volume: "2.1M",
//   marketCap: "PKR 45.2B",
//   sector: "Chemicals",
//   logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center",
//   description: "Engro Corporation is a Pakistani conglomerate company headquartered in Karachi. The company primarily operates in the fertilizer, petrochemical, food, and telecommunications sectors.",
//   competitors: ["Fauji Fertilizer", "Fatima Fertilizer", "FFC Energy"],
//   ceo: "Ghias Khan",
//   ceoReputation: 8.5,
//   pe: 12.5,
//   eps: 20.43,
//   roe: 15.2,
//   debtEquity: 0.45,
//   dividendYield: 4.2,
//   industryAvgPE: 15.2,
//   industryAvgROE: 12.8,
//   industryAvgDebtEquity: 0.52
// };

// export default function App() {
//   const [selectedStock, setSelectedStock] = useState(mockStockData);
//   const [activeTab, setActiveTab] = useState("overview");

//   return (
//     <div className="min-h-screen bg-background flex flex-col">
//       <Header onStockSelect={setSelectedStock} />
      
//       <main className="flex-1 max-w-[1440px] mx-auto w-full px-4 md:px-6 py-6">
//         <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 h-full">
//           {/* Left Column - Stock Overview (40%) */}
//           <div className="lg:col-span-4">
//             <StockOverview stock={selectedStock} />
//           </div>
          
//           {/* Center Column - Fundamentals & Valuation (40%) */}
//           <div className="lg:col-span-4">
//             <MainContent 
//               stock={selectedStock} 
//               activeTab={activeTab} 
//               onTabChange={setActiveTab} 
//             />
//           </div>
          
//           {/* Right Column - News & Macro (20%) */}
//           <div className="lg:col-span-2">
//             <NewsAndMacro stock={selectedStock} />
//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }



import { useState } from "react";
import { Sidebar } from "../components/SidebarK";
import { FundamentalDashboard } from "../components/FundamentalDashboard";
import { FundamentalAnalysis } from "../components/FundamentalAnalysis";

export default function App() {
  const [currentPage, setCurrentPage] = useState("fundamental-dashboard");

  const handleNavigation = (page) => {
    if (page === "logout") {
      // Handle logout logic here
      console.log("Logout clicked");
      return;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "fundamental-dashboard":
        return <FundamentalDashboard />;
      case "fundamental-analysis":
        return <FundamentalAnalysis />;
      default:
        return <FundamentalDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigation} />
      {renderPage()}
    </div>
  );
}