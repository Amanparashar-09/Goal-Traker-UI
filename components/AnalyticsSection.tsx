'use client';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Goal } from '@/types';
import { useTheme } from '@/context/ThemeContext';

interface AnalyticsSectionProps {
  goals: Goal[];
}

const AnalyticsSection = ({ goals }: AnalyticsSectionProps) => {
  const { theme } = useTheme();
  
  // Progress distribution chart data
  const progressCategories = [
    { name: 'Not Started (0-10%)', range: [0, 10], count: 0 },
    { name: 'Early Stage (11-30%)', range: [11, 30], count: 0 },
    { name: 'In Progress (31-60%)', range: [31, 60], count: 0 },
    { name: 'Advanced (61-90%)', range: [61, 90], count: 0 },
    { name: 'Completed (91-100%)', range: [91, 100], count: 0 },
  ];
  
  // Count goals by progress category
  goals.forEach(goal => {
    const category = progressCategories.find(
      cat => goal.progress >= cat.range[0] && goal.progress <= cat.range[1]
    );
    if (category) {
      category.count += 1;
    }
  });
  
  // Milestones data
  const milestonesData = [
    { name: 'Completed', value: goals.reduce((sum, goal) => sum + (goal.milestones?.filter(m => m.isCompleted).length || 0), 0) },
    { name: 'Remaining', value: goals.reduce((sum, goal) => sum + (goal.milestones?.filter(m => !m.isCompleted).length || 0), 0) },
  ];
  
  // Goal types data (personal vs team)
  const goalTypesData = [
    { name: 'Personal Goals', value: goals.filter(goal => !goal.teamId).length },
    { name: 'Team Goals', value: goals.filter(goal => goal.teamId).length },
  ];
  
  // Overall progress
  const overallProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length) 
    : 0;
  
  const milestonePieColors = ['#10B981', '#6B7280'];
  const goalTypesPieColors = ['#8B5CF6', '#3B82F6'];
  
  // Date conversion function for charts
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  const textColor = theme === 'dark' ? '#F9FAFB' : '#1F2937';
  const gridColor = theme === 'dark' ? '#374151' : '#E5E7EB';
  
  return (
    <div className="space-y-8">
      {goals.length === 0 ? (
        <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Goals Yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add goals to see your analytics and progress reports.
          </p>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Goals</h3>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{goals.length}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Goals</span>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Overall Progress</h3>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{overallProgress}%</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Average Completion</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Milestones</h3>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {milestonesData[0].value}/{milestonesData[0].value + milestonesData[1].value}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Completed</span>
              </div>
            </div>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress Distribution Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Progress Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={progressCategories} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12, fill: textColor }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fontSize: 12, fill: textColor }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                        borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                        color: textColor
                      }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Milestones & Goal Types Pie Charts */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Goal Insights</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-64">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">Milestone Status</h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                      <Pie
                        data={milestonesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {milestonesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={milestonePieColors[index % milestonePieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                          color: textColor
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-64">
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 text-center">Goal Types</h4>
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                      <Pie
                        data={goalTypesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                      >
                        {goalTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={goalTypesPieColors[index % goalTypesPieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ 
                          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                          borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                          color: textColor
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsSection;