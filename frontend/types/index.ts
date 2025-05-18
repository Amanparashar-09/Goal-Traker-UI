export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
  userId: string;
  teamId?: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  goalId: string;
  isCompleted: boolean;
  completionDate?: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  goalId: string;
  timestamp: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // user IDs
}