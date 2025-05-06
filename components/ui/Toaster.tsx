'use client';

import { useEffect, useState } from 'react';
import { Toast } from './Toast';

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

export const Toaster = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastProps>) => {
      const newToast = {
        id: event.detail.id || Date.now().toString(),
        title: event.detail.title,
        description: event.detail.description,
        type: event.detail.type || 'info',
      };
      
      setToasts((prev) => [...prev, newToast]);
      
      // Auto-remove toast after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== newToast.id));
      }, 5000);
    };

    window.addEventListener('toast' as any, handleToast as any);
    
    return () => {
      window.removeEventListener('toast' as any, handleToast as any);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        />
      ))}
    </div>
  );
};

export const toast = (props: Omit<ToastProps, 'id'>) => {
  const event = new CustomEvent('toast', {
    detail: { ...props, id: Date.now().toString() },
  });
  window.dispatchEvent(event);
};