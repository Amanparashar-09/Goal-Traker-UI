'use client';

import { useState } from 'react';
import { X, Users, User } from 'lucide-react';
import { toast } from '../ui/Toaster';
import { Goal } from '@/types';
import { useGoals } from '@/context/GoalContext';

type GoalWithoutId = Omit<Goal, 'id'>;

interface GoalModalProps {
  onClose: () => void;
  onSave: (goal: GoalWithoutId) => void;
  existingGoal?: Goal;
}

const GoalModal = ({ onClose, onSave, existingGoal }: GoalModalProps) => {
  const { teams } = useGoals();
  const [goal, setGoal] = useState<GoalWithoutId>({
    title: existingGoal?.title || '',
    description: existingGoal?.description || '',
    progress: existingGoal?.progress || 0,
    startDate: existingGoal?.startDate || new Date().toISOString().split('T')[0],
    endDate: existingGoal?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    userId: existingGoal?.userId || '1', // Default user ID
    teamId: existingGoal?.teamId || '',
    milestones: existingGoal?.milestones || [],
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goal.title.trim()) {
      toast({
        title: 'Title is required',
        type: 'error',
      });
      return;
    }
    
    onSave(goal);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setGoal({ ...goal, [name]: value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {existingGoal ? 'Edit Goal' : 'Create New Goal'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={goal.title}
                onChange={handleInputChange}
                placeholder="Enter goal title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={goal.description}
                onChange={handleInputChange}
                placeholder="Describe your goal"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={goal.startDate.split('T')[0]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={goal.endDate.split('T')[0]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Goal Type
              </label>
              <div className="flex items-center space-x-4 mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="goalType"
                    checked={!goal.teamId}
                    onChange={() => setGoal({ ...goal, teamId: '' })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 flex items-center text-gray-700 dark:text-gray-300">
                    <User className="h-4 w-4 mr-1" />
                    Personal
                  </span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="goalType"
                    checked={Boolean(goal.teamId)}
                    onChange={() => setGoal({ ...goal, teamId: teams[0]?.id || '' })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 flex items-center text-gray-700 dark:text-gray-300">
                    <Users className="h-4 w-4 mr-1" />
                    Team
                  </span>
                </label>
              </div>
            </div>
            
            {goal.teamId && (
              <div>
                <label htmlFor="teamId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Team
                </label>
                <select
                  id="teamId"
                  name="teamId"
                  value={goal.teamId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                >
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
              {existingGoal ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;