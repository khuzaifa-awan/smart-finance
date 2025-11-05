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
