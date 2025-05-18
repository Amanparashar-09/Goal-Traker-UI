'use client';

import React, { createContext, useContext, useState } from 'react';
import { Goal, Comment, Milestone, User, Team } from '@/types';
import { mockUsers, mockTeams, mockGoals, mockComments, mockMilestones } from '@/lib/data';

interface GoalContextType {
  goals: Goal[];
  comments: Comment[];
  users: User[];
  teams: Team[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoalProgress: (goalId: string, progress: number) => void;
  getMilestones: (goalId: string) => Milestone[];
  addMilestone: (milestone: Omit<Milestone, 'id' | 'completionDate'>) => void;
  toggleMilestoneCompletion: (milestoneId: string, isCompleted: boolean) => void;
  addComment: (comment: Omit<Comment, 'id'>) => void;
}

const GoalContext = createContext<GoalContextType | undefined>(undefined);

export const GoalProvider = ({ children }: { children: React.ReactNode }) => {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);
  const [users] = useState<User[]>(mockUsers);
  const [teams] = useState<Team[]>(mockTeams);
  
  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Math.random().toString(36).substring(2, 11),
      milestones: []
    };
    setGoals((prev) => [...prev, newGoal]);
  };
  
  const updateGoalProgress = (goalId: string, progress: number) => {
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId ? { ...goal, progress } : goal
      )
    );
  };
  
  const getMilestones = (goalId: string) => {
    return milestones.filter((milestone) => milestone.goalId === goalId);
  };
  
  const addMilestone = (milestone: Omit<Milestone, 'id' | 'completionDate'>) => {
    const newMilestone: Milestone = {
      ...milestone,
      id: Math.random().toString(36).substring(2, 11),
      completionDate: undefined,
    };
    setMilestones((prev) => [...prev, newMilestone]);
  };
  
  const toggleMilestoneCompletion = (milestoneId: string, isCompleted: boolean) => {
    setMilestones((prev) =>
      prev.map((milestone) =>
        milestone.id === milestoneId
          ? {
              ...milestone,
              isCompleted,
              completionDate: isCompleted ? new Date().toISOString() : undefined,
            }
          : milestone
      )
    );
  };
  
  const addComment = (comment: Omit<Comment, 'id'>) => {
    const newComment: Comment = {
      ...comment,
      id: Math.random().toString(36).substring(2, 11),
    };
    setComments((prev) => [...prev, newComment]);
  };
  
  return (
    <GoalContext.Provider
      value={{
        goals,
        comments,
        users,
        teams,
        addGoal,
        updateGoalProgress,
        getMilestones,
        addMilestone,
        toggleMilestoneCompletion,
        addComment,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
};