import React from 'react';
import { Quest } from '../types';
import { Check, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

interface QuestViewProps {
  quests: Quest[];
  onToggleQuest: (id: string) => void;
}

export const QuestView: React.FC<QuestViewProps> = ({ quests, onToggleQuest }) => {
  
  const handleComplete = (id: string, completed: boolean) => {
    if (!completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#3b82f6', '#10b981']
      });
    }
    onToggleQuest(id);
  };

  const pendingQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* App Header */}
      <div className="pt-12 px-6 pb-6 flex items-end justify-between bg-white z-10 sticky top-0">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tasks</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            {pendingQuests.length} pending • {completedQuests.length} completed
          </p>
        </div>
        <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md active:bg-blue-700 transition-colors">
            <Plus size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        {/* Pending List */}
        {pendingQuests.length > 0 && (
           <div className="space-y-3 mb-8">
              <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">To Do</h3>
              {pendingQuests.map(quest => (
                <TaskItem key={quest.id} quest={quest} onClick={() => handleComplete(quest.id, false)} />
              ))}
           </div>
        )}

        {/* Completed List */}
        {completedQuests.length > 0 && (
           <div className="space-y-3">
              <h3 className="px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Completed</h3>
              {completedQuests.map(quest => (
                <TaskItem key={quest.id} quest={quest} onClick={() => handleComplete(quest.id, true)} />
              ))}
           </div>
        )}

        {quests.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={32} />
                </div>
                <p>All tasks completed</p>
            </div>
        )}
      </div>
    </div>
  );
};

const TaskItem: React.FC<{ quest: Quest; onClick: () => void }> = ({ quest, onClick }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer group transition-all border ${quest.completed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200 shadow-sm hover:border-blue-200'}`}
  >
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${quest.completed ? 'bg-blue-500 border-blue-500 text-white' : 'border-slate-300 text-transparent group-hover:border-blue-400'}`}>
        <Check size={14} strokeWidth={3} />
    </div>
    <div className="flex-1">
        <h4 className={`text-[15px] font-medium transition-colors ${quest.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
            {quest.title}
        </h4>
        {quest.reward && !quest.completed && (
            <p className="text-xs text-blue-600 font-medium mt-0.5">
               Reward: {quest.reward}
            </p>
        )}
    </div>
  </motion.div>
);