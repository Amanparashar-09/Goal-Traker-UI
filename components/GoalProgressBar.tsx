'use client';

import { useState, useEffect, useRef } from 'react';

interface GoalProgressBarProps {
  progress: number;
  onChange: (progress: number) => void;
}

const GoalProgressBar = ({ progress, onChange }: GoalProgressBarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(progress);
  const [isAnimating, setIsAnimating] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (progress !== currentProgress && !isDragging) {
      setIsAnimating(true);
      setCurrentProgress(progress);
      
      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      // Set new timeout
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    }
    
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [progress, currentProgress, isDragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateProgressFromMousePosition(e);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      updateProgressFromMousePosition(e);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      onChange(currentProgress);
      
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }
  };

  const updateProgressFromMousePosition = (e: MouseEvent | React.MouseEvent) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newProgress = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
      setCurrentProgress(newProgress);
    }
  };

  const getProgressColor = () => {
    if (currentProgress < 30) return 'bg-red-500 dark:bg-red-600';
    if (currentProgress < 70) return 'bg-yellow-500 dark:bg-yellow-600';
    return 'bg-green-500 dark:bg-green-600';
  };

  return (
    <div className="relative pt-1">
      <div 
        ref={progressRef}
        className="h-2 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <div
          className={`h-full ${getProgressColor()} transition-all duration-600 ease-out`}
          style={{ 
            width: `${currentProgress}%`,
            transform: isAnimating ? 'scaleX(1.02)' : 'scaleX(1)',
            transformOrigin: 'left',
            transition: isDragging ? 'none' : 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
      
      {/* Draggable Thumb */}
      <div 
        className={`w-4 h-4 rounded-full bg-white border-2 ${
          currentProgress < 30 ? 'border-red-500 dark:border-red-600' : 
          currentProgress < 70 ? 'border-yellow-500 dark:border-yellow-600' : 
          'border-green-500 dark:border-green-600'
        } absolute top-0 transform -translate-y-1/4 cursor-grab ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{ 
          left: `calc(${currentProgress}% - 8px)`,
          transition: isDragging ? 'none' : 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isAnimating ? 'scale(1.2) translateY(-1/4)' : 'scale(1) translateY(-1/4)'
        }}
      />
    </div>
  );
};

export default GoalProgressBar;