import { useState } from 'react';
import MainSidebar from '../components/MainSidebar';
import NotificationSidebar from '../components/NotificationSidebar';
import GoalPlanningModule from '../components/GoalPlanningModule';
import Settings from '../components/Settings';
import SavingRecommendations from '../components/SavingRecommendations';
import Contributions from '../components/Contributions';
import ViewRecommendations from '../components/ViewRecommendations';

export default function App() {
    const [activeTab, setActiveTab] = useState('goals');
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount] = useState(3);
    const [showCreateGoalForm, setShowCreateGoalForm] = useState(false);

    const handleCreateNewGoal = () => {
        setActiveTab('goals');
        setShowCreateGoalForm(true);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'goals':
                return (
                    <GoalPlanningModule
                        showCreateForm={showCreateGoalForm}
                        setShowCreateForm={setShowCreateGoalForm}
                    />
                );
            case 'contributions':
                return <Contributions />;
            case 'recommendations':
                return <SavingRecommendations />;
            case 'view-recommendations':
                return <ViewRecommendations />;
            case 'settings':
                return <Settings />;
            default:
                return (
                    <GoalPlanningModule
                        showCreateForm={showCreateGoalForm}
                        setShowCreateForm={setShowCreateGoalForm}
                    />
                );
        }
    };

    return (
        <div className="h-screen flex bg-gray-50">
            <MainSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                notificationCount={notificationCount}
                onToggleNotifications={() => setShowNotifications(!showNotifications)}
                onCreateNewGoal={handleCreateNewGoal}
            />

            <main className="flex-1 overflow-auto bg-white">
                {renderContent()}
            </main>

            <NotificationSidebar
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                onNavigateToGoals={() => setActiveTab('goals')}
                onNavigateToSettings={() => setActiveTab('settings')}
            />
        </div>
    );
}