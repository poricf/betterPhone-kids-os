import React from 'react';
import { ArrowLeft, Heart, Share2, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

export const GalleryView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const photos = [
    'https://images.unsplash.com/photo-1517021897933-0e03195bbbf2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?auto=format&fit=crop&w=300&q=80',
  ];

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="pt-12 px-4 pb-4 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100">
                <ArrowLeft size={24} className="text-slate-800" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">Gallery</h1>
        </div>
        <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-slate-100"><Share2 size={20} /></button>
            <button className="p-2 rounded-full hover:bg-slate-100"><MoreVertical size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-1">
        <div className="grid grid-cols-3 gap-1">
            {photos.map((src, i) => (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    key={i} 
                    className={`aspect-square bg-slate-100 relative overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                    <img src={src} alt="Gallery item" className="w-full h-full object-cover" />
                    <button className="absolute bottom-2 right-2 text-white drop-shadow-md">
                        <Heart size={16} />
                    </button>
                </motion.div>
            ))}
        </div>
        <div className="p-4 text-center">
            <span className="text-xs text-slate-400 font-medium">6 Photos • 2 Albums</span>
        </div>
      </div>
    </div>
  );
};
