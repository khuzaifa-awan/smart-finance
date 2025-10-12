import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
    X,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Target,
    Bell,
    Calendar,
    Settings
} from 'lucide-react';

const notifications = [
    {
        id: 1,
        type: 'achievement',
        title: 'Goal Completed! 🎉',
        message:
            'Congratulations! You successfully completed your "Emergency Fund" goal of $25,000.',
        timestamp: '2024-07-15T10:30:00Z',
        read: false,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    },
    {
        id: 2,
        type: 'milestone',
        title: 'Milestone Achieved',
        message:
            'You reached 75% of your "House Down Payment" goal. Only $20,000 to go!',
        timestamp: '2024-07-14T16:45:00Z',
        read: false,
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
    },
    {
        id: 3,
        type: 'warning',
        title: 'Goal Behind Schedule',
        message:
            'Your "Buy a Laptop" goal is falling behind. Consider increasing monthly contribution to $300.',
        timestamp: '2024-07-13T09:15:00Z',
        read: false,
        icon: AlertTriangle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    {
        id: 4,
        type: 'suggestion',
        title: 'Savings Opportunity',
        message:
            'You can save an extra $200 this month. Consider allocating it to your priority goals.',
        timestamp: '2024-07-12T14:20:00Z',
        read: true,
        icon: TrendingUp,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200'
    },
    {
        id: 5,
        type: 'reminder',
        title: 'Monthly Contribution Due',
        message:
            "Don't forget to make your monthly $800 contribution to Emergency Fund.",
        timestamp: '2024-07-11T08:00:00Z',
        read: true,
        icon: Calendar,
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-200'
    },
    {
        id: 6,
        type: 'achievement',
        title: 'Streak Milestone!',
        message:
            "Amazing! You've maintained your savings streak for 45 consecutive days.",
        timestamp: '2024-07-10T12:30:00Z',
        read: true,
        icon: CheckCircle,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    }
];

export default function NotificationSidebar({
    isOpen,
    onClose,
    onNavigateToGoals,
    onNavigateToSettings
}) {
    const [filter, setFilter] = useState('all');
    const [markAllRead, setMarkAllRead] = useState(false);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        if (diffInHours < 48) return 'Yesterday';
        return date.toLocaleDateString();
    };

    const filteredNotifications =
        filter === 'unread'
            ? notifications.filter((n) => !n.read && !markAllRead)
            : notifications;

    const unreadCount = notifications.filter((n) => !n.read && !markAllRead).length;

    if (!isOpen) return null;

    return (
        <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-purple-600" />
                        <h2 className="font-semibold text-gray-900">Notifications</h2>
                        {unreadCount > 0 && (
                            <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>
                        )}
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {/* Filter buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                        className="text-xs"
                    >
                        All
                    </Button>
                    <Button
                        variant={filter === 'unread' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('unread')}
                        className="text-xs"
                    >
                        Unread ({unreadCount})
                    </Button>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setMarkAllRead(true)}
                            className="text-xs text-purple-600"
                        >
                            Mark all read
                        </Button>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-3">
                    {filteredNotifications.map((notification) => {
                        const Icon = notification.icon;
                        const isRead = notification.read || markAllRead;

                        return (
                            <Card
                                key={notification.id}
                                className={`border ${notification.borderColor} ${notification.bgColor} ${isRead ? 'opacity-60' : ''
                                    } transition-opacity`}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className={`w-8 h-8 ${notification.bgColor} rounded-lg flex items-center justify-center border ${notification.borderColor}`}
                                        >
                                            <Icon className={`w-4 h-4 ${notification.color}`} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-medium text-gray-900 text-sm truncate">
                                                    {notification.title}
                                                </h4>
                                                {!isRead && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                )}
                                            </div>

                                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                                {notification.message}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-gray-500">
                                                    {formatTimestamp(notification.timestamp)}
                                                </p>
                                                <Badge variant="outline" className="text-xs">
                                                    {notification.type}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200">
                <div className="space-y-3">
                    <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h3>
                        <div className="space-y-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-purple-600 border-purple-200 hover:bg-purple-50"
                                onClick={() => {
                                    if (onNavigateToSettings) onNavigateToSettings();
                                    onClose();
                                }}
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Notification Settings
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => {
                                    if (onNavigateToGoals) onNavigateToGoals();
                                    onClose();
                                }}
                            >
                                <Target className="w-4 h-4 mr-2" />
                                View All Goals
                            </Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="text-xs font-medium text-gray-700 mb-2">
                            Notification Preferences
                        </h4>
                        <div className="space-y-1 text-xs text-gray-600">
                            <div className="flex justify-between">
                                <span>Goal achievements</span>
                                <span className="text-green-600">✓ Enabled</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Behind schedule alerts</span>
                                <span className="text-green-600">✓ Enabled</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Milestone updates</span>
                                <span className="text-green-600">✓ Enabled</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Weekly summaries</span>
                                <span className="text-yellow-600">⚠ Disabled</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h4 className="text-xs font-medium text-blue-900 mb-1">Smart Insights</h4>
                        <p className="text-xs text-blue-800">
                            Based on your activity, we recommend enabling weekly goal summaries for
                            better tracking.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 w-full text-xs">
                            Enable Weekly Summaries
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
