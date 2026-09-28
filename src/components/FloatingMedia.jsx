import React from 'react';
import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const FloatingMedia = () => {
  return (
    <div className="fixed bottom-6 left-6 z-[100] group">
      {/* Small closed state */}
      <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg cursor-pointer transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 relative">
        <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=100&auto=format&fit=crop" alt="Music Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-bnd-red/30 flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Expanded state */}
      <div className="absolute bottom-0 left-0 w-64 bg-bnd-dark/80 backdrop-blur-md border border-white/10 rounded-xl p-3 opacity-0 scale-95 origin-bottom-left transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
          <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=100&auto=format&fit=crop" alt="Music Cover" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-display font-medium truncate">Brand New Day Theme</p>
          <p className="text-white/50 text-[10px] uppercase tracking-wider truncate">Spider-Man OST</p>
          
          <div className="flex items-center gap-2 mt-1.5 text-white/70">
            <SkipBack size={12} className="cursor-pointer hover:text-white" />
            <Play size={14} className="cursor-pointer hover:text-white" />
            <SkipForward size={12} className="cursor-pointer hover:text-white" />
            <div className="flex-1"></div>
            <Volume2 size={12} className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMedia;
