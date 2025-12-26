import React, { useEffect, useState } from 'react';
import { Phone, MapPin, CheckCircle, ShieldAlert, Database, WifiOff, Cloud } from 'lucide-react';
import { motion } from 'framer-motion';

interface SafetyViewProps {
  isOffline: boolean;
  bufferCount: number;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ isOffline, bufferCount }) => {
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      alert("SOS Signal Sent (Cached for upload if offline)");
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const startSOS = () => setCountdown(3);
  const cancelSOS = () => setCountdown(null);

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Standard App Header */}
      <div className={`h-16 flex items-center justify-center border-b relative transition-colors ${isOffline ? 'bg-amber-50 border-amber-100' : 'bg-white border-slate-100'}`}>
         <h1 className="text-lg font-medium text-slate-800">Safety Hub</h1>
         {isOffline && (
           <div className="absolute right-4 top-1/2 -translate-y-1/2">
             <WifiOff size={18} className="text-amber-600" />
           </div>
         )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        
        {/* Status Card */}
        <div className={`rounded-xl p-4 flex items-center gap-4 mb-6 border transition-colors ${isOffline ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-100'}`}>
           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isOffline ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
              {isOffline ? <Database size={20} /> : <CheckCircle size={20} />}
           </div>
           <div className="flex-1">
              <h3 className={`font-bold text-sm ${isOffline ? 'text-amber-900' : 'text-green-900'}`}>
                {isOffline ? 'Offline Safety Cache' : 'System Protected'}
              </h3>
              <p className={`text-xs ${isOffline ? 'text-amber-700' : 'text-green-700'}`}>
                {isOffline ? `Recording location to buffer (${bufferCount} pts)` : 'Real-time monitoring active'}
              </p>
           </div>
        </div>
        
        {/* Emergency SOS Section */}
        <div className="flex flex-col items-center justify-center mb-8">
           <button 
            onClick={countdown !== null ? cancelSOS : startSOS}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-200 relative ${
              countdown !== null ? 'bg-white text-red-600 border-4 border-red-500 scale-105' : 'bg-red-600 text-white active:scale-95'
            }`}
          >
            <ShieldAlert size={40} className="mb-1" />
            <span className="text-xl font-bold">{countdown !== null ? countdown : "SOS"}</span>
            <span className="text-[10px] font-medium opacity-80 mt-1 uppercase tracking-wider">Hold for Help</span>
            
            {countdown !== null && (
               <motion.div 
                 className="absolute inset-0 rounded-full border-4 border-red-500"
                 animate={{ scale: [1, 1.4], opacity: [1, 0] }}
                 transition={{ repeat: Infinity, duration: 1 }}
               />
            )}
          </button>
          <p className="text-xs text-slate-400 mt-4 text-center max-w-[200px]">
            {isOffline ? 'SOS signal will be sent via SMS fallback or queued for immediate upload.' : 'Pressing SOS instantly alerts parents and services.'}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <MapPin className="text-blue-600 mb-2" size={20} />
                <h4 className="font-bold text-slate-800 text-sm">Location</h4>
                <p className="text-xs text-slate-500">
                  {isOffline ? 'Buffering...' : 'Live Sharing'}
                </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <Cloud className="text-slate-600 mb-2" size={20} />
                <h4 className="font-bold text-slate-800 text-sm">Data Sync</h4>
                <p className="text-xs text-slate-500">
                   {isOffline ? 'Pending Upload' : 'Up to date'}
                </p>
            </div>
        </div>

        <h3 className="text-sm font-bold text-slate-900 mb-3">Offline-Ready Contacts</h3>
        <div className="space-y-2">
             <ContactItem name="Mom" />
             <ContactItem name="Dad" />
             <ContactItem name="911" isRed />
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ name, isRed }: any) => (
   <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg active:bg-slate-50">
      <span className="font-medium text-slate-700">{name}</span>
      <button className={`p-2 rounded-full ${isRed ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
         <Phone size={16} />
      </button>
   </div>
);