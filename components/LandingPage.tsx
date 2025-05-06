'use client';

import { useState } from 'react';
import { ArrowRight, Target, Award, Users, BarChart2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Dashboard from './Dashboard';

const LandingPage = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  
  if (showDashboard) {
    return <Dashboard onHomeClick={() => setShowDashboard(false)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navbar onDashboardClick={() => setShowDashboard(true)} />
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Set Goals, Track Progress, Achieve <span className="text-blue-600 dark:text-blue-400">Success</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Our goal tracking platform helps individuals and teams visualize progress, hit milestones, and celebrate achievements together.
          </p>
          <button
            onClick={() => setShowDashboard(true)}
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Features That <span className="text-blue-600 dark:text-blue-400">Inspire Progress</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl transition-all duration-200 hover:shadow-lg">
              <div className="bg-blue-100 dark:bg-blue-900 h-14 w-14 rounded-lg flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Goal Visualization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Set clear, measurable goals and track your progress with intuitive visual indicators and dashboards.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl transition-all duration-200 hover:shadow-lg">
              <div className="bg-blue-100 dark:bg-blue-900 h-14 w-14 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Milestone Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Break down goals into achievable milestones and celebrate your successes along the way.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl transition-all duration-200 hover:shadow-lg">
              <div className="bg-blue-100 dark:bg-blue-900 h-14 w-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Team Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share goals with team members, provide feedback, and work together to achieve collective objectives.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl transition-all duration-200 hover:shadow-lg">
              <div className="bg-blue-100 dark:bg-blue-900 h-14 w-14 rounded-lg flex items-center justify-center mb-6">
                <BarChart2 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Progress Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Gain insights into your performance with detailed analytics and progress reports over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Achieve Your Goals?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of individuals and teams who are reaching new heights with our goal tracking platform.
          </p>
          <button
            onClick={() => setShowDashboard(true)}
            className="group inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Try Dashboard Demo
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;