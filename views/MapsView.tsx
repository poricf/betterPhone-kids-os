import React, { useEffect, useState } from 'react';
import { Navigation, Menu, WifiOff, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface MapsViewProps {
  isOffline: boolean;
}

export const MapsView: React.FC<MapsViewProps> = ({ isOffline }) => {
  // Simulate moving location
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
       setRotation(r => r + 5);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full bg-[#e5e3df] overflow-hidden">
      {/* Map Background Pattern - Simulated */}
      <div className={`absolute inset-0 opacity-40 transition-all duration-500 ${isOffline ? 'grayscale contrast-125' : ''}`} 
           style={{ 
             backgroundImage: 'radial-gradient(#cad2c5 2px, transparent 2px), radial-gradient(#cad2c5 2px, transparent 2px)',
             backgroundSize: '30px 30px',
             backgroundPosition: '0 0, 15px 15px'
           }}>
      </div>
      
      {/* Streets (CSS Drawing) */}
      <div className={`absolute top-0 bottom-0 left-1/3 w-8 bg-white border-x border-slate-300 transform -skew-x-12 transition-all ${isOffline ? 'bg-slate-100' : ''}`}></div>
      <div className={`absolute top-1/3 left-0 right-0 h-8 bg-white border-y border-slate-300 transform skew-y-6 transition-all ${isOffline ? 'bg-slate-100' : ''}`}></div>
      
      {/* Parks */}
      <div className={`absolute top-10 right-10 w-40 h-40 rounded-full opacity-80 mix-blend-multiply transition-colors ${isOffline ? 'bg-slate-300' : 'bg-[#cdeac0]'}`}></div>

      {/* UI Controls */}
      <div className="absolute top-14 left-4 right-4 z-10 flex flex-col gap-2">
         <div className="bg-white rounded-xl shadow-lg p-3 flex items-center gap-3">
            <Menu size={20} className="text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Home</span>
            <div className="flex-1"></div>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              A
            </div>
         </div>
         {isOffline && (
            <motion.div 
               initial={{ opacity: 0, y: -10 }} 
               animate={{ opacity: 1, y: 0 }}
               className="bg-amber-100 border border-amber-200 text-amber-800 px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm"
            >
               <WifiOff size={14} />
               Offline Mode: Showing cached neighborhood map
            </motion.div>
         )}
      </div>

      {/* Current Location Marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
         <div className="relative">
             {!isOffline && <div className="absolute -inset-8 bg-blue-500/20 rounded-full animate-ping"></div>}
             <div className={`w-16 h-16 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full transform -translate-x-1/2 transition-opacity ${isOffline ? 'opacity-50' : 'opacity-100'}`} 
                  style={{ transform: `rotate(${rotation}deg)` }}></div>
             <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg ${isOffline ? 'bg-slate-500' : 'bg-blue-500'}`}></div>
         </div>
      </div>

      {/* Bottom Card */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="absolute bottom-24 left-4 right-4 bg-white rounded-2xl p-4 shadow-xl z-10"
      >
         <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-full ${isOffline ? 'bg-slate-100 text-slate-600' : 'bg-green-100 text-green-700'}`}>
               {isOffline ? <Download size={20} /> : <Navigation size={20} fill="currentColor" />}
            </div>
            <div>
               <h3 className="font-bold text-slate-800 text-sm">
                  {isOffline ? 'Downloaded Area' : 'Safe Zone Active'}
               </h3>
               <p className="text-xs text-slate-500">
                  {isOffline ? 'Navigation limited to saved routes.' : 'You are in the neighborhood.'}
               </p>
            </div>
         </div>
         <div className="flex gap-2">
            <button disabled={isOffline} className="flex-1 bg-slate-100 py-2 rounded-lg text-xs font-bold text-slate-700 disabled:opacity-50">Share Location</button>
            <button className="flex-1 bg-slate-100 py-2 rounded-lg text-xs font-bold text-slate-700">Get Home</button>
         </div>
      </motion.div>
    </div>
  );
};