import { Goal, Comment, Milestone, User, Team } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Sam Williams',
    email: 'sam@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Taylor Brown',
    email: 'taylor@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: 'team1',
    name: 'Product Development',
    members: ['1', '2', '3'],
  },
  {
    id: 'team2',
    name: 'Marketing',
    members: ['2', '4'],
  },
  {
    id: 'team3',
    name: 'Customer Success',
    members: ['1', '4'],
  },
];

// Mock Goals
export const mockGoals: Goal[] = [
  {
    id: 'g1',
    title: 'Launch new website',
    description: 'Complete the redesign and launch of our company website with improved UX and performance metrics.',
    progress: 75,
    startDate: '2023-10-01T00:00:00.000Z',
    endDate: '2023-12-15T00:00:00.000Z',
    userId: '1',
    teamId: 'team1',
    milestones: [],
  },
  {
    id: 'g2',
    title: 'Improve coding skills',
    description: 'Complete advanced React course and build three portfolio projects to showcase my skills.',
    progress: 45,
    startDate: '2023-09-15T00:00:00.000Z',
    endDate: '2023-12-31T00:00:00.000Z',
    userId: '1',
    milestones: [],
  },
  {
    id: 'g3',
    title: 'Increase social media engagement',
    description: 'Grow our social media following by 25% and increase engagement rates across all platforms.',
    progress: 60,
    startDate: '2023-10-10T00:00:00.000Z',
    endDate: '2024-01-10T00:00:00.000Z',
    userId: '2',
    teamId: 'team2',
    milestones: [],
  },
  {
    id: 'g4',
    title: 'Run a half marathon',
    description: 'Train consistently and complete a half marathon under 2 hours.',
    progress: 30,
    startDate: '2023-11-01T00:00:00.000Z',
    endDate: '2024-05-10T00:00:00.000Z',
    userId: '3',
    milestones: [],
  },
  {
    id: 'g5',
    title: 'Improve customer satisfaction',
    description: 'Implement new customer feedback system and raise NPS score by at least 15 points.',
    progress: 20,
    startDate: '2023-11-15T00:00:00.000Z',
    endDate: '2024-02-28T00:00:00.000Z',
    userId: '4',
    teamId: 'team3',
    milestones: [],
  },
];

// Mock Milestones
export const mockMilestones: Milestone[] = [
  {
    id: 'm1',
    title: 'Complete wireframes',
    description: 'Finalize all website wireframes with team approval',
    goalId: 'g1',
    isCompleted: true,
    completionDate: '2023-10-15T00:00:00.000Z',
  },
  {
    id: 'm2',
    title: 'Develop main pages',
    description: 'Complete development of homepage, about, and services pages',
    goalId: 'g1',
    isCompleted: true,
    completionDate: '2023-11-10T00:00:00.000Z',
  },
  {
    id: 'm3',
    title: 'QA testing',
    description: 'Complete all QA testing and fix identified issues',
    goalId: 'g1',
    isCompleted: false,
  },
  {
    id: 'm4',
    title: 'Complete beginner course',
    description: 'Finish React fundamentals course',
    goalId: 'g2',
    isCompleted: true,
    completionDate: '2023-10-01T00:00:00.000Z',
  },
  {
    id: 'm5',
    title: 'Build first project',
    description: 'Complete first portfolio project',
    goalId: 'g2',
    isCompleted: true,
    completionDate: '2023-11-05T00:00:00.000Z',
  },
  {
    id: 'm6',
    title: 'Content strategy',
    description: 'Develop and approve content calendar for next 3 months',
    goalId: 'g3',
    isCompleted: true,
    completionDate: '2023-10-25T00:00:00.000Z',
  },
  {
    id: 'm7',
    title: 'Run 5K without stopping',
    description: 'Build endurance to complete a 5K run',
    goalId: 'g4',
    isCompleted: true,
    completionDate: '2023-11-20T00:00:00.000Z',
  },
  {
    id: 'm8',
    title: 'Implement feedback form',
    description: 'Add customer feedback form to all touchpoints',
    goalId: 'g5',
    isCompleted: true,
    completionDate: '2023-12-01T00:00:00.000Z',
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'c1',
    content: 'The homepage design looks great! I think we should adjust the call-to-action button color for better contrast.',
    userId: '2',
    goalId: 'g1',
    timestamp: '2023-10-20T14:23:00.000Z',
  },
  {
    id: 'c2',
    content: 'Just completed the mobile responsiveness testing. Found a few issues on the contact page that need fixing.',
    userId: '3',
    goalId: 'g1',
    timestamp: '2023-11-05T09:15:00.000Z',
  },
  {
    id: 'c3',
    content: 'Your progress on React is impressive! Have you checked out the new hooks documentation?',
    userId: '4',
    goalId: 'g2',
    timestamp: '2023-10-28T16:42:00.000Z',
  },
  {
    id: 'c4',
    content: 'Our Instagram engagement has increased by 12% this month. The new content strategy is working!',
    userId: '1',
    goalId: 'g3',
    timestamp: '2023-11-12T11:30:00.000Z',
  },
  {
    id: 'c5',
    content: 'I recommend trying interval training to improve your endurance for the half marathon.',
    userId: '2',
    goalId: 'g4',
    timestamp: '2023-11-25T08:17:00.000Z',
  },
  {
    id: 'c6',
    content: 'The initial feedback from customers on the new system has been very positive.',
    userId: '1',
    goalId: 'g5',
    timestamp: '2023-12-05T15:08:00.000Z',
  },
];