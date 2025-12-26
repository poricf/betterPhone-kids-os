import React, { useRef, useEffect, useState } from 'react';
import { Camera, RefreshCw, X } from 'lucide-react';

export const CameraView: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setHasPermission(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative h-full bg-black text-white flex flex-col">
      {/* Viewport */}
      <div className="flex-1 relative overflow-hidden rounded-b-3xl">
        {hasPermission === true ? (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900">
            <p className="text-sm text-slate-400">Camera permission needed</p>
          </div>
        )}
        
        {/* UI Overlay */}
        <div className="absolute top-14 left-4 right-4 flex justify-between">
             <button onClick={onClose} className="p-2 bg-black/20 backdrop-blur rounded-full">
                <X size={20} />
             </button>
        </div>
      </div>

      {/* Controls */}
      <div className="h-32 bg-black flex items-center justify-around px-8 pb-4">
         <div className="w-12 h-12 bg-slate-800 rounded-lg overflow-hidden border border-slate-700">
             {/* Gallery Preview Placeholder */}
         </div>
         
         <button className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center active:scale-95 transition-transform">
             <div className="w-16 h-16 bg-white rounded-full"></div>
         </button>

         <button className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center">
             <RefreshCw size={20} />
         </button>
      </div>
    </div>
  );
};