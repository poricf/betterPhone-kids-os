
import React, { useState } from 'react';
import { AppIcon } from '../types';
import { Search, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AppDrawerViewProps {
  apps: AppIcon[];
  onOpenApp: (app: AppIcon) => void;
  isOpen: boolean;
  onClose: () => void;
  isStudyMode: boolean;
  allowedStudyApps: string[];
}

export const AppDrawerView: React.FC<AppDrawerViewProps> = ({ apps, onOpenApp, isOpen, onClose, isStudyMode, allowedStudyApps }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name));

  const isAppRestricted = (appName: string) => {
    if (!isStudyMode) return false;
    return !allowedStudyApps.includes(appName);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: isOpen ? 0 : '100%' }}
      transition={{ type: "spring", damping: 28, stiffness: 250 }}
      className="absolute inset-0 bg-black/80 backdrop-blur-xl z-40 flex flex-col pt-12 rounded-[24px]"
    >
      {/* Search Bar - Matches Home Screen style */}
      <div className="px-6 mb-6">
        <div className="bg-[#333] h-12 rounded-[24px] flex items-center px-4 gap-3 border border-white/5">
            <Search size={20} className="text-gray-400" />
            <input 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent flex-1 outline-none text-white placeholder:text-gray-500"
            />
        </div>
      </div>

      {/* App Grid */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 no-scrollbar">
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
            {filteredApps.map((app) => {
                const restricted = isAppRestricted(app.name);
                const isActuallyLocked = app.isLocked || restricted;

                return (
                    <div 
                        key={app.id} 
                        onClick={() => { onOpenApp(app); onClose(); }}
                        className="flex flex-col items-center gap-2 cursor-pointer active:opacity-60"
                    >
                        <div 
                            className="w-[62px] h-[62px] rounded-[22px] flex items-center justify-center text-white shadow-lg relative overflow-hidden"
                            style={{ 
                                backgroundColor: isActuallyLocked ? '#555' : (app.color === '#FFFFFF' ? '#F5F5F5' : app.color),
                                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.05) 100%)'
                            }}
                        >
                            <div className={isActuallyLocked ? "opacity-50 grayscale" : ""}>
                            <app.icon size={28} color={app.color === '#FFFFFF' ? '#333' : '#FFF'} />
                            </div>
                            
                            {/* Lock Overlay */}
                            {isActuallyLocked && (
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="w-7 h-7 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10">
                                        <Lock size={14} className="text-white/90" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-[12px] text-gray-200 text-center w-full truncate px-1">
                            {app.name}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>
      
      {/* Close Handle Area */}
      <div 
        onClick={onClose}
        className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center cursor-pointer"
      >
          <div className="w-12 h-1 bg-white/20 rounded-full"></div>
      </div>
    </motion.div>
  );
};
