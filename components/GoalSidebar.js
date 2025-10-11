
import React from 'react';
import {
    Home,
    Target,
    PieChart,
    TrendingUp,
    CreditCard,
    Settings,
    User,
} from 'lucide-react';

// ✅ Check that lucide-react is installed
// Run in terminal if not: npm install lucide-react

export default function GoalSidebar({ activeTab, setActiveTab }) {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'goals', label: 'My Goals', icon: Target },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'analytics', label: 'Analytics', icon: PieChart },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
    ];

    const footerItems = [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'profile', label: 'Profile', icon: User },
    ];

    // ✅ If no props provided (to avoid crashes)
    const handleTabChange = (tab) => {
        if (typeof setActiveTab === 'function') {
            setActiveTab(tab);
        } else {
            console.warn('setActiveTab is not defined');
        }
    };

    return (
        <div className="w-64 !bg-blue-900 text-white h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg">Finance</h1>
                        <p className="text-white/70 text-sm">Goal Planning</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-1">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <div className="space-y-1">
                    {footerItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleTabChange(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${isActive
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
