
import React from "react";
import Link from "next/link";
import {
    Target,
    Bell,
    Settings,
    DollarSign,
    PlusCircle,
    TrendingUp,
    Eye,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function MainSidebar({
    activeTab,
    setActiveTab,
    notificationCount = 0,
    onToggleNotifications,
    onCreateNewGoal,
}) {
    const menuItems = [
        { id: "goals", label: "My Goals", icon: Target },
        { id: "contributions", label: "Contributions", icon: DollarSign },
        { id: "recommendations", label: "Saving Recommendations", icon: TrendingUp },
        { id: "view-recommendations", label: "View Recommendations", icon: Eye },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="w-64 bg-blue-900 text-white h-screen flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="font-semibold text-base leading-tight">
                            Goal Based Financial Planning
                        </h1>
                        <p className="text-xs text-white/70">Smart Goal Tracker</p>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="p-4 border-b border-white/10">
                <Button
                    onClick={onToggleNotifications}
                    className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white border-0"
                >
                    <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        <span>Notifications</span>
                    </div>
                    {notificationCount > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">
                            {notificationCount}
                        </Badge>
                    )}
                </Button>
                <p className="text-xs text-white/60 mt-2 px-2">
                    Goal achievements & alerts
                </p>
            </div>

            {/* Create Goal */}
            <div className="p-4 border-b border-white/10">
                <Button
                    onClick={onCreateNewGoal}
                    className="w-full bg-white text-blue-900 hover:bg-white/90"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Create New Goal
                </Button>
               <Link href="/home">
                <Button
                        className="w-full mt-4 bg-white text-blue-900 hover:bg-white/90"
                >
                    Home
                </Button>
                </Link>
                <p className="text-xs text-white/60 mt-2 px-1">
                    Create goals like &quot;Buy a Laptop&quot;
                </p>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-white/70 mb-3 px-3">
                    Goal Planning
                </p>

                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${isActive
                                ? "bg-white/10 text-white"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 text-center">
                <p className="text-xs text-white/50">Goal Planning System v2.0</p>
                <p className="text-xs text-white/30">Achieve Your Financial Dreams</p>
            </div>
        </div>
    );
}


