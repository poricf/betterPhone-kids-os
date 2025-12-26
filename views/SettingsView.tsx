
import React from 'react';
import { ArrowLeft, Wifi, Bluetooth, Moon, Shield, Smartphone, Bell, User, Search, Lock, WifiOff, Car, PlayCircle, BookOpen, Clock } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  isUploadingBuffer: boolean;
  onLock: () => void;
  isDrivingModeEnabled: boolean;
  toggleDrivingMode: () => void;
  triggerDrivingSimulation: () => void;
  isStudyMode: boolean;
  toggleStudyMode: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ 
  onBack, 
  isOfflineMode, 
  toggleOfflineMode, 
  isUploadingBuffer, 
  onLock,
  isDrivingModeEnabled,
  toggleDrivingMode,
  triggerDrivingSimulation,
  isStudyMode,
  toggleStudyMode
}) => {
  return (
    <div className="h-full bg-[#f2f2f2] flex flex-col font-sans">
      {/* Header Area with Safe Area Padding */}
      <div className="pt-16 px-6 pb-6 bg-[#f2f2f2] sticky top-0 z-10">
        <div className="flex items-center justify-between mb-6">
             <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors">
                <ArrowLeft size={24} className="text-[#1f1f1f]" />
             </button>
             <div className="w-9 h-9 bg-[#C2E7FF] rounded-full flex items-center justify-center text-[#001D35] font-bold text-sm">
                 A
             </div>
        </div>
        <h1 className="text-4xl font-normal text-[#1f1f1f] tracking-tight mb-4">Settings</h1>
        
        {/* Search Bar */}
        <div className="bg-[#e2e2e2] h-12 rounded-full flex items-center px-4 gap-3 text-slate-500 mb-2">
            <Search size={20} />
            <span className="text-base">Search settings</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24">
        
        {/* Safety Card (Top Priority) */}
        <div className="mb-4 bg-[#C2E7FF] rounded-[28px] p-5 flex items-center gap-4 text-[#001d35] shadow-sm">
           <div className="bg-white/30 p-3 rounded-full">
               <Shield size={24} />
           </div>
           <div>
             <h2 className="font-semibold text-lg leading-tight">Safety Shield</h2>
             <p className="text-sm opacity-80 leading-tight mt-1">Status: Protected & Monitoring</p>
           </div>
        </div>

        <h3 className="ml-4 mb-2 text-sm font-medium text-slate-500 mt-2">Modes & Routines</h3>
        <div className="bg-[#fcfcfc] rounded-[28px] overflow-hidden shadow-sm mb-4">
           {/* Driving Mode Toggle */}
           <div className="flex items-center py-5 px-5 active:bg-slate-50 transition-colors cursor-pointer relative select-none" onClick={toggleDrivingMode}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${isDrivingModeEnabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                 <Car size={24} />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[17px] text-[#1f1f1f] font-normal leading-tight">Driving Mode</span>
                <span className="text-[13px] text-[#444746] mt-0.5">Allow Maps/Music only</span>
              </div>
               {/* Switch UI */}
              <div className={`w-11 h-6 rounded-full transition-colors relative ${isDrivingModeEnabled ? 'bg-green-500' : 'bg-slate-300'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isDrivingModeEnabled ? 'left-6' : 'left-1'}`}></div>
              </div>
              <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-100"></div>
           </div>

           {/* Study Mode Toggle */}
           <div className="flex items-center py-5 px-5 active:bg-slate-50 transition-colors cursor-pointer relative select-none" onClick={toggleStudyMode}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${isStudyMode ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>
                 <BookOpen size={24} />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[17px] text-[#1f1f1f] font-normal leading-tight">Study Time</span>
                <span className="text-[13px] text-[#444746] mt-0.5">Block games & social apps</span>
              </div>
               {/* Switch UI */}
              <div className={`w-11 h-6 rounded-full transition-colors relative ${isStudyMode ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isStudyMode ? 'left-6' : 'left-1'}`}></div>
              </div>
           </div>
        </div>

        {/* Group 1 */}
        <div className="bg-[#fcfcfc] rounded-[28px] overflow-hidden shadow-sm mb-4">
           <SettingItem icon={Wifi} label="Network & internet" value="Home WiFi" border />
           <SettingItem icon={Bluetooth} label="Connected devices" value="Bluetooth on" border />
           <SettingItem icon={Smartphone} label="Apps" value="Recent: Tasks, Maps" />
        </div>

        {/* Group 2 */}
        <div className="bg-[#fcfcfc] rounded-[28px] overflow-hidden shadow-sm mb-4">
           <SettingItem icon={Bell} label="Notifications" border />
           <SettingItem icon={Moon} label="Digital Wellbeing" value="Focus mode off" />
        </div>

        {/* Demo Controls Group */}
        <h3 className="ml-4 mb-2 text-sm font-medium text-slate-500 mt-6">Demo Controls</h3>
        <div className="bg-[#fcfcfc] rounded-[28px] overflow-hidden shadow-sm mb-4">
           {/* Offline Toggle */}
           <div 
             onClick={!isUploadingBuffer ? toggleOfflineMode : undefined} 
             className={`flex items-center py-5 px-5 active:bg-slate-50 transition-colors cursor-pointer relative select-none ${isUploadingBuffer ? 'opacity-50' : ''}`}
           >
              <WifiOff size={24} className={`mr-4 ${isOfflineMode ? 'text-amber-600' : 'text-[#444746]'}`} />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[17px] text-[#1f1f1f] font-normal leading-tight">Offline Mode</span>
                <span className="text-[13px] text-[#444746] mt-0.5">
                    {isUploadingBuffer ? 'Syncing...' : (isOfflineMode ? 'Simulating no signal' : 'Online')}
                </span>
              </div>
              <div className={`w-11 h-6 rounded-full transition-colors relative ${isOfflineMode ? 'bg-amber-500' : 'bg-slate-300'}`}>
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isOfflineMode ? 'left-6' : 'left-1'}`}></div>
              </div>
              <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-100"></div>
           </div>
           
           {/* Simulate Driving */}
           <div onClick={triggerDrivingSimulation} className="flex items-center py-5 px-5 active:bg-slate-50 transition-colors cursor-pointer relative select-none">
              <PlayCircle size={24} className="text-[#444746] mr-4" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[17px] text-[#1f1f1f] font-normal leading-tight">Simulate Driving Motion</span>
                <span className="text-[13px] text-[#444746] mt-0.5">Triggers auto-pause if enabled</span>
              </div>
              <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-100"></div>
           </div>

           {/* Lock Button */}
           <div onClick={onLock} className="flex items-center py-5 px-5 active:bg-slate-50 transition-colors cursor-pointer relative select-none">
              <Lock size={24} className="text-[#444746] mr-4" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[17px] text-[#1f1f1f] font-normal leading-tight">Lock Device</span>
              </div>
           </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4 mb-8 font-medium">
          BetterPhone OS 2.0
        </p>
      </div>
    </div>
  );
};

const SettingItem = ({ icon: Icon, label, value, border }: any) => (
  <div className="flex items-center py-5 px-5 active:bg-slate-50 transition-colors cursor-pointer relative">
    <Icon size={24} className="text-[#444746] mr-4" />
    <div className="flex-1 flex flex-col justify-center">
      <span className="text-[17px] text-[#1f1f1f] font-normal leading-tight">{label}</span>
      {value && <span className="text-[13px] text-[#444746] mt-0.5">{value}</span>}
    </div>
    {border && <div className="absolute bottom-0 left-16 right-0 h-px bg-slate-100"></div>}
  </div>
);
