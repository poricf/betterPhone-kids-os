import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const MusicView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="h-full bg-gradient-to-b from-indigo-900 to-slate-900 text-white p-8 pt-16 flex flex-col relative z-40"
    >
       <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8 cursor-pointer" onClick={onClose}></div>
       
       <div className="flex-1 flex flex-col items-center justify-center">
          <div className={`w-64 h-64 rounded-3xl bg-gradient-to-br from-pink-500 to-violet-600 shadow-2xl mb-8 flex items-center justify-center transform transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}>
             <div className="text-6xl">🎵</div>
          </div>
          
          <div className="w-full mb-8">
             <h2 className="text-2xl font-bold mb-1">Happy Vibes</h2>
             <p className="text-indigo-300">BetterPhone Mix</p>
          </div>

          <div className="w-full bg-white/10 h-1.5 rounded-full mb-2 overflow-hidden">
             <div className="w-1/3 h-full bg-white rounded-full"></div>
          </div>
          <div className="flex justify-between w-full text-xs text-indigo-300 font-mono mb-8">
             <span>1:23</span>
             <span>3:45</span>
          </div>

          <div className="flex items-center justify-between w-full px-4">
             <SkipBack size={28} className="text-indigo-300" />
             <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-indigo-900 shadow-xl active:scale-95 transition-transform"
             >
                {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
             </button>
             <SkipForward size={28} className="text-indigo-300" />
          </div>
       </div>

       <div className="flex justify-between items-center mt-8">
          <Heart className="text-pink-500" fill="currentColor" />
          <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full uppercase tracking-widest">Safe Mode Audio</span>
       </div>
    </motion.div>
  );
};