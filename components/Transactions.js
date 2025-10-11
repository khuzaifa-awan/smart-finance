"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import {
    Search,
    Download,
    Plus,
    ArrowUpRight,
    ArrowDownLeft,
    DollarSign,
    Home,
    Car,
    Heart,
    Plane,
    GraduationCap,
    MoreHorizontal,
    Edit,
} from "lucide-react";

const transactions = [
    {
        id: 1,
        type: "contribution",
        title: "Emergency Fund Contribution",
        description: "Monthly automated savings",
        amount: 800,
        date: "2024-07-15",
        goal: "Emergency Fund",
        category: "Savings",
        status: "completed",
        icon: Heart,
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        id: 2,
        type: "contribution",
        title: "House Down Payment",
        description: "Weekly transfer",
        amount: 300,
        date: "2024-07-14",
        goal: "House Fund",
        category: "Savings",
        status: "completed",
        icon: Home,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        id: 3,
        type: "withdrawal",
        title: "Car Fund Withdrawal",
        description: "Down payment for vehicle",
        amount: -5000,
        date: "2024-07-12",
        goal: "Car Fund",
        category: "Goal Completion",
        status: "completed",
        icon: Car,
        color: "text-red-600",
        bgColor: "bg-red-50",
    },
    {
        id: 4,
        type: "contribution",
        title: "Vacation Fund",
        description: "Travel savings",
        amount: 250,
        date: "2024-07-10",
        goal: "European Trip",
        category: "Savings",
        status: "completed",
        icon: Plane,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
    {
        id: 5,
        type: "contribution",
        title: "Education Fund",
        description: "Course enrollment payment",
        amount: 1200,
        date: "2024-07-08",
        goal: "Education",
        category: "Investment",
        status: "completed",
        icon: GraduationCap,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
    },
    {
        id: 6,
        type: "contribution",
        title: "Emergency Fund",
        description: "Bonus allocation",
        amount: 500,
        date: "2024-07-05",
        goal: "Emergency Fund",
        category: "Bonus",
        status: "completed",
        icon: Heart,
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        id: 7,
        type: "adjustment",
        title: "Goal Rebalancing",
        description: "Portfolio adjustment",
        amount: 0,
        date: "2024-07-03",
        goal: "Multiple Goals",
        category: "Adjustment",
        status: "completed",
        icon: DollarSign,
        color: "text-gray-600",
        bgColor: "bg-gray-50",
    },
    {
        id: 8,
        type: "contribution",
        title: "House Fund",
        description: "Extra contribution",
        amount: 750,
        date: "2024-07-01",
        goal: "House Fund",
        category: "Savings",
        status: "pending",
        icon: Home,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
];

const categories = ["All", "Savings", "Investment", "Goal Completion", "Bonus", "Adjustment"];
const statuses = ["All", "Completed", "Pending", "Failed"];

export default function Transactions() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedStatus, setSelectedStatus] = useState("All");

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.goal.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === "All" || transaction.category === selectedCategory;
        const matchesStatus =
            selectedStatus === "All" || transaction.status === selectedStatus.toLowerCase();
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalIn = transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const totalOut = Math.abs(
        transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)
    );

    const netFlow = totalIn - totalOut;

    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                        Completed
                    </Badge>
                );
            case "pending":
                return (
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                        Pending
                    </Badge>
                );
            case "failed":
                return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
                    <p className="text-gray-600 mt-1">
                        Track all your goal-related financial activities
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Transaction
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total In */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Contributions</p>
                                <p className="text-2xl font-semibold text-green-600 mt-1">
                                    +${totalIn.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">This month</p>
                            </div>
                            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                                <ArrowUpRight className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Total Out */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Withdrawals</p>
                                <p className="text-2xl font-semibold text-red-600 mt-1">
                                    -${totalOut.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">This month</p>
                            </div>
                            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                                <ArrowDownLeft className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Net Flow */}
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Net Flow</p>
                                <p
                                    className={`text-2xl font-semibold mt-1 ${netFlow >= 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {netFlow >= 0 ? "+" : "-"}${Math.abs(netFlow).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">This month</p>
                            </div>
                            <div
                                className={`w-12 h-12 rounded-lg flex items-center justify-center ${netFlow >= 0 ? "bg-green-50" : "bg-red-50"
                                    }`}
                            >
                                <DollarSign
                                    className={`w-6 h-6 ${netFlow >= 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        <div className="flex gap-2">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {statuses.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Transactions List */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg text-gray-900">
                        Recent Transactions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {filteredTransactions.map((transaction) => {
                            const Icon = transaction.icon;
                            return (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 ${transaction.bgColor} rounded-lg flex items-center justify-center`}
                                        >
                                            <Icon className={`w-6 h-6 ${transaction.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {transaction.title}
                                                </h3>
                                                {getStatusBadge(transaction.status)}
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {transaction.description}
                                            </p>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                                <span>Goal: {transaction.goal}</span>
                                                <span>Category: {transaction.category}</span>
                                                <span>{new Date(transaction.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p
                                                className={`font-semibold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                {transaction.amount >= 0 ? "+" : "-"}$
                                                {Math.abs(transaction.amount).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-500 capitalize">
                                                {transaction.type}
                                            </p>
                                        </div>

                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filteredTransactions.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500">
                                    No transactions found matching your criteria
                                </p>
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedCategory("All");
                                        setSelectedStatus("All");
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
