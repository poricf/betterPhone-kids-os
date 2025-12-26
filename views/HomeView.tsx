
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
      className="flex flex-col h-full relative font-sans touch-none overflow-hidden"
      onPanEnd={handleSwipe}
    >
      {/* Main Scrollable Area */}
      <div className="flex-1 flex flex-col px-4 overflow-y-auto no-scrollbar">
          
          {/* Weather / Focus Widget */}
          <div className="flex justify-center mb-4 mt-1">
             {isStudyMode ? (
                <div className="w-full bg-gradient-to-br from-indigo-600 to-violet-800 rounded-[20px] p-4 text-white flex flex-row items-center justify-between shadow-lg relative overflow-hidden">
                   <div className="z-10 flex flex-col justify-center">
                       <h2 className="text-lg font-bold tracking-tight mb-1">Study Mode</h2>
                       <p className="text-xs text-indigo-100 max-w-[120px] leading-tight opacity-90">Focus time active</p>
                   </div>
                   <div className="z-10 bg-white/10 p-3 rounded-full backdrop-blur-sm">
                      <BookOpen size={32} className="text-white" />
                   </div>
                   <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 blur-3xl rounded-full pointer-events-none"></div>
                </div>
             ) : (
                <div className="w-full bg-gradient-to-br from-[#203a6b] to-[#12203a] rounded-[20px] p-4 text-white flex flex-row items-center justify-between shadow-lg relative overflow-hidden">
                    <div className="z-10 flex flex-col">
                       <h2 className="text-4xl font-light tracking-tight">22°</h2>
                       <p className="text-xs text-gray-300 mt-0.5 font-medium">Los Angeles</p>
                       <p className="text-[10px] text-gray-400 mt-1 max-w-[100px] leading-tight">Partly cloudy. High of 24° low of 18°.</p>
                    </div>
                    <div className="z-10">
                       <Cloud size={48} className="text-white/90 drop-shadow-md" />
                    </div>
                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>
                 </div>
             )}
          </div>

          {/* Google Search Pill */}
          <div className={`mb-4 bg-[#f5f5f5]/90 backdrop-blur-md rounded-full h-11 flex items-center px-4 shadow-sm border border-white/40 transition-opacity ${isStudyMode ? 'opacity-50 grayscale' : ''}`}>
             <div className="w-5 h-5 flex items-center justify-center mr-3">
                 <GoogleGIcon size={18} />
             </div>
             <input type="text" disabled className="bg-transparent flex-1 outline-none text-slate-800 text-sm placeholder:text-gray-500 cursor-default" placeholder="Search" />
             <Mic size={18} className="text-gray-500 mr-3" />
             <Camera size={18} className="text-gray-500" />
          </div>

          {/* Main App Grid */}
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
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
             
             {/* Folder */}
             <div className="flex justify-center">
                 <div className={`flex flex-col items-center gap-1 cursor-pointer active:scale-95 transition-transform ${isStudyMode ? 'opacity-60' : ''}`}>
                    <div className="w-[54px] h-[54px] bg-[#f0f0f0] rounded-[18px] p-1.5 grid grid-cols-2 gap-0.5 place-items-center shadow-sm relative overflow-hidden">
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"><GoogleGIcon size={10} /></div>
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"><GmailIcon size={10} /></div>
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"><PhotosIcon size={10} /></div>
                       <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"><DriveIcon size={10} /></div>
                       
                       {isStudyMode && (
                           <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
                               <Lock size={16} className="text-slate-600" />
                           </div>
                       )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-700">Google</span>
                 </div>
             </div>
          </div>
      </div>

      {/* Page Indicator */}
      <div className="flex justify-center gap-1.5 py-2 shrink-0">
         <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
         <div className="w-1.5 h-1.5 rounded-full bg-white/70"></div>
         <div className="w-1.5 h-1.5 rounded-full bg-white/30"></div>
      </div>

      {/* Bottom Dock */}
      <div className="px-4 pb-2 shrink-0">
        <div className="grid grid-cols-4 gap-2">
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

      {/* Swipe Handle */}
      <div 
        onClick={onOpenDrawer}
        className="h-5 w-full flex items-center justify-center cursor-grab shrink-0"
      >
         <div className="w-8 h-1 bg-white/40 rounded-full"></div>
      </div>
    </motion.div>
  );
};

// App Icon Component
const AppIconItem = ({ app, onClick, noLabel, restricted }: { app: AppIcon, onClick: (a:AppIcon)=>void, noLabel?: boolean, restricted?: boolean }) => {
    const isActuallyLocked = app.isLocked || restricted;

    return (
        <div 
          onClick={() => onClick(app)}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-transform ${isActuallyLocked ? 'active:shake' : 'active:scale-95'}`}
        >
            <div 
                className="w-[54px] h-[54px] rounded-[18px] flex items-center justify-center shadow-md text-white relative overflow-hidden border border-black/5"
                style={{ 
                    backgroundColor: isActuallyLocked ? '#e0e0e0' : app.color,
                }}
            >
                <div className={isActuallyLocked ? "opacity-30 grayscale" : ""}>
                   <app.icon size={26} strokeWidth={2} color={isActuallyLocked ? '#555' : 'white'} />
                </div>
                
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
    
                {isActuallyLocked && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-6 h-6 bg-white/60 backdrop-blur-[2px] rounded-full flex items-center justify-center shadow-sm">
                            <Lock size={12} className="text-slate-600" strokeWidth={2.5} />
                        </div>
                    </div>
                )}
            </div>
            {!noLabel && (
               <span className={`text-[10px] font-medium text-center leading-tight ${isActuallyLocked ? 'text-slate-400' : 'text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'}`}>
                 {app.name}
               </span>
            )}
        </div>
    );
};
