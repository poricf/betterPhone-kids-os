import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Bluetooth, Flashlight, Moon, RotateCcw, Plane, Sun, Settings, X, Bell, Car } from 'lucide-react';

interface NotificationPanelProps {
  onClose: () => void;
  isOpen: boolean;
  isDrivingModeEnabled: boolean;
  onToggleDrivingMode: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ onClose, isOpen, isDrivingModeEnabled, onToggleDrivingMode }) => {
  const [brightness, setBrightness] = React.useState(80);
  
  // Quick Settings Toggles
  const toggles = [
    { icon: Wifi, label: 'WiFi', active: true, onClick: () => {} },
    { icon: Bluetooth, label: 'Bluetooth', active: true, onClick: () => {} },
    { icon: Car, label: 'Driving', active: isDrivingModeEnabled, onClick: onToggleDrivingMode },
    { icon: Flashlight, label: 'Flashlight', active: false, onClick: () => {} },
    { icon: Moon, label: 'DND', active: false, onClick: () => {} },
    { icon: RotateCcw, label: 'Rotate', active: false, onClick: () => {} },
  ];

  const notifications = [
    { id: 1, app: 'Messages', title: 'Mom', text: 'Dinner is in 10 minutes!', time: '2m ago', color: 'bg-blue-500' },
    { id: 2, app: 'Tasks', title: 'Homework', text: 'Math worksheet due tomorrow', time: '1h ago', color: 'bg-orange-500' },
    { id: 3, app: 'Games', title: 'Daily Reward', text: 'Your chest is ready to open', time: '3h ago', color: 'bg-pink-500' },
  ];

  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isOpen ? '0%' : '-100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.y < -50) onClose();
      }}
      className="absolute inset-0 bg-black/95 backdrop-blur-xl z-[60] text-white flex flex-col pt-10 rounded-[24px] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 flex justify-between items-center mb-8">
        <span className="text-xl font-medium">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <div className="flex gap-4">
           <button className="p-2 bg-white/10 rounded-full hover:bg-white/20">
              <Settings size={20} />
           </button>
        </div>
      </div>

      {/* Quick Toggles Grid */}
      <div className="px-6 grid grid-cols-4 gap-y-6 gap-x-2 mb-8">
         {toggles.map((t, i) => (
           <div key={i} className="flex flex-col items-center gap-2">
              <button 
                onClick={t.onClick}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${t.active ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}
              >
                 <t.icon size={24} />
              </button>
              <span className="text-[10px] font-medium text-slate-300 text-center leading-tight">{t.label}</span>
           </div>
         ))}
      </div>

      {/* Brightness Slider */}
      <div className="px-6 mb-8">
         <div className="bg-slate-800/80 rounded-2xl h-14 flex items-center px-4 gap-3">
             <Sun size={20} className="text-slate-400" />
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={brightness}
               onChange={(e) => setBrightness(parseInt(e.target.value))}
               className="flex-1 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
             />
         </div>
      </div>

      {/* Notifications Section */}
      <div className="flex-1 bg-slate-900/50 rounded-t-[32px] p-6 overflow-y-auto">
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-slate-300">Notifications</h3>
            <button onClick={onClose} className="text-xs text-slate-500 font-medium">Clear</button>
         </div>

         <div className="space-y-3">
            {notifications.map(n => (
              <div key={n.id} className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                 <div className="flex items-center gap-2 mb-1">
                    <div className={`w-5 h-5 rounded-md ${n.color} flex items-center justify-center`}>
                       <Bell size={10} fill="currentColor" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">{n.app}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">{n.time}</span>
                 </div>
                 <h4 className="font-semibold text-sm mb-0.5">{n.title}</h4>
                 <p className="text-xs text-slate-400">{n.text}</p>
              </div>
            ))}
         </div>
      </div>

      {/* Close Handle */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center pb-2 pt-4 bg-gradient-to-t from-black/50 to-transparent" onClick={onClose}>
         <div className="w-12 h-1 bg-white/30 rounded-full"></div>
      </div>
    </motion.div>
  );
};