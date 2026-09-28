import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import profileImg from '../assets/profile.jpg';

// --- Ambient Background Particles ---
const AmbientParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create 30 background particles
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'absolute rounded-full bg-white/20';
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      
      // Random initial position
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      
      container.appendChild(p);

      // Animate floating
      gsap.to(p, {
        y: `-=${Math.random() * 100 + 50}`,
        x: `+=${(Math.random() - 0.5) * 50}`,
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: Math.random() * -20 // random start time
      });
    }

    return () => {
      while(container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 z-0"></div>;
};

// --- Profile Localized Dissolve Particles ---
const ProfileParticleEffect = ({ isActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to match the stage size
    canvas.width = 600;
    canvas.height = 600;

    let particles = [];
    let animationFrameId;

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        // Start near the edge of the profile circle (radius ~200)
        const angle = Math.random() * Math.PI * 2;
        // Bias towards right/top for directional drift
        const radius = 200 + Math.random() * 20; 
        
        this.x = canvas.width/2 + Math.cos(angle) * radius;
        this.y = canvas.height/2 + Math.sin(angle) * radius;
        
        // Drift outwards and slightly up
        this.vx = Math.cos(angle) * (Math.random() * 0.5 + 0.2) + 0.5; 
        this.vy = Math.sin(angle) * (Math.random() * 0.5 + 0.2) - 0.5;
        
        this.size = Math.random() * 3 + 1;
        this.life = 1;
        this.decay = Math.random() * 0.01 + 0.005;
        // Mostly red/orange sparks
        this.color = Math.random() > 0.5 ? 'rgba(255, 47, 64, ' : 'rgba(255, 100, 100, ';
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.life + ')';
        ctx.fill();
        
        // Subtle glow for some particles
        if (this.size > 2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ff2f40';
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (isActive) {
        particles.forEach(p => {
          p.update();
          p.draw(ctx);
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isActive]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-20"
      style={{ opacity: isActive ? 1 : 0, transition: 'opacity 1s ease' }}
    />
  );
};


const Identity = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const stageRef = useRef(null);

  // Subtle Parallax for the Profile Stage
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!stageRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      
      gsap.to(stageRef.current, {
        rotationY: x * 8,
        rotationX: -y * 8,
        x: x * 30,
        y: y * 30,
        duration: 1.5,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="about" className="relative w-full min-h-screen bg-bnd-dark flex items-center justify-center py-24 overflow-hidden z-10">
      
      {/* 1. AboutBackground */}
      <AmbientParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(255,47,64,0.1)_0%,rgba(10,10,12,0)_60%)] mix-blend-screen pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* 2. AboutInfoCard (Left Side) */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-[1px] bg-bnd-red"></span>
              <span className="font-tech text-xs tracking-[0.3em] text-bnd-red uppercase font-semibold">Identity Scan</span>
            </div>

            <h2 className="font-trendy text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
              Akash <span className="italic font-light">Jadhav</span>
            </h2>

            <div className="font-body text-white/80 text-base md:text-lg leading-relaxed max-w-xl flex flex-col gap-6">
              <p>
                Hello! I'm a software developer obsessed with bridging the gap between high-performance engineering and cinematic user experiences. I don't just write code; I weave digital webs that scale gracefully and perform flawlessly.
              </p>
              <p>
                Every developer carries a unique signature. Mine is forged in building robust backend architectures and merging them seamlessly with interactive, Awwwards-winning frontend designs. When I'm not untangling complex bugs, I'm exploring new technologies to push the boundaries of what the web can do.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('openContactModal')); }} className="group relative inline-block border-none bg-transparent interactive">
                <div className="absolute inset-0 bg-white/40 p-[2px] clip-polygon-btn transition-transform duration-300 group-hover:scale-105 shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                  <div className="relative w-full h-full bg-gradient-to-b from-white to-gray-200 clip-polygon-btn-inner flex items-center justify-center px-10 py-4 overflow-hidden">
                    <span className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent -skew-x-12 transition-all duration-700 ease-in-out group-hover:left-[150%]"></span>
                    <span className="font-display font-bold text-xs md:text-sm uppercase tracking-[0.2em] text-bnd-dark">Reach Me</span>
                  </div>
                </div>
                <div className="px-10 py-4 invisible border-[3px]">Reach Me</div>
              </button>
              
              <div className="flex gap-4">
                <a href="https://github.com/Akash22-cyber" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-bnd-red hover:border-bnd-red transition-all interactive font-tech text-xs tracking-wider bg-white/5 backdrop-blur-sm">
                  GH
                </a>
                <a href="https://linkedin.com/in/akash-jadhav" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-bnd-red hover:border-bnd-red transition-all interactive font-tech text-xs tracking-wider bg-white/5 backdrop-blur-sm">
                  IN
                </a>
              </div>
            </div>
          </div>

          {/* 3. ProfileStage (Right Side) */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative order-1 lg:order-2 perspective-1000 h-[500px]">
            
            <div 
              ref={stageRef}
              className="relative flex items-center justify-center w-[350px] h-[350px] md:w-[450px] md:h-[450px] transform-style-3d"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              
              {/* ProfileParticleEffect (Digital Dissolve) */}
              <ProfileParticleEffect isActive={isPlaying || isHovered} />

              {/* Glowing Outer Ring */}
              <div className="absolute inset-[-10px] rounded-full border border-bnd-red/20 pointer-events-none transition-all duration-700 ease-out z-0" style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)', boxShadow: isHovered ? '0 0 40px rgba(255,47,64,0.3) inset, 0 0 40px rgba(255,47,64,0.3)' : '0 0 20px rgba(255,47,64,0.1) inset' }}></div>

              {/* ProfileCircle (Clipping Container) */}
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 z-10 bg-[#08080c] interactive group">
                
                {/* Fallback Abstract Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-bnd-dark via-gray-900 to-bnd-red/20 opacity-80 mix-blend-luminosity z-0"></div>
                
                {/* Actual Profile Image */}
                <img 
                  src={profileImg} 
                  alt="Akash Jadhav Profile" 
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out z-10 ${isHovered ? 'scale-105' : 'scale-100'}`}
                />

                {/* Distortion Layer (Scanlines & Noise) */}
                <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay z-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                <div className="absolute inset-0 w-full h-[2px] bg-white/10 animate-[scan-anim_3s_linear_infinite] pointer-events-none mix-blend-overlay z-20"></div>
                
                {/* Simulated Video Label */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-tech text-[9px] tracking-[0.4em] text-white/50 uppercase backdrop-blur-md px-4 py-1 rounded-full border border-white/10 z-20">
                  REC // 4K
                </div>

              </div>

              {/* Removed ProfileMediaControls button as requested */}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Identity;
