import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PlusCircle, CheckCircle, AlertCircle, TrendingUp, Bell } from 'lucide-react';

// ---- Initial Data ----
const initialGoals = [
    {
        id: 1,
        title: 'Emergency Fund',
        target: 25000,
        current: 15000,
        deadline: '2025-12-31',
        status: 'on-track',
    },
    {
        id: 2,
        title: 'Buy a Laptop',
        target: 2000,
        current: 1000,
        deadline: '2025-05-30',
        status: 'behind',
    },
];

// ---- Main Component ----
export default function GoalPlanningModule() {
    const [goals, setGoals] = useState(initialGoals);
    const [showForm, setShowForm] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [newGoal, setNewGoal] = useState({
        title: '',
        target: '',
        deadline: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGoal({ ...newGoal, [name]: value });
    };

    const handleAddGoal = () => {
        if (!newGoal.title || !newGoal.target || !newGoal.deadline) {
            alert('Please fill all fields.');
            return;
        }

        const goal = {
            id: Date.now(),
            title: newGoal.title,
            target: parseInt(newGoal.target),
            current: 0,
            deadline: newGoal.deadline,
            status: 'on-track',
        };

        setGoals([...goals, goal]);
        setNotifications([
            ...notifications,
            {
                id: Date.now(),
                message: `New goal "${newGoal.title}" created successfully!`,
                type: 'success',
                date: new Date().toLocaleDateString(),
            },
        ]);

        setNewGoal({ title: '', target: '', deadline: '' });
        setShowForm(false);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'on-track':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'behind':
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            case 'completed':
                return <CheckCircle className="w-4 h-4 text-green-600" />;
            default:
                return <AlertCircle className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900">Goal Planning</h1>
                    <p className="text-gray-600 mt-1">Track and plan your savings goals</p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-900 hover:bg-blue-700 text-white"
                >
                    <PlusCircle className="w-4 h-4 mr-2" /> {showForm ? 'Cancel' : 'Add Goal'}
                </Button>
            </div>

            {/* Add Goal Form */}
            {showForm && (
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Create a New Goal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Goal Title</Label>
                            <Input
                                name="title"
                                value={newGoal.title}
                                onChange={handleInputChange}
                                placeholder="Enter goal name"
                            />
                        </div>
                        <div>
                            <Label>Target Amount ($)</Label>
                            <Input
                                type="number"
                                name="target"
                                value={newGoal.target}
                                onChange={handleInputChange}
                                placeholder="Enter amount"
                            />
                        </div>
                        <div>
                            <Label>Deadline</Label>
                            <Input
                                type="date"
                                name="deadline"
                                value={newGoal.deadline}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button
                            onClick={handleAddGoal}
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                        >
                            Save Goal
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Notifications */}
            {notifications.length > 0 && (
                <Card className="border-l-4 border-l-blue-500 bg-blue-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-900">
                            <Bell className="w-5 h-5" /> Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {notifications.map((note) => (
                            <div
                                key={note.id}
                                className="p-3 rounded-lg bg-green-100 border border-green-200"
                            >
                                <p className="text-sm text-green-800">{note.message}</p>
                                <p className="text-xs text-gray-600 mt-1">{note.date}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Goals List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {goals.map((goal) => {
                    const progress = (goal.current / goal.target) * 100;
                    return (
                        <Card key={goal.id} className="border border-gray-200">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between text-gray-900">
                                    {goal.title}
                                    {getStatusIcon(goal.status)}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>${goal.current.toLocaleString()}</span>
                                    <span>${goal.target.toLocaleString()}</span>
                                </div>
                                <Progress value={progress} className="h-3 mb-2" />
                                <p className="text-xs text-gray-500">
                                    Deadline: {goal.deadline}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}


