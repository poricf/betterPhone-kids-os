import React, { useState } from 'react';
import { generateBedtimeStory } from '../services/geminiService';
import { Play, SkipForward, ArrowLeft, Loader2, WifiOff, Download } from 'lucide-react';

interface StoryViewProps {
  onBack: () => void;
  isOffline: boolean;
}

export const StoryView: React.FC<StoryViewProps> = ({ onBack, isOffline }) => {
  const [theme, setTheme] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  // Cached stories simulation
  const cachedStories = [
    { title: 'The Brave Little Robot', duration: '5 min', theme: 'Robots' },
    { title: 'Sleepy Bear\'s Picnic', duration: '7 min', theme: 'Animals' },
    { title: 'Moonlight Adventure', duration: '4 min', theme: 'Space' }
  ];

  const handleGenerate = async () => {
    if (!theme || isOffline) return;
    setLoading(true);
    const result = await generateBedtimeStory(theme, "Alex");
    setStory(result);
    setLoading(false);
  };

  const handlePlayCached = (title: string) => {
    setStory(`(Playing cached version of ${title})...\n\nOnce upon a time in a digital library stored safely on this device...`);
    setTheme(title);
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Header */}
      <div className="pt-12 pb-4 px-4 flex items-center gap-4 bg-white sticky top-0 z-10 border-b border-slate-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-50 active:bg-slate-100">
          <ArrowLeft size={24} className="text-slate-800" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Audiobooks & Stories</h1>
        {isOffline && <WifiOff size={16} className="text-slate-400 ml-auto" />}
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        {!story ? (
          <div className="flex flex-col">
            {/* AI Generator Section - Disabled if Offline */}
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
               Create New Story
               {isOffline && <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Unavailable Offline</span>}
            </h2>
            
            <div className={`grid grid-cols-2 gap-3 mb-6 transition-opacity ${isOffline ? 'opacity-50 pointer-events-none' : ''}`}>
               {['Space Adventure', 'Friendly Dragon', 'Underwater City', 'Magic Forest'].map(t => (
                 <button 
                   key={t}
                   onClick={() => setTheme(t)}
                   className={`p-4 rounded-xl text-left border transition-all ${theme === t ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                 >
                   <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mb-2 text-xl">
                      {t.includes('Space') ? '🚀' : t.includes('Dragon') ? '🐉' : t.includes('Underwater') ? '🐳' : '🌲'}
                   </div>
                   <span className={`block text-sm font-bold ${theme === t ? 'text-blue-700' : 'text-slate-700'}`}>{t}</span>
                 </button>
               ))}
            </div>

            <button 
              disabled={!theme || loading || isOffline}
              onClick={handleGenerate}
              className="w-full bg-slate-900 py-4 rounded-xl font-bold text-white shadow-md disabled:opacity-50 disabled:bg-slate-300 flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              {loading ? <Loader2 className="animate-spin" size={20}/> : <Play size={20} fill="currentColor" />}
              {loading ? 'Generating...' : 'Generate & Play'}
            </button>
            
            {/* Offline/Cached Section */}
            <div className="mt-8">
               <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Download size={14} /> Offline Library
               </h3>
               <div className="space-y-3">
                  {cachedStories.map((s, i) => (
                    <div key={i} onClick={() => handlePlayCached(s.title)} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 active:bg-slate-100 cursor-pointer">
                       <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">
                          {i + 1}
                       </div>
                       <div className="flex-1">
                          <h4 className="text-sm font-bold text-slate-800">{s.title}</h4>
                          <p className="text-xs text-slate-500">{s.theme} • {s.duration}</p>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <Play size={14} fill="currentColor" className="text-slate-800 ml-0.5" />
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 bg-slate-50 rounded-2xl p-6 mb-6 overflow-y-auto border border-slate-100">
               <h2 className="text-xl font-bold text-slate-900 mb-4 text-center font-serif">{theme}</h2>
               <p className="text-base leading-relaxed text-slate-700 whitespace-pre-wrap font-serif">
                  {story}
               </p>
            </div>
            
            {/* Player Controls */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                   <div className="text-xs font-medium text-slate-400">0:00</div>
                   <div className="text-xs font-medium text-slate-400">3:45</div>
                </div>
                <div className="h-1 bg-slate-700 rounded-full mb-4">
                   <div className="w-0 h-full bg-white rounded-full"></div>
                </div>
                <div className="flex items-center justify-center gap-6">
                   <button onClick={() => setStory('')} className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wide">Back</button>
                   <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm active:scale-95">
                      <Play size={24} fill="currentColor" className="ml-0.5" />
                   </button>
                   <button className="text-slate-400 hover:text-white">
                      <SkipForward size={24} fill="currentColor" />
                   </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};