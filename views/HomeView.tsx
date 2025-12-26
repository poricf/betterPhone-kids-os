
import React from 'react';
import { AppIcon, AppView } from '../types';
import { Mic, Camera, Cloud, ChevronUp, Lock, BookOpen } from 'lucide-react';
import { motion, PanInfo } from 'framer-motion';
import { GoogleGIcon, GmailIcon, PhotosIcon, DriveIcon, PlayStoreIcon } from '../components/OneUIIcons';

interface HomeViewProps {
  apps: AppIcon[];
  onOpenApp: (app: AppIcon) => void;
  onOpenDrawer: () => void;
  isStudyMode: boolean;
  allowedStudyApps: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({ apps, onOpenApp, onOpenDrawer, isStudyMode, allowedStudyApps }) => {
  const dockAppNames = ['Phone', 'Messages', 'Internet', 'Camera'];
  const dockApps = apps.filter(app => dockAppNames.includes(app.name));
  
  // Grid Apps (Excluding Dock)
  const homeApps = [
    apps.find(a => a.name === 'Gallery'),
    apps.find(a => a.name === 'YouTube'),
    apps.find(a => a.name === 'Games'),
    apps.find(a => a.name === 'Store'),
    apps.find(a => a.name === 'Maps'),
    apps.find(a => a.name === 'Settings'),
    apps.find(a => a.name === 'Tasks'),
    apps.find(a => a.name === 'Stories'),
  ];

  const handleSwipe = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y < -50 && Math.abs(info.offset.x) < 100) {
      onOpenDrawer();
    }
  };

  const isAppAllowed = (appName: string) => {
    if (!isStudyMode) return true;
    return allowedStudyApps.includes(appName);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col h-full relative font-sans touch-none"
      onPanEnd={handleSwipe}
    >
      {/* 1. Safe Area for Status Bar */}
      <div className="h-16 shrink-0"></div>

      {/* 2. Scrollable/Main Area */}
      <div className="flex-1 flex flex-col px-5 pb-4">
          
          {/* Weather / Focus Widget Area */}
          <div className="flex justify-center mb-8 mt-2">
             {isStudyMode ? (
                <div className="w-full bg-gradient-to-br from-indigo-600 to-violet-800 rounded-[28px] p-6 text-white flex flex-row items-center justify-between shadow-lg relative overflow-hidden h-[160px]">
                   <div className="z-10 flex flex-col justify-center h-full">
                       <h2 className="text-2xl font-bold tracking-tight mb-2">Study Mode</h2>
                       <p className="text-sm text-indigo-100 max-w-[140px] leading-tight opacity-90">Distractions are hidden. Good luck with your tasks!</p>
                   </div>
                   <div className="z-10 bg-white/10 p-4 rounded-full backdrop-blur-sm">
                      <BookOpen size={48} className="text-white" />
                   </div>
                   {/* Decoration */}
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
                </div>
             ) : (
                <div className="w-full bg-gradient-to-br from-[#203a6b] to-[#12203a] rounded-[28px] p-6 text-white flex flex-row items-center justify-between shadow-lg relative overflow-hidden h-[160px]">
                    <div className="z-10 flex flex-col justify-between h-full">
                       <div>
                           <h2 className="text-5xl font-light tracking-tight">22°</h2>
                           <p className="text-sm text-gray-300 mt-1 font-medium">Los Angeles</p>
                       </div>
                       <p className="text-xs text-gray-400 max-w-[120px] leading-tight">Partly cloudy. High of 24° low of 18°.</p>
                    </div>
                    <div className="z-10">
                       <Cloud size={64} className="text-white/90 drop-shadow-md" />
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
                 </div>
             )}
          </div>

          {/* Google Search Pill */}
          <div className={`mb-8 bg-[#f5f5f5]/90 backdrop-blur-md rounded-full h-12 flex items-center px-4 shadow-sm border border-white/40 transition-opacity ${isStudyMode ? 'opacity-50 grayscale' : ''}`}>
             <div className="w-6 h-6 flex items-center justify-center mr-3">
                 <GoogleGIcon size={20} />
             </div>
             <input type="text" disabled className="bg-transparent flex-1 outline-none text-slate-800 text-base placeholder:text-gray-500 cursor-default" placeholder="Search" />
             <Mic size={20} className="text-gray-500 mr-4" />
             <Camera size={20} className="text-gray-500" />
          </div>

          {/* Main App Grid */}
          <div className="grid grid-cols-4 gap-x-3 gap-y-6">
             {homeApps.map((app, i) => (
                app ? (
                  <div key={i} className="flex justify-center">
                    <AppIconItem 
                        app={app} 
                        onClick={onOpenApp} 
                        restricted={!isAppAllowed(app.name)}
                    />
                  </div>
                ) : <div key={i}></div>
             ))}
             
             {/* Simulated Folder - Locked in Study Mode */}
             <div className="flex justify-center">
                 <div className={`flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform ${isStudyMode ? 'opacity-60' : ''}`}>
                    <div className="w-[62px] h-[62px] bg-[#f0f0f0] rounded-[22px] p-2 grid grid-cols-2 gap-1 place-items-center shadow-sm relative overflow-hidden">
                       <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"><GoogleGIcon size={12} /></div>
                       <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"><GmailIcon size={12} /></div>
                       <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"><PhotosIcon size={12} /></div>
                       <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm"><DriveIcon size={12} /></div>
                       
                       {isStudyMode && (
                           <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
                               <Lock size={20} className="text-slate-600" />
                           </div>
                       )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-700">Google</span>
                 </div>
             </div>
          </div>
      </div>

      {/* 3. Page Indicator */}
      <div className="flex justify-center gap-2 mb-4 shrink-0">
         <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
         <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
         <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
      </div>

      {/* 4. Bottom Dock Area (Separated from scroll) */}
      <div className="px-5 pb-3 shrink-0">
        <div className="grid grid-cols-4 gap-3">
           {dockApps.map(app => (
              <div key={app.id} className="flex justify-center">
                 <AppIconItem 
                    app={app} 
                    onClick={onOpenApp} 
                    noLabel 
                    restricted={!isAppAllowed(app.name)}
                 />
              </div>
           ))}
        </div>
      </div>

      {/* 5. Swipe Handle */}
      <div 
        onClick={onOpenDrawer}
        className="h-6 w-full flex flex-col items-center justify-start cursor-grab active:cursor-grabbing opacity-50 hover:opacity-100"
      >
         <ChevronUp size={16} className="text-slate-400" />
      </div>
    </motion.div>
  );
};

