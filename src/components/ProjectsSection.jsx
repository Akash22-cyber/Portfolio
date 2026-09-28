import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const projectImages = [
  "/clashmind1.png",
  "/clashmind2.png",
  "/clashmind3.png",
  "/clashmind4.png",
];

const ProjectsSection = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const sectionRef = useRef(null);
  const deviceRef = useRef(null);
  const mediaContainerRef = useRef(null);

  // Setup Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleImageChange((activeImage + 1) % projectImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeImage, isPlaying]);

  // Handle Image Change with Cinematic Transitions
  const handleImageChange = (newIndex) => {
    if (newIndex === activeImage) return;

    // Cinematic media transition
    const currentMedia = mediaContainerRef.current.children[activeImage];
    const nextMedia = mediaContainerRef.current.children[newIndex];

    gsap.to(currentMedia, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: "power2.inOut",
      zIndex: 0
    });

    gsap.fromTo(nextMedia, 
      { opacity: 0, scale: 0.95, zIndex: 1 },
      { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    setActiveImage(newIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleImageChange((activeImage + 1) % projectImages.length);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handleImageChange((activeImage - 1 + projectImages.length) % projectImages.length);
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImage, isPlaying]);

  // Subtle Device Parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!deviceRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      
      gsap.to(deviceRef.current, {
        rotationY: x * 8,
        rotationX: -y * 8,
        x: x * 30,
        y: y * 30,
        duration: 1.2,
        ease: 'power2.out',
        transformPerspective: 1200
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (section) section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative w-full min-h-screen bg-bnd-dark flex flex-col justify-center py-24 overflow-hidden z-10">
      {/* Background Decorators */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-bnd-red/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
            <span className="w-8 h-[2px] bg-bnd-red"></span>
            <span className="font-tech text-xs tracking-[0.3em] text-bnd-red uppercase font-semibold">Featured Work</span>
          </div>
          <h2 className="font-trendy text-5xl md:text-7xl font-bold text-white tracking-tight">
            My <span className="italic font-light">Project</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          
          {/* LEFT: Project Device Preview (Main Visual Focus) */}
          <div className="w-full lg:w-[65%] perspective-1000">
            <div 
              ref={deviceRef}
              className="relative w-full aspect-[16/10] rounded-xl bg-black/40 border border-white/10 backdrop-blur-md p-3 md:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d"
            >
              {/* Top Bar of the "Device" */}
              <div className="w-full h-4 mb-3 flex items-center gap-2 px-1">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                <div className="mx-auto w-1/3 h-1 rounded-full bg-white/10"></div>
              </div>
              
              {/* Screen Content Container */}
              <div className="relative w-full h-[calc(100%-1.5rem)] bg-[#050505] rounded-lg overflow-hidden border border-white/5 group">
                
                {/* Loader State (Subtle) */}
                <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                  <div className="w-2 h-2 rounded-full bg-bnd-red animate-ping"></div>
                  <span className="font-tech text-[10px] text-white/90 tracking-[0.2em] uppercase">System Live</span>
                </div>

                <div ref={mediaContainerRef} className="relative w-full h-full">
                  {projectImages.map((src, index) => (
                    <div 
                      key={index}
                      className="absolute inset-0 w-full h-full bg-cover bg-center transition-all"
                      style={{ 
                        backgroundImage: `url(${src})`,
                        opacity: index === 0 ? 1 : 0, 
                        zIndex: index === 0 ? 1 : 0 
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination & Controls */}
            <div className="flex items-center justify-between mt-8 px-4">
              <div className="flex items-center gap-3">
                {projectImages.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => {
                      setIsPlaying(false);
                      handleImageChange(index);
                    }}
                    className="group py-2 interactive"
                  >
                    <div className={`h-[3px] transition-all duration-300 rounded-full ${index === activeImage ? 'w-10 bg-bnd-red' : 'w-4 bg-white/20 group-hover:bg-white/50 group-hover:w-6'}`}></div>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-bnd-red text-white/70 hover:text-bnd-red transition-all interactive bg-black/30 backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                  ) : (
                    <svg className="w-5 h-5 translate-x-[2px]" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Project Info */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6 text-center lg:text-left z-20">
             <div className="font-tech text-sm tracking-widest text-bnd-red uppercase font-semibold">
                AI-Powered Debate Platform
             </div>
             
             <h3 className="font-trendy font-bold text-5xl md:text-6xl text-white drop-shadow-md">
                ClashMinds.ai
             </h3>
             
             <p className="text-white/70 font-body text-base md:text-lg leading-relaxed mt-2 max-w-xl mx-auto lg:mx-0">
               A real-time platform that helps users improve argumentation and public speaking skills through AI-enhanced debates and peer-to-peer matchmaking. Engineered with Go, Gin, WebSockets, and WebRTC for live synchronization.
             </p>
             
             <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-2">
                {["Go", "TypeScript", "MongoDB", "WebSockets", "WebRTC"].map(tech => (
                  <span key={tech} className="text-xs font-tech px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-white/80 uppercase tracking-widest shadow-sm">
                    {tech}
                  </span>
                ))}
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start">
               <a 
                 href="https://clash-minds-ai.vercel.app/"
                 target="_blank" rel="noreferrer"
                 className="px-8 py-3 bg-bnd-red text-white font-tech text-xs uppercase tracking-widest rounded hover:bg-white hover:text-bnd-red transition-all duration-300 interactive shadow-[0_0_20px_rgba(229,9,20,0.3)] text-center font-bold"
               >
                 View System
               </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
