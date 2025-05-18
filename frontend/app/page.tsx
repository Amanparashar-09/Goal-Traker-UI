import { Inter } from 'next/font/google';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import { GoalProvider } from '@/context/GoalContext';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <ThemeProvider>
      <GoalProvider>
        <main className={`${inter.className} min-h-screen`}>
          <LandingPage />
        </main>
      </GoalProvider>
    </ThemeProvider>
  );
}