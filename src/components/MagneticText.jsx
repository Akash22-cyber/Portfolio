import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticText = ({ text, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.magnetic-char');
    
    const handleMouseMove = (e) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        // Calculate center of the character
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to character center
        const distX = e.clientX - charCenterX;
        const distY = e.clientY - charCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        const radius = 180; // The magnetic field radius in pixels
        
        if (distance < radius) {
          // Calculate pull strength (closer = stronger pull, from 0 to 1)
          const pull = (radius - distance) / radius;
          
          // Move the letter toward the cursor (max pull is 60% of the distance)
          const moveX = distX * pull * 0.6;
          const moveY = distY * pull * 0.6;
          
          gsap.to(char, {
            x: moveX,
            y: moveY,
            scale: 1 + (pull * 0.3), // Magnify the pulled letters slightly
            rotation: (distX * 0.05) * pull, // Slight tilt based on pull direction
            color: '#00aaff', // Ignite the text with blue plasma color when pulled
            textShadow: '0 0 15px rgba(0, 170, 255, 0.8)',
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          // Outside radius, snap back elastically
          gsap.to(char, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            color: 'inherit',
            textShadow: 'none',
            duration: 1.2,
            ease: 'elastic.out(1, 0.3)',
            overwrite: 'auto'
          });
        }
      });
    };

    const handleMouseLeave = () => {
      chars.forEach((char) => {
        gsap.to(char, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          color: 'inherit',
          textShadow: 'none',
          duration: 1.2,
          ease: 'elastic.out(1, 0.3)',
          overwrite: 'auto'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {text.split('').map((char, index) => (
        <span 
          key={index} 
          className="magnetic-char inline-block"
          style={{ 
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            willChange: 'transform, color, text-shadow'
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default MagneticText;
