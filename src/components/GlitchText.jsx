import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

const GlitchText = ({ children, as: Component = 'div', className }) => {
  const containerRef = useRef(null);
  const glitchRef = useRef(null);
  const streakRef = useRef(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const lastMouse = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !isHovering) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate velocity
      const now = Date.now();
      const dt = Math.max(1, now - lastMouse.current.time);
      const dx = x - lastMouse.current.x;
      const velocityX = (dx / dt) * 15; 
      
      lastMouse.current = { x, y, time: now };

      // Limit distortion offset
      const maxOffset = 30;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, velocityX));

      // Update the CSS variables for the clip-path center and RGB split offsets
      gsap.to(glitchRef.current, {
        '--mx': `${x}px`,
        '--my': `${y}px`,
        '--offset-r': `${offset}px`,
        '--offset-b': `${-offset}px`,
        duration: 0.1,
        ease: 'none'
      });
      
      // Move the glowing streak
      gsap.to(streakRef.current, {
        x: x - 50,
        y: y - 50,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const handleEnter = () => setIsHovering(true);
  const handleLeave = () => {
    setIsHovering(false);
    // Reset offsets smoothly when mouse leaves
    gsap.to(glitchRef.current, {
      '--offset-r': '0px',
      '--offset-b': '0px',
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`relative inline-block ${className} interactive`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* 1. Base Normal Text */}
      <Component className="relative z-10 text-white">
        {children}
      </Component>

      {/* 2. The Localized Glitch Layer */}
      <div 
        ref={glitchRef}
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          clipPath: 'circle(120px at var(--mx, 50%) var(--my, 50%))',
          '--offset-r': '0px',
          '--offset-b': '0px',
        }}
      >
        {/* Bright white energy streak / scratch */}
        <div 
          ref={streakRef}
          className="absolute w-[100px] h-[100px] rounded-full bg-white opacity-80 mix-blend-overlay blur-[15px]"
          style={{ willChange: 'transform' }}
        ></div>
        
        {/* Particle noise (simulated with radial dots) */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            backgroundPosition: 'calc(var(--offset-r) * 0.5) calc(var(--offset-b) * 0.5)'
          }}
        ></div>

        {/* RGB Split Layers using mix-blend-screen so they combine to white in the center */}
        <Component 
          className="absolute top-0 left-0 w-full text-[#ff0000] mix-blend-screen drop-shadow-[0_0_8px_#ff0000]"
          style={{ transform: 'translateX(var(--offset-r))', willChange: 'transform' }}
        >
          {children}
        </Component>
        
        <Component 
          className="absolute top-0 left-0 w-full text-[#00ff00] mix-blend-screen"
          style={{ transform: 'translateY(-2px)', willChange: 'transform' }}
        >
          {children}
        </Component>

        <Component 
          className="absolute top-0 left-0 w-full text-[#0000ff] mix-blend-screen drop-shadow-[0_0_8px_#0000ff]"
          style={{ transform: 'translateX(var(--offset-b))', willChange: 'transform' }}
        >
          {children}
        </Component>
      </div>
    </div>
  );
};

export default GlitchText;
