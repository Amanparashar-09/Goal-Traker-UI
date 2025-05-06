import { Target } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center">
            <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">GoalTracker</span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-center">
            Setting and achieving goals has never been more intuitive.
          </p>
          <div className="border-t border-gray-200 dark:border-gray-800 w-full mt-8 pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              &copy; {new Date().getFullYear()} GoalTracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;