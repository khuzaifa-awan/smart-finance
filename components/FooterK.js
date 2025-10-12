import { Plus, Bell, Download, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Disclaimer */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AlertTriangle className="h-4 w-4" />
            <span>Not financial advice. Data from PSX & public sources.</span>
          </div>

          {/* Right side - Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add to Portfolio</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Set Alert</span>
            </Button>
            
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}