// Helper Component for "Squircle" Icons with Lock Indicator
const AppIconItem = ({ app, onClick, noLabel, restricted }: { app: AppIcon, onClick: (a:AppIcon)=>void, noLabel?: boolean, restricted?: boolean }) => {
    // Determine visual state
    const isActuallyLocked = app.isLocked || restricted;

    return (
        <div 
          onClick={() => onClick(app)}
          className={`flex flex-col items-center gap-1.5 cursor-pointer transition-transform ${isActuallyLocked ? 'active:shake' : 'active:scale-95'}`}
        >
            <div 
                className="w-[62px] h-[62px] rounded-[24px] flex items-center justify-center shadow-md text-white relative overflow-hidden border border-black/5"
                style={{ 
                    backgroundColor: isActuallyLocked ? '#e0e0e0' : app.color,
                }}
            >
                <div className={isActuallyLocked ? "opacity-30 grayscale" : ""}>
                   <app.icon size={30} strokeWidth={2} color={isActuallyLocked ? '#555' : 'white'} />
                </div>
                
                {/* Subtle gloss at top */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
    
                {/* Lock Overlay */}
                {isActuallyLocked && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-7 h-7 bg-white/60 backdrop-blur-[2px] rounded-full flex items-center justify-center shadow-sm">
                            <Lock size={14} className="text-slate-600" strokeWidth={2.5} />
                        </div>
                    </div>
                )}
            </div>
            {!noLabel && (
               <span className={`text-[11px] font-medium text-center leading-tight tracking-tight ${isActuallyLocked ? 'text-slate-400' : 'text-slate-700 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]'}`}>
                 {app.name}
               </span>
            )}
        </div>
    );
};
