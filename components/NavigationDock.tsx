import React from 'react';
import { Home, MessageSquare, Star, Shield } from 'lucide-react';
import { AppView } from '../types';

interface NavigationDockProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export const NavigationDock: React.FC<NavigationDockProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[88px] bg-[#f2f2f2] flex items-start justify-around pt-3 border-t border-slate-200 z-20 pb-4">
      <NavButton 
        active={currentView === AppView.HOME} 
        onClick={() => onNavigate(AppView.HOME)} 
        icon={Home} 
        label="Home"
      />
      <NavButton 
        active={currentView === AppView.MESSAGES || currentView === AppView.CHAT} 
        onClick={() => onNavigate(AppView.MESSAGES)} 
        icon={MessageSquare} 
        label="Chat"
      />
      <NavButton 
        active={currentView === AppView.QUESTS} 
        onClick={() => onNavigate(AppView.QUESTS)} 
        icon={Star} 
        label="Quests"
      />
      <NavButton 
        active={currentView === AppView.EMERGENCY} 
        onClick={() => onNavigate(AppView.EMERGENCY)} 
        icon={Shield} 
        label="Safety"
        isAlert
      />
    </div>
  );
};

const NavButton = ({ active, onClick, icon: Icon, label, isAlert }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center w-20 group"
  >
    <div className={`w-16 h-8 flex items-center justify-center rounded-full transition-all duration-300 mb-1 ${active ? 'bg-[#c2e7ff] text-[#001d35]' : 'text-[#444746] hover:bg-[#1f1f1f]/10'}`}>
        <Icon size={24} className={isAlert && !active ? 'text-red-500' : ''} fill={active ? "currentColor" : "none"} strokeWidth={active ? 0 : 2} />
    </div>
    <span className={`text-[12px] font-medium tracking-wide ${active ? 'text-[#001d35] font-bold' : 'text-[#444746]'}`}>
      {label}
    </span>
  </button>
);