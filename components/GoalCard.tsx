'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageSquare, Users, Target, Trophy } from 'lucide-react';
import { toast } from './ui/Toaster';
import GoalProgressBar from './GoalProgressBar';
import MilestoneList from './MilestoneList';
import CommentSection from './CommentSection';
import { useGoals } from '@/context/GoalContext';
import { Goal } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface GoalCardProps {
  goal: Goal;
}

const GoalCard = ({ goal }: GoalCardProps) => {
  const { updateGoalProgress, comments } = useGoals();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  
  const goalComments = comments.filter((comment) => comment.goalId === goal.id);
  
  const handleProgressUpdate = (progress: number) => {
    updateGoalProgress(goal.id, progress);
    toast({ 
      title: 'Progress updated',
      description: `Goal progress set to ${progress}%`,
      type: 'success'
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Card Header */}
      <div className="relative p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{goal.title}</h3>
          <div className="flex items-center space-x-2">
            {goal.teamId && (
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded text-xs font-medium flex items-center">
                <Users className="h-3 w-3 mr-1" />
                Team
              </div>
            )}
            {!goal.teamId && (
              <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-1 rounded text-xs font-medium flex items-center">
                <Target className="h-3 w-3 mr-1" />
                Personal
              </div>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {isExpanded ? goal.description : goal.description.length > 100 
            ? `${goal.description.substring(0, 100)}...` 
            : goal.description}
        </p>
        
        <div className="text-gray-500 dark:text-gray-400 text-xs flex items-center mt-2">
          <span className="font-medium">Target date:</span>
          <span className="ml-1">{new Date(goal.endDate).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>Started {formatDistanceToNow(new Date(goal.startDate), { addSuffix: true })}</span>
        </div>
      </div>
      
      {/* Progress Section */}
      <div className="p-5">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.progress}%</span>
        </div>
        
        <GoalProgressBar 
          progress={goal.progress} 
          onChange={handleProgressUpdate}
        />
        
        <div className="flex flex-wrap gap-2 mt-4">
          {goal.milestones?.filter(m => m.isCompleted).length > 0 && (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-medium flex items-center">
              <Trophy className="h-3 w-3 mr-1" />
              {goal.milestones.filter(m => m.isCompleted).length} Milestone{goal.milestones.filter(m => m.isCompleted).length !== 1 ? 's' : ''} reached
            </div>
          )}
          
          {goalComments.length > 0 && (
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {goalComments.length} Comment{goalComments.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
      
      {/* Actions */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-between">
        <button
          onClick={() => setShowMilestones(!showMilestones)}
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center"
        >
          <Trophy className="h-4 w-4 mr-1" />
          Milestones
        </button>
        
        <button
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center"
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          Comments
        </button>
      
        <button
          onClick={toggleExpanded}
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium flex items-center"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              More
            </>
          )}
        </button>
      </div>
      
      {/* Milestones Section */}
      {showMilestones && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <MilestoneList goalId={goal.id} />
        </div>
      )}
      
      {/* Comments Section */}
      {isCommentsOpen && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <CommentSection goalId={goal.id} />
        </div>
      )}
    </div>
  );
};

export default GoalCard;