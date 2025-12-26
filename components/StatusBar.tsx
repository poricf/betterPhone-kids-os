import React from 'react';
import { Wifi, Battery, Signal, ShieldCheck, MapPinOff, Car } from 'lucide-react';

interface StatusBarProps {
  isOfflineMode: boolean;
  lightMode?: boolean;
  isDrivingModeEnabled?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ isOfflineMode, lightMode = false, isDrivingModeEnabled = false }) => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const textColor = lightMode ? 'text-white' : 'text-slate-900';

  return (
    <div className={`w-full h-10 px-5 flex items-center justify-between text-sm font-medium z-50 select-none shrink-0 transition-colors duration-300 ${isOfflineMode ? 'bg-amber-100/90 backdrop-blur-sm text-amber-800' : `bg-transparent ${textColor}`}`}>
      <div className="flex items-center gap-2 w-24">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</span>
        {isOfflineMode && <span className="font-bold text-[10px] bg-amber-200 px-1 rounded">OFFLINE</span>}
      </div>
      
      {/* Hole punch area spacer */}
      <div className="flex-1"></div>

      <div className="flex items-center gap-2 w-24 justify-end">
        {isDrivingModeEnabled && !isOfflineMode && (
          <Car size={16} className={lightMode ? "text-green-300" : "text-green-600"} />
        )}
        {isOfflineMode ? <MapPinOff size={16} /> : <ShieldCheck size={16} className={lightMode ? "text-green-300" : "text-green-600"} />}
        {!isOfflineMode && <Wifi size={16} />}
        {!isOfflineMode && <Signal size={16} />}
        <Battery size={18} />
      </div>
    </div>
  );
};