import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Map, Users, Database, WifiOff, CloudUpload } from 'lucide-react';

interface SafetyCacheToastProps {
  active: boolean;
  uploading: boolean;
  bufferCount: number;
}

export const SafetyCacheToast: React.FC<SafetyCacheToastProps> = ({ active, uploading, bufferCount }) => {
  return (
    <AnimatePresence>
      {(active || uploading) && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="absolute top-12 left-4 right-4 z-[60]"
        >
          <div className={`rounded-2xl shadow-2xl p-4 backdrop-blur-md border border-white/20 text-white ${active && !uploading ? 'bg-amber-600/90' : 'bg-blue-600/90'}`}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                 {uploading ? <CloudUpload className="animate-bounce" size={20} /> : <ShieldCheck size={20} />}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm leading-tight">
                  {uploading ? 'Syncing Safety Cloud' : 'Offline Safety Cache Active'}
                </h3>
                <p className="text-xs opacity-90 font-medium">
                  {uploading ? 'Uploading buffered data...' : 'Connection lost. Security protocols engaged.'}
                </p>
              </div>
            </div>
            
            {!uploading && (
              <div className="space-y-2 mt-3 bg-black/10 rounded-xl p-3">
                 <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2">
                       <Map size={12} /> <span>Offline Maps</span>
                    </div>
                    <span className="text-white/80">Available</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2">
                       <Users size={12} /> <span>Emergency Contacts</span>
                    </div>
                    <span className="text-white/80">Locked</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2">
                       <Database size={12} /> <span>Location Buffer</span>
                    </div>
                    <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{bufferCount} pts</span>
                 </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};