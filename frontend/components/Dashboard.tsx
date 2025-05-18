'use client';

import { useState } from 'react';
import { PlusCircle, Filter, Users, Target, LayoutGrid, BarChart2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import GoalCard from './GoalCard';
import AnalyticsSection from './AnalyticsSection';
import GoalModal from './modals/GoalModal';
import { useGoals } from '@/context/GoalContext';
import { Goal } from '@/types';

interface DashboardProps {
  onHomeClick: () => void;
}

const Dashboard = ({ onHomeClick }: DashboardProps) => {
  const { goals, addGoal } = useGoals();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'personal' | 'team'>('all');
  const [view, setView] = useState<'goals' | 'analytics'>('goals');

  const filteredGoals = goals.filter((goal) => {
    if (filterType === 'all') return true;
    if (filterType === 'personal') return !goal.teamId;
    if (filterType === 'team') return Boolean(goal.teamId);
    return true;
  });

  const handleAddGoal = (newGoal: Omit<Goal, 'id'>) => {
    addGoal(newGoal);
    setIsGoalModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar isDashboard onDashboardClick={onHomeClick} />
      
      <main className="flex-grow px-4 py-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 animate-fadeIn">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Track and manage your goals all in one place</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setIsGoalModalOpen(true)}
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              <PlusCircle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
              Add New Goal
            </button>
          </div>
        </div>
        
        {/* View and Filter Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8 transition-all duration-300 hover:shadow-lg animate-slideUp">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setView('goals')}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  view === 'goals'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <LayoutGrid className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Goals
              </button>
              <button
                onClick={() => setView('analytics')}
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  view === 'analytics'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <BarChart2 className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                Analytics
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 dark:text-gray-300">
                <Filter className="h-4 w-4 inline mr-1 transition-transform duration-300 group-hover:rotate-180" />
                Filter:
              </span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  filterType === 'all'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('personal')}
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  filterType === 'personal'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Target className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />
                Personal
              </button>
              <button
                onClick={() => setFilterType('team')}
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  filterType === 'team'
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Users className="h-4 w-4 mr-1 transition-transform duration-300 group-hover:rotate-12" />
                Team
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        {view === 'goals' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <GoalCard goal={goal} />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-4 transition-transform duration-300 hover:scale-110">
                  <Target className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No goals found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  {filterType === 'all' 
                    ? "You haven't created any goals yet. Click the button below to get started."
                    : `You don't have any ${filterType} goals yet. Click the button below to create one.`}
                </p>
                <button
                  onClick={() => setIsGoalModalOpen(true)}
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <PlusCircle className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                  Create First Goal
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fadeIn">
            <AnalyticsSection goals={goals} />
          </div>
        )}
      </main>

      <Footer />
      
      {isGoalModalOpen && (
        <GoalModal onClose={() => setIsGoalModalOpen(false)} onSave={handleAddGoal} />
      )}
    </div>
  );
};

export default Dashboard;