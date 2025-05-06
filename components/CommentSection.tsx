'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useGoals } from '@/context/GoalContext';
import { formatDistanceToNow } from 'date-fns';
import { toast } from './ui/Toaster';

interface CommentSectionProps {
  goalId: string;
}

const CommentSection = ({ goalId }: CommentSectionProps) => {
  const { comments, users, addComment } = useGoals();
  const [commentText, setCommentText] = useState('');
  
  const goalComments = comments
    .filter(comment => comment.goalId === goalId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const handleSubmitComment = () => {
    if (commentText.trim() === '') return;
    
    // Use the first user as the default commenter (in a real app, would be the logged-in user)
    const currentUser = users[0];
    
    addComment({
      content: commentText,
      userId: currentUser.id,
      goalId,
      timestamp: new Date().toISOString(),
    });
    
    setCommentText('');
    toast({
      title: 'Comment added',
      type: 'success',
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-850">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Comments</h4>
      
      {/* Comment form */}
      <div className="flex mb-4">
        <div className="flex-shrink-0 mr-3">
          <div className="h-8 w-8 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center text-white text-sm font-medium">
            {users[0].name.charAt(0)}
          </div>
        </div>
        <div className="flex-grow relative">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-2 px-3 text-sm leading-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 min-h-[80px] resize-none"
          />
          <button
            onClick={handleSubmitComment}
            disabled={commentText.trim() === ''}
            className="absolute right-2 bottom-2 p-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            aria-label="Send comment"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="space-y-4">
        {goalComments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-2">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          goalComments.map((comment) => {
            const user = users.find(u => u.id === comment.userId);
            
            return (
              <div key={comment.id} className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-white text-sm font-medium">
                    {user?.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="bg-white dark:bg-gray-700 rounded-lg px-4 py-2 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">
                        {user?.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CommentSection;