import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { FundamentalsTab } from "./tabs/FundamentalsTab";
import { ValuationTab } from "./tabs/ValuationTab";
import { NewsTab } from "./tabs/NewsTab";
import { PortfolioImpactTab } from "./tabs/PortfolioImpactTab";

export function MainContent({ stock, activeTab, onTabChange }) {
  return (
    <div className="h-full">
      <Tabs value={activeTab} onValueChange={onTabChange} className="h-full flex flex-col">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="valuation">Valuation</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Impact</TabsTrigger>
        </TabsList>
        
        <div className="flex-1 mt-6">
          <TabsContent value="overview" className="h-full m-0">
            <OverviewTab stock={stock} />
          </TabsContent>
          
          <TabsContent value="fundamentals" className="h-full m-0">
            <FundamentalsTab stock={stock} />
          </TabsContent>
          
          <TabsContent value="valuation" className="h-full m-0">
            <ValuationTab stock={stock} />
          </TabsContent>
          
          <TabsContent value="news" className="h-full m-0">
            <NewsTab stock={stock} />
          </TabsContent>
          
          <TabsContent value="portfolio" className="h-full m-0">
            <PortfolioImpactTab stock={stock} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}