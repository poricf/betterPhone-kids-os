import React from 'react';

interface SystemNavProps {
  onBack: () => void;
  onHome: () => void;
  isLightMode?: boolean;
}

export const SystemNav: React.FC<SystemNavProps> = ({ onBack, onHome, isLightMode = false }) => {
  const iconColor = isLightMode ? '#444746' : '#E3E3E3';

  return (
    <div className={`h-12 w-full flex items-center justify-around px-16 z-50 ${isLightMode ? 'bg-[#f2f2f2]/90' : 'bg-[#1f1f1f]/20'} backdrop-blur-md`}>
      <button 
        onClick={onBack}
        className="w-14 h-full flex items-center justify-center active:scale-90 transition-transform active:bg-black/5 rounded-full"
      >
         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
         </svg>
      </button>

      <button 
        onClick={onHome}
        className="w-14 h-full flex items-center justify-center active:scale-90 transition-transform active:bg-black/5 rounded-full"
      >
         <div className="w-4 h-4 rounded-full border-[2.5px]" style={{ borderColor: iconColor }}></div>
      </button>

      <button 
        className="w-14 h-full flex items-center justify-center active:scale-90 transition-transform active:bg-black/5 rounded-full"
      >
        <div className="w-4 h-4 rounded-[2px] border-[2.5px]" style={{ borderColor: iconColor }}></div>
      </button>
    </div>
  );
};