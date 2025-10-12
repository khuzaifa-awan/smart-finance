import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import {
    Bell,
    Target,
    DollarSign,
    Save,
    CreditCard
} from 'lucide-react';

export default function Settings() {
    const [notifications, setNotifications] = useState({
        goalReminders: true,
        achievementAlerts: true,
        behindScheduleAlerts: true,
        milestoneAlerts: true
    });

    const [goalSettings, setGoalSettings] = useState({
        defaultSavingsRate: 30,
        emergencyFundMonths: 6,
        monthlyIncome: 8000,
        autoAdjustGoals: true,
        smartMilestones: true
    });

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Goal Planning Settings</h1>
                    <p className="text-gray-600 mt-1">Configure your personal preferences and goal planning settings</p>
                </div>
                <Button className="bg-blue-700 hover:bg-blue-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* FE4: Notification Settings */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                            <Bell className="w-5 h-5" />
                            Goal Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-gray-900">Goal Achievement Alerts</label>
                                <p className="text-sm text-gray-600">Celebrate when you complete goals or milestones</p>
                            </div>
                            <Switch
                                checked={notifications.achievementAlerts}
                                onCheckedChange={(checked) =>
                                    setNotifications(prev => ({ ...prev, achievementAlerts: checked }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-gray-900">Behind Schedule Warnings</label>
                                <p className="text-sm text-gray-600">Get notified when goals are falling behind timeline</p>
                            </div>
                            <Switch
                                checked={notifications.behindScheduleAlerts}
                                onCheckedChange={(checked) =>
                                    setNotifications(prev => ({ ...prev, behindScheduleAlerts: checked }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-gray-900">Milestone Notifications</label>
                                <p className="text-sm text-gray-600">Alerts for milestone achievements and progress updates</p>
                            </div>
                            <Switch
                                checked={notifications.milestoneAlerts}
                                onCheckedChange={(checked) =>
                                    setNotifications(prev => ({ ...prev, milestoneAlerts: checked }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-gray-900">Goal Reminders</label>
                                <p className="text-sm text-gray-600">Regular reminders about monthly contributions</p>
                            </div>
                            <Switch
                                checked={notifications.goalReminders}
                                onCheckedChange={(checked) =>
                                    setNotifications(prev => ({ ...prev, goalReminders: checked }))
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* FE1, FE2, FE3, FE5: Goal Management Settings */}
                <Card className="border border-gray-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                            <Target className="w-5 h-5" />
                            Goal Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="monthlyIncome" className="font-medium text-gray-900">
                                    Monthly Income ($)
                                </Label>
                                <Input
                                    id="monthlyIncome"
                                    type="number"
                                    value={goalSettings.monthlyIncome}
                                    onChange={(e) => setGoalSettings(prev => ({ ...prev, monthlyIncome: parseInt(e.target.value) }))}
                                    className="mt-1"
                                />
                                <p className="text-sm text-gray-600 mt-1">Used for monthly saving recommendations</p>
                            </div>

                            <div>
                                <Label htmlFor="defaultSavingsRate" className="font-medium text-gray-900">
                                    Default Savings Rate (%)
                                </Label>
                                <Input
                                    id="defaultSavingsRate"
                                    type="number"
                                    value={goalSettings.defaultSavingsRate}
                                    onChange={(e) => setGoalSettings(prev => ({ ...prev, defaultSavingsRate: parseInt(e.target.value) }))}
                                    className="mt-1"
                                />
                                <p className="text-sm text-gray-600 mt-1">Percentage of income allocated to goals</p>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="emergencyFundMonths" className="font-medium text-gray-900">
                                Emergency Fund Target (months)
                            </Label>
                            <Input
                                id="emergencyFundMonths"
                                type="number"
                                value={goalSettings.emergencyFundMonths}
                                onChange={(e) => setGoalSettings(prev => ({ ...prev, emergencyFundMonths: parseInt(e.target.value) }))}
                                className="mt-1"
                            />
                            <p className="text-sm text-gray-600 mt-1">Default target calculation for Emergency Fund goals</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-gray-900">Auto-adjust goal timelines</label>
                                <p className="text-sm text-gray-600">Automatically recalculate deadlines when income changes</p>
                            </div>
                            <Switch
                                checked={goalSettings.autoAdjustGoals}
                                onCheckedChange={(checked) =>
                                    setGoalSettings(prev => ({ ...prev, autoAdjustGoals: checked }))
                                }
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <label className="font-medium text-gray-900">Smart milestone creation</label>
                                <p className="text-sm text-gray-600">Automatically create optimal milestone breakdowns</p>
                            </div>
                            <Switch
                                checked={goalSettings.smartMilestones}
                                onCheckedChange={(checked) =>
                                    setGoalSettings(prev => ({ ...prev, smartMilestones: checked }))
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Goal Templates (FE1) */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                        <Target className="w-5 h-5" />
                        Default Goal Templates
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Emergency Fund</h4>
                            <p className="text-sm text-gray-600 mb-2">Default: {goalSettings.emergencyFundMonths} months expenses</p>
                            <p className="text-sm text-blue-600">Target: ${(goalSettings.monthlyIncome * 0.65 * goalSettings.emergencyFundMonths).toLocaleString()}</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">Electronics (Laptop)</h4>
                            <p className="text-sm text-gray-600 mb-2">Default: $1,500 - $2,500</p>
                            <p className="text-sm text-blue-600">Timeframe: 3-6 months</p>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg">
                            <h4 className="font-medium text-gray-900 mb-2">House Down Payment</h4>
                            <p className="text-sm text-gray-600 mb-2">Default: 20% of home price</p>
                            <p className="text-sm text-blue-600">Timeframe: 2-5 years</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Connected Savings Accounts */}
            <Card className="border border-gray-200">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
                        <DollarSign className="w-5 h-5" />
                        Connected Savings Accounts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Primary Savings Account</p>
                                    <p className="text-sm text-gray-600">••••••••1234 • 4.5% APY</p>
                                    <p className="text-xs text-green-600">Auto-transfer enabled for goals</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-green-100 text-green-800">Connected</Badge>
                                <Button variant="outline" size="sm">Configure</Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <div className="text-center">
                                <CreditCard className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-gray-600 mb-2">Add savings account for goals</p>
                                <p className="text-sm text-gray-500 mb-3">Connect accounts to automatically fund your goals</p>
                                <Button variant="outline" size="sm" className="text-purple-600 border-purple-300">
                                    Connect Account
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Current Configuration Summary */}
            <Card className="border border-blue-200 bg-blue-50">
                <CardHeader>
                    <CardTitle className="text-lg text-blue-900">Current Savings Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Monthly Income</p>
                            <p className="text-lg font-semibold text-blue-600">${goalSettings.monthlyIncome.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Savings Rate</p>
                            <p className="text-lg font-semibold text-blue-600">{goalSettings.defaultSavingsRate}%</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Available for Goals</p>
                            <p className="text-lg font-semibold text-blue-600">
                                ${((goalSettings.monthlyIncome * goalSettings.defaultSavingsRate) / 100).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                            <p className="text-sm text-gray-600">Emergency Target</p>
                            <p className="text-lg font-semibold text-blue-600">
                                ${(goalSettings.monthlyIncome * 0.65 * goalSettings.emergencyFundMonths).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}