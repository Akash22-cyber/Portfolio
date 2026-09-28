import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const FloatingMedia = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100] group">
      <audio ref={audioRef} src="/music.mp3" loop />
      
      {/* Small closed state */}
      <div 
        onClick={togglePlay}
        className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg cursor-pointer transition-all duration-300 group-hover:opacity-0 group-hover:scale-50 relative"
      >
        <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=100&auto=format&fit=crop" alt="Music Cover" className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
        <div className="absolute inset-0 bg-bnd-red/30 flex items-center justify-center backdrop-blur-[2px]">
          {isPlaying ? (
            <div className="flex gap-1 items-end h-3">
              <span className="w-0.5 h-full bg-white animate-[bounce_1s_infinite_alternate]"></span>
              <span className="w-0.5 h-2/3 bg-white animate-[bounce_0.8s_infinite_alternate]"></span>
              <span className="w-0.5 h-full bg-white animate-[bounce_1.2s_infinite_alternate]"></span>
            </div>
          ) : (
            <Play size={16} className="text-white fill-white ml-0.5" />
          )}
        </div>
      </div>

      {/* Expanded state */}
      <div className="absolute bottom-0 left-0 w-64 bg-bnd-dark/80 backdrop-blur-md border border-white/10 rounded-xl p-3 opacity-0 scale-95 origin-bottom-left transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 relative">
          <img src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=100&auto=format&fit=crop" alt="Music Cover" className={`w-full h-full object-cover ${isPlaying ? 'scale-110 transition-transform duration-[10s]' : ''}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-display font-medium truncate">Portfolio Soundtrack</p>
          <p className="text-white/50 text-[10px] uppercase tracking-wider truncate">Background Music</p>
          
          <div className="flex items-center gap-3 mt-1.5 text-white/70">
            <button onClick={() => { if(audioRef.current) audioRef.current.currentTime = 0; }} className="hover:text-white interactive">
              <SkipBack size={14} />
            </button>
            <button onClick={togglePlay} className="hover:text-white interactive text-bnd-red">
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <div className="flex-1"></div>
            <button onClick={toggleMute} className="hover:text-white interactive">
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMedia;
