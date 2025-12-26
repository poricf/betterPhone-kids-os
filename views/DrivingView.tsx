
import React from 'react';
import { Car, Phone, ShieldCheck, Map, Music, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

interface DrivingViewProps {
  onDismiss: () => void;
  onEmergency: () => void;
  onOpenMaps: () => void;
  onOpenMusic: () => void;
}

export const DrivingView: React.FC<DrivingViewProps> = ({ onDismiss, onEmergency, onOpenMaps, onOpenMusic }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      className="h-full bg-[#121212] text-white flex flex-col relative z-50 font-sans overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#1a1a1a] to-[#121212] z-0"></div>
      
      {/* Header */}
      <div className="relative z-10 pt-12 px-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                <Car size={20} />
             </div>
             <div>
                <h1 className="text-xl font-bold leading-none">Driving Mode</h1>
                <p className="text-xs text-gray-400 mt-1">Distractions limited</p>
             </div>
          </div>
          <button 
             onClick={onDismiss}
             className="px-4 py-2 bg-white/10 rounded-full text-xs font-medium border border-white/5 active:bg-white/20"
          >
             I'm not driving
          </button>
      </div>

      {/* Main Controls Grid */}
      <div className="relative z-10 flex-1 px-4 pb-8 flex flex-col gap-4">
         
         {/* Voice Assistant - Large Touch Area */}
         <div className="flex-1 bg-gradient-to-br from-[#2a2a2a] to-[#202020] rounded-[32px] border border-white/5 flex flex-col items-center justify-center active:scale-[0.98] transition-transform shadow-lg">
             <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-blue-500/30 shadow-xl mb-4 animate-pulse">
                <Mic size={32} className="text-white" />
             </div>
             <span className="text-lg font-medium text-gray-200">Tap to Speak</span>
         </div>

         <div className="h-40 grid grid-cols-2 gap-4">
             {/* Maps Shortcut */}
             <button 
               onClick={onOpenMaps}
               className="bg-[#2a2a2a] rounded-[28px] border border-white/5 flex flex-col items-center justify-center gap-2 active:bg-[#333] transition-colors"
             >
                <Map size={32} className="text-blue-400" />
                <span className="font-medium">Navigation</span>
             </button>

             {/* Music Shortcut */}
             <button 
               onClick={onOpenMusic}
               className="bg-[#2a2a2a] rounded-[28px] border border-white/5 flex flex-col items-center justify-center gap-2 active:bg-[#333] transition-colors"
             >
                <Music size={32} className="text-pink-400" />
                <span className="font-medium">Music</span>
             </button>
         </div>

         {/* Emergency Call */}
         <button 
            onClick={onEmergency}
            className="h-20 bg-[#3a1c1c] rounded-[24px] border border-red-500/30 flex items-center justify-center gap-3 active:bg-[#4a2424] transition-colors mt-2"
         >
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                <Phone size={20} fill="currentColor" />
            </div>
            <span className="text-red-200 font-bold text-lg">Emergency Call</span>
         </button>

      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <div className="flex items-center gap-2 text-[#4CAF50] text-[10px] font-bold uppercase tracking-widest bg-[#4CAF50]/10 px-3 py-1.5 rounded-full border border-[#4CAF50]/20">
            <ShieldCheck size={12} />
            Auto-Protected
        </div>
      </div>
    </motion.div>
  );
};
