"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
    User,
    MapPin,
    Edit,
    Camera,
    Award,
    TrendingUp,
    Target,
    CheckCircle,
    Star,
    Trophy,
    Zap,
    DollarSign,
} from "lucide-react";

const achievements = [
    {
        id: 1,
        title: "First Goal Completed",
        description: "Successfully reached your first financial goal",
        icon: CheckCircle,
        color: "text-green-600",
        bgColor: "bg-green-100",
        earned: true,
        date: "2024-06-15",
    },
    {
        id: 2,
        title: "Savings Streak",
        description: "Saved money for 30 consecutive days",
        icon: Star,
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        earned: true,
        date: "2024-07-01",
    },
    {
        id: 3,
        title: "Goal Achiever",
        description: "Completed 3 financial goals",
        icon: Trophy,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        earned: false,
        progress: 1,
        target: 3,
    },
    {
        id: 4,
        title: "Super Saver",
        description: "Saved over $50,000 total",
        icon: DollarSign,
        color: "text-purple-600",
        bgColor: "bg-purple-100",
        earned: false,
        progress: 32000,
        target: 50000,
    },
    {
        id: 5,
        title: "Early Bird",
        description: "Completed a goal ahead of schedule",
        icon: Zap,
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        earned: true,
        date: "2024-05-20",
    },
];

const stats = [
    { label: "Goals Completed", value: "1", subtext: "All time" },
    { label: "Total Saved", value: "$65,500", subtext: "Lifetime" },
    { label: "Streak", value: "45 days", subtext: "Current" },
    { label: "Member Since", value: "Jan 2024", subtext: "6 months" },
];

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        birthDate: "1990-05-15",
        occupation: "Software Engineer",
        income: "120000",
    });

    const handleInputChange = (field, value) => {
        setProfileData((prev) => ({ ...prev, [field]: value }));
    };

    const completedAchievements = achievements.filter((a) => a.earned).length;
    const totalAchievements = achievements.length;
    const achievementProgress = (completedAchievements / totalAchievements) * 100;

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
                    <p className="text-gray-600 mt-1">
                        Manage your personal information and view your achievements
                    </p>
                </div>
                <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                                <User className="w-5 h-5" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-6 mb-6">
                                <div className="relative">
                                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
                                        <User className="w-10 h-10 text-purple-600" />
                                    </div>
                                    <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
                                        <Camera className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {profileData.firstName} {profileData.lastName}
                                    </h3>
                                    <p className="text-gray-600">{profileData.occupation}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {profileData.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "firstName",
                                    "lastName",
                                    "email",
                                    "phone",
                                    "location",
                                    "birthDate",
                                    "occupation",
                                    "income",
                                ].map((field, idx) => (
                                    <div key={idx}>
                                        <Label
                                            htmlFor={field}
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {field
                                                .replace(/([A-Z])/g, " $1")
                                                .replace(/^./, (str) => str.toUpperCase())}
                                        </Label>
                                        <Input
                                            id={field}
                                            type={
                                                field === "email"
                                                    ? "email"
                                                    : field === "birthDate"
                                                        ? "date"
                                                        : field === "income"
                                                            ? "number"
                                                            : "text"
                                            }
                                            value={profileData[field]}
                                            onChange={(e) => handleInputChange(field, e.target.value)}
                                            disabled={!isEditing}
                                            className="mt-1"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Achievements */}
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between text-lg text-gray-900">
                                <div className="flex items-center gap-2">
                                    <Award className="w-5 h-5" />
                                    Achievements
                                </div>
                                <Badge className="bg-purple-100 text-purple-800">
                                    {completedAchievements}/{totalAchievements}
                                </Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">
                                        Achievement Progress
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {achievementProgress.toFixed(0)}%
                                    </span>
                                </div>
                                <Progress value={achievementProgress} className="h-2" />
                            </div>

                            <div className="space-y-4">
                                {achievements.map((achievement) => {
                                    const Icon = achievement.icon;
                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`p-4 rounded-lg border ${achievement.earned
                                                    ? "border-green-200 bg-green-50"
                                                    : "border-gray-200 bg-gray-50"
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-10 h-10 ${achievement.bgColor} rounded-lg flex items-center justify-center`}
                                                    >
                                                        <Icon
                                                            className={`w-5 h-5 ${achievement.color}`}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {achievement.title}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {achievement.description}
                                                        </p>
                                                        {achievement.earned && achievement.date && (
                                                            <p className="text-xs text-green-600 mt-1">
                                                                Earned on{" "}
                                                                {new Date(
                                                                    achievement.date
                                                                ).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                        {!achievement.earned &&
                                                            achievement.progress !== undefined && (
                                                                <div className="mt-2">
                                                                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                                        <span>Progress</span>
                                                                        <span>
                                                                            {achievement.progress}/{achievement.target}
                                                                        </span>
                                                                    </div>
                                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                                        <div
                                                                            className="bg-blue-600 h-1.5 rounded-full"
                                                                            style={{
                                                                                width: `${Math.min(
                                                                                    (achievement.progress /
                                                                                        achievement.target) *
                                                                                    100,
                                                                                    100
                                                                                )}%`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                                {achievement.earned && (
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Stats */}
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                                <TrendingUp className="w-5 h-5" />
                                Your Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="text-center p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">
                                            {stat.label}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {stat.subtext}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Financial Health */}
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                                <Target className="w-5 h-5" />
                                Financial Health
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center mb-4">
                                <div className="text-3xl font-bold text-green-600 mb-1">92</div>
                                <div className="text-sm text-gray-600">Excellent Score</div>
                            </div>
                            <div className="space-y-3">
                                <Progress value={38} className="h-2" />
                                <Progress value={74} className="h-2" />
                                <Progress value={95} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-900">
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <Target className="w-4 h-4 mr-2" />
                                Create New Goal
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Add Transaction
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View Analytics
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

