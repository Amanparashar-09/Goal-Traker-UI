'use client';

import { useState } from 'react';
import { Plus, Trophy, Check, CalendarDays } from 'lucide-react';
import { useGoals } from '@/context/GoalContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from './ui/Toaster';

interface MilestoneListProps {
  goalId: string;
}

const MilestoneList = ({ goalId }: MilestoneListProps) => {
  const { getMilestones, addMilestone, toggleMilestoneCompletion } = useGoals();
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  
  const milestones = getMilestones(goalId);
  
  const handleAddMilestone = () => {
    if (newMilestoneTitle.trim() === '') return;
    
    addMilestone({
      title: newMilestoneTitle,
      description: '',
      goalId,
      isCompleted: false,
    });
    
    setNewMilestoneTitle('');
    setIsAddingMilestone(false);
    toast({
      title: 'Milestone added',
      type: 'success',
    });
  };

  const handleToggleMilestone = (milestoneId: string, isCompleted: boolean) => {
    toggleMilestoneCompletion(milestoneId, !isCompleted);
    toast({
      title: !isCompleted ? 'Milestone completed' : 'Milestone uncompleted',
      type: 'success',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMilestone();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">Milestones</h4>
        {!isAddingMilestone && (
          <button
            onClick={() => setIsAddingMilestone(true)}
            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Milestone
          </button>
        )}
      </div>
      
      {/* Add new milestone form */}
      {isAddingMilestone && (
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={newMilestoneTitle}
              onChange={(e) => setNewMilestoneTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter milestone title"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoFocus
            />
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleAddMilestone}
                disabled={newMilestoneTitle.trim() === ''}
                className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add
              </button>
              <button
                onClick={() => setIsAddingMilestone(false)}
                className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Milestones list */}
      <ul className="space-y-2">
        {milestones.length === 0 ? (
          <li className="text-center text-gray-500 dark:text-gray-400 text-sm py-2">
            No milestones yet. Add one to track your progress!
          </li>
        ) : (
          milestones.map((milestone) => (
            <li
              key={milestone.id}
              className={`flex items-start p-2 rounded-md ${
                milestone.isCompleted 
                  ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30' 
                  : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <button
                onClick={() => handleToggleMilestone(milestone.id, milestone.isCompleted)}
                className={`flex-shrink-0 h-5 w-5 rounded-full border ${
                  milestone.isCompleted 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-400 dark:border-gray-500'
                } flex items-center justify-center mr-3 mt-0.5`}
                aria-label={milestone.isCompleted ? "Mark as incomplete" : "Mark as complete"}
              >
                {milestone.isCompleted && <Check className="h-3 w-3" />}
              </button>
              
              <div className="flex-grow">
                <p className={`text-sm font-medium ${
                  milestone.isCompleted 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {milestone.title}
                </p>
                
                {milestone.completionDate && (
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    <span>Completed {formatDistanceToNow(new Date(milestone.completionDate), { addSuffix: true })}</span>
                  </div>
                )}
              </div>
              
              {milestone.isCompleted && (
                <div className="flex-shrink-0 ml-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MilestoneList;