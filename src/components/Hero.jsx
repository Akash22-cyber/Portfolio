import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MagneticText from './MagneticText';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const spideyRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      
      // Move portfolio text slightly
      gsap.to(textRef.current, {
        x: x * -20,
        y: y * -10,
        rotationY: x * -2,
        rotationX: y * 2,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Move Spidey with strong parallax & 3D rotation
      gsap.to(spideyRef.current, {
        x: x * 80,
        y: y * 50,
        rotationY: x * 8,
        rotationX: -y * 6,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Continuous floating/bobbing animation for Spider-Man
    gsap.to(spideyRef.current, {
      y: "+=15",
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(spideyRef.current);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bnd-dark perspective-1000">
      
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(20,20,30,0.8),var(--bg-dark))]"></div>
        <div className="absolute top-1/4 left-[30%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,47,64,0.15)_0%,transparent_70%)] blur-[40px] pointer-events-none mix-blend-screen animate-pulse"></div>
      </div>
      
      {/* Developer Portfolio Text */}
      <div 
        ref={textRef} 
        className="relative z-10 text-center flex flex-col items-center transform-style-3d -mt-20 pointer-events-auto"
      >
        
        {/* Complex Typography Layout with Magnetic Letters */}
        <div className="z-10 text-left w-full max-w-[850px] mt-8 mb-4">
          {/* Top Row: Huge Name First Name (Italic for trendy editorial look) */}
          <MagneticText 
            text="Akash"
            className="text-[100px] md:text-[150px] leading-[0.8] tracking-tight font-black italic text-white drop-shadow-xl font-trendy"
          />
          {/* Bottom Row: Stacked text + Last Name */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 mt-2 md:mt-4">
            {/* Left Col: Stacked Subtitle (Modern Geometric Tech font) */}
            <div className="flex flex-col text-xl md:text-3xl font-light tracking-[0.2em] text-white/90 leading-[1.3] font-tech uppercase">
              <MagneticText text="Software" />
              <MagneticText text="Developer" />
            </div>
            {/* Right Col: Huge Name Last Name */}
            <MagneticText 
              text="Jadhav"
              className="text-[100px] md:text-[150px] leading-[0.8] tracking-tight font-black text-white drop-shadow-xl font-trendy"
            />
          </div>
        </div>
      </div>

      {/* The Moving Spider-Man Character overlapping the text */}
      <div 
        ref={spideyRef} 
        className="absolute top-[20%] md:top-[15%] left-1/2 -translate-x-[45%] z-[15] w-[90vw] md:w-[70vw] max-w-[900px] aspect-[1210/877] will-change-transform pointer-events-none transform-style-3d"
      >
        <img 
          src="https://spidermania.in/assets/spidey-web-hero.png" 
          alt="Spider-Man" 
          className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] opacity-95"
        />
      </div>

    </section>
  );
};

export default Hero;
