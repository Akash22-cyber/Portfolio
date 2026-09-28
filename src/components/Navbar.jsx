import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-6 md:px-12 flex justify-between items-start pointer-events-none">
      
      {/* Left Group: Logo & Links Pill */}
      <div className="pointer-events-auto flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-[6px] pr-8 gap-8 shadow-[0_4px_30px_rgba(0,0,0,0.3)] interactive group/nav">
        
        {/* AJ Logo Badge */}
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-display font-bold text-xl tracking-tight text-bnd-dark shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover/nav:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow duration-300">
          AJ
        </div>
        
        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-8 font-display uppercase tracking-widest text-[11px] md:text-xs font-semibold text-white/70">
          <a href="#projects" className="hover:text-white transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            Projects
          </a>
          <a href="#about" className="hover:text-white transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
            About
          </a>
        </div>
      </div>

      {/* Right Group: Resume & Contact */}
      <div className="pointer-events-auto flex items-center gap-4">
        
        {/* RESUME Button (White/Silver Polygon Style for Contrast) */}
        <a href="/CV.pdf" target="_blank" rel="noreferrer" className="group relative inline-block interactive hidden sm:block">
          <div className="absolute inset-0 bg-white/40 p-[2px] clip-polygon-btn transition-transform duration-200 group-hover:-translate-y-1">
            <div className="relative h-full w-full bg-gradient-to-b from-white to-gray-200 clip-polygon-btn-inner flex items-center justify-center px-8 py-3 text-bnd-dark font-display font-bold text-[11px] md:text-xs tracking-[0.25em] uppercase overflow-hidden">
              <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 transition-all duration-500 ease-in-out group-hover:left-[150%]"></span>
              Resume
            </div>
          </div>
          {/* Spacer to maintain layout flow since absolute positioning takes it out */}
          <div className="px-8 py-3 invisible border-[3px] text-[11px] md:text-xs tracking-[0.25em] font-display uppercase font-bold">
            Resume
          </div>
        </a>

        {/* Contact Envelope Icon */}
        <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openContactModal')); }} className="w-[52px] h-[52px] flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full hover:border-bnd-red/80 hover:bg-bnd-red/20 transition-all duration-300 text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)] interactive group">
          <svg className="w-[22px] h-[22px] group-hover:text-bnd-red group-hover:drop-shadow-[0_0_8px_rgba(255,47,64,0.8)] transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
        
      </div>
    </nav>
  );
};

export default Navbar;
