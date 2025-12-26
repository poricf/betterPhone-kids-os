import React, { useState, useEffect } from 'react';
import { Lock, Clock, X, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface LockedViewProps {
  onClose: () => void;
  appName: string;
  reason?: 'TIME_LIMIT' | 'STUDY_MODE';
  nextAllowanceTime?: number;
}

export const LockedView: React.FC<LockedViewProps> = ({ onClose, appName, reason = 'TIME_LIMIT', nextAllowanceTime }) => {
  const isStudy = reason === 'STUDY_MODE';
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  // Calculate and update countdown timer
  useEffect(() => {
    if (isStudy || !nextAllowanceTime) {
      setTimeRemaining('');
      return;
    }

    const updateTimer = () => {
      const now = Date.now();
      const diff = nextAllowanceTime - now;

      if (diff <= 0) {
        setTimeRemaining('Available now!');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeRemaining(`${minutes}m ${seconds}s`);
      } else {
        setTimeRemaining(`${seconds}s`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [nextAllowanceTime, isStudy]);

  return (
    <div className={`h-full w-full flex flex-col items-center justify-center p-8 text-center relative z-50 backdrop-blur-xl transition-colors duration-500 ${isStudy ? 'bg-indigo-900/95 text-white' : 'bg-white/80 text-slate-800'}`}>
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`w-24 h-24 rounded-[28px] flex items-center justify-center mb-6 shadow-xl ${isStudy ? 'bg-indigo-500/30 text-indigo-100 border border-indigo-400/30' : 'bg-slate-200 text-slate-500'}`}
      >
        {isStudy ? <BookOpen size={40} /> : <Lock size={40} />}
      </motion.div>
      
      <h2 className="text-2xl font-bold mb-2">
        {isStudy ? 'Focus Time' : 'Time Limit Reached'}
      </h2>
      <p className={`mb-8 max-w-[260px] mx-auto ${isStudy ? 'text-indigo-200' : 'text-slate-500'}`}>
        {isStudy 
            ? "This app is paused while you study. Keep up the good work!" 
            : <span>You've used all your time for <span className="font-bold">{appName}</span> today.</span>
        }
      </p>

      <div className="w-full space-y-3">
        {!isStudy && (
            <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
            Ask for More Time
            </button>
        )}
        <button 
           onClick={onClose}
           className={`w-full py-3 rounded-xl font-bold shadow active:scale-95 transition-transform ${isStudy ? 'bg-white text-indigo-900' : 'bg-white text-slate-600'}`}
        >
           {isStudy ? 'Back to Studies' : 'Okay'}
        </button>
      </div>
    </div>
  );
};