import React, { useState } from 'react';
import { Phone, Star, Clock, Users, Delete } from 'lucide-react';

export const PhoneView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [number, setNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'favorites' | 'recents' | 'contacts' | 'keypad'>('keypad');

  const handlePress = (num: string) => {
    if (number.length < 15) setNumber(prev => prev + num);
  };

  const handleDelete = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  const favorites = [
    { name: 'Mom', color: '#FFB4AB' },
    { name: 'Dad', color: '#C4E7FF' },
    { name: 'Grandma', color: '#E1E2EC' }
  ];

  return (
    <div className="flex flex-col h-full bg-white font-sans relative">
       {/* Search Bar Area with Safe Padding */}
       <div className="pt-16 px-4 pb-2 shrink-0">
          <div className="bg-[#f0f4f8] h-12 rounded-full flex items-center px-4 gap-3 text-slate-500">
             <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">A</div>
             <span className="text-base font-normal">Search contacts & places</span>
          </div>
       </div>

       {/* Favorites Section (Quick Dial) */}
       <div className="px-4 py-4 shrink-0">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Favorites</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
             {favorites.map((fav, i) => (
               <div key={i} className="flex flex-col items-center gap-2 min-w-[64px]">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-slate-800 text-xl font-medium shadow-sm border border-slate-100" style={{ backgroundColor: fav.color }}>
                     {fav.name[0]}
                  </div>
                  <span className="text-xs font-medium text-slate-700">{fav.name}</span>
               </div>
             ))}
          </div>
       </div>

       {/* Spacer to push keypad down */}
       <div className="flex-1 min-h-4"></div>

       {/* Dialer Display */}
       <div className="flex flex-col items-center justify-center mb-2 min-h-[4rem] shrink-0">
          <span className="text-4xl font-normal text-slate-900 tracking-wider h-10">
             {number}
          </span>
          <span className={`text-sm text-blue-600 font-medium mt-1 transition-opacity ${number ? 'opacity-100' : 'opacity-0'}`}>
             Add to contacts
          </span>
       </div>

       {/* Keypad */}
       <div className="px-8 pb-24 shrink-0">
          {/* Keypad Grid */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-5 mb-6">
             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button 
                  key={num}
                  onClick={() => handlePress(num.toString())}
                  className="w-full aspect-square rounded-full flex flex-col items-center justify-center active:bg-slate-100 transition-colors"
                >
                   <span className="text-3xl font-normal text-slate-800">{num}</span>
                   {num === 1 && <span className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5">➿</span>}
                   {num > 1 && <span className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5">
                      {['ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'][num-2]}
                   </span>}
                </button>
             ))}
             
             {/* Star Button */}
             <button 
               className="w-full aspect-square rounded-full flex items-center justify-center active:bg-slate-100 transition-colors"
             >
                <span className="text-3xl text-slate-400 font-normal">*</span>
             </button>

             {/* Zero Button */}
             <button 
                onClick={() => handlePress('0')}
                className="w-full aspect-square rounded-full flex flex-col items-center justify-center active:bg-slate-100 transition-colors"
             >
                <span className="text-3xl font-normal text-slate-800">0</span>
                <span className="text-[10px] text-slate-400 font-bold tracking-widest mt-0.5">+</span>
             </button>

             {/* Hash Button */}
             <button 
               className="w-full aspect-square rounded-full flex items-center justify-center active:bg-slate-100 transition-colors"
             >
                <span className="text-2xl text-slate-400 font-normal">#</span>
             </button>
          </div>

          {/* Call Button Row */}
          <div className="flex items-center justify-center relative h-16">
             {/* Call Button */}
             <button className="w-16 h-16 bg-blue-600 rounded-[24px] shadow-lg flex items-center justify-center text-white active:scale-95 transition-transform z-10">
                <Phone size={28} fill="currentColor" />
             </button>
             
             {/* Backspace Button - Absolute Positioned relative to this row */}
             {number && (
                 <button onClick={handleDelete} className="absolute right-6 text-slate-500 p-4 hover:text-slate-700 active:scale-90 transition-transform">
                    <Delete size={26} />
                 </button>
             )}
          </div>
       </div>

       {/* Bottom Tabs */}
       <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-slate-100 bg-white/95 backdrop-blur flex items-center justify-around pb-1 z-20">
          <TabButton icon={Star} label="Favorites" active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
          <TabButton icon={Clock} label="Recents" active={activeTab === 'recents'} onClick={() => setActiveTab('recents')} />
          <TabButton icon={Users} label="Contacts" active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')} />
          <div className="flex flex-col items-center justify-center w-16 opacity-100">
             <div className="w-12 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 mb-1">
                <span className="font-bold text-xs">:::</span>
             </div>
             <span className="text-[10px] font-bold text-slate-800">Keypad</span>
          </div>
       </div>
    </div>
  );
};

const TabButton = ({ icon: Icon, label, active, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center w-16 opacity-70 hover:opacity-100 active:opacity-50">
     <Icon size={24} className={active ? 'text-blue-600' : 'text-slate-600'} />
     <span className={`text-[10px] mt-1 ${active ? 'text-blue-600 font-bold' : 'text-slate-600 font-medium'}`}>{label}</span>
  </button>
);