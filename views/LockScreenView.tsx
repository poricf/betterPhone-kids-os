import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { Lock, Phone, Camera } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  onCamera: () => void;
}

export const LockScreenView: React.FC<LockScreenProps> = ({ onUnlock, onCamera }) => {
  const [time, setTime] = useState(new Date());
  const controls = useAnimation();
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, -200], [1, 0]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y < -150) {
      onUnlock();
    } else {
      controls.start({ y: 0 });
    }
  };

  return (
    <motion.div 
      className="h-full w-full flex flex-col items-center pt-20 pb-8 px-6 text-white relative z-50"
      style={{ opacity }}
    >
      {/* Pixel Stacked Clock */}
      <div className="flex flex-col items-center w-full mb-12">
        <h1 className="text-[6rem] leading-[0.85] font-bold tracking-tight text-[#e3e3e3] opacity-90 text-center">
          {time.toLocaleTimeString([], { hour: '2-digit', hour12: false })}
        </h1>
        <h1 className="text-[6rem] leading-[0.85] font-bold tracking-tight text-[#e3e3e3] opacity-90 text-center">
          {time.toLocaleTimeString([], { minute: '2-digit' })}
        </h1>
        <div className="mt-4 text-xl font-medium tracking-wide opacity-80">
           {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Notifications - Android Style */}
      <div className="w-full space-y-2">
        <div className="bg-[#303030]/90 rounded-[4px] p-4 shadow-md border-l-4 border-blue-400">
           <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full bg-blue-400 flex items-center justify-center text-[10px] font-bold text-black">B</div>
                 <span className="text-xs font-medium text-gray-300">BetterPhone • Now</span>
              </div>
           </div>
           <p className="text-sm font-medium text-gray-100">Daily Quest Updated</p>
           <p className="text-xs text-gray-400">Read for 20 mins to earn free time!</p>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Bottom Shortcuts */}
      <div className="w-full flex justify-between items-end px-8 mb-12">
        <button className="w-12 h-12 bg-[#303030] rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg">
          <Phone size={20} className="text-white" />
        </button>
        <div className="flex flex-col items-center gap-2 mb-2 opacity-60">
             <Lock size={16} />
             <span className="text-xs font-medium">Swipe up to open</span>
        </div>
        <button 
           onClick={onCamera}
           className="w-12 h-12 bg-[#303030] rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg"
        >
          <Camera size={20} className="text-white" />
        </button>
      </div>

      {/* Swipe Hitbox */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/3 z-20 cursor-grab active:cursor-grabbing"
        drag="y"
        dragConstraints={{ top: -300, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={controls}
        style={{ y }}
      />
    </motion.div>
  );
};