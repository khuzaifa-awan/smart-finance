import React from 'react';
import {
    Home,
    PieChart,
    Target,
    CreditCard,
    TrendingUp,
    Brain,
    Settings,
    LogOut,
    DollarSign
} from 'lucide-react';
import { Button } from './ui/button';

export default function SidebarF({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'budget', label: 'Budget', icon: PieChart },
        { id: 'investments', label: 'Investments', icon: TrendingUp },
        { id: 'goals', label: 'Goals', icon: Target },
        { id: 'expenses', label: 'Expenses', icon: CreditCard },
        { id: 'insights', label: 'AI Insights', icon: Brain },
    ];

    return (
        <div className="w-64 bg-card border-r border-border h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-border">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <div>
                        <h1 className="font-semibold">FinanceAI</h1>
                        <p className="text-sm text-muted-foreground">Smart Advisor</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Button
                                key={item.id}
                                variant={activeTab === item.id ? 'default' : 'ghost'}
                                className="w-full justify-start gap-3"
                                onClick={() => setActiveTab(item.id)}
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </Button>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
                <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3">
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}
