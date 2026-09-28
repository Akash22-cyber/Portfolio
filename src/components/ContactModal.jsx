import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // null, 'success', 'error'
  
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('openContactModal', handleOpen);
    return () => window.removeEventListener('openContactModal', handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      // Animate in
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.4, ease: "power2.out", display: "flex" });
      gsap.fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95, rotationX: -10 },
        { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 0.6, ease: "back.out(1.2)", delay: 0.1 }
      );
      
      // Stagger child elements
      gsap.fromTo(contentRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.3 }
      );
    } else {
      // Animate out
      gsap.to(modalRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.4, ease: "power2.in", delay: 0.1, onComplete: () => {
        gsap.set(backdropRef.current, { display: "none" });
        setStatus(null); // Reset status on close
      }});
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "4af1f98c-1435-4d98-a36d-c79746611597",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Auto close after success
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setStatus(`error: ${result.message || 'Unknown API Error'}`);
      }
    } catch (error) {
      console.error(error);
      setStatus(`error: ${error.message || 'Network Error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-bnd-dark border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden transform-style-3d perspective-1000"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-bnd-red to-transparent opacity-50"></div>
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-bnd-red/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="p-8 md:p-10" ref={contentRef}>
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-6 h-[1px] bg-bnd-red"></span>
                <span className="font-tech text-[10px] tracking-[0.3em] text-bnd-red uppercase font-semibold">Secure Channel</span>
              </div>
              <h3 className="font-trendy text-3xl md:text-4xl font-bold text-white tracking-tight">
                Establish <span className="italic font-light">Contact</span>
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all interactive"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {status === 'success' ? (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h4 className="font-display font-bold text-xl text-white mb-2">Transmission Successful</h4>
              <p className="text-white/60 font-body text-sm">Your message has been encrypted and delivered. I'll respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <div className="flex flex-col gap-1.5">
                <label className="font-tech text-[10px] tracking-[0.2em] text-white/50 uppercase ml-1">Identifier (Name)</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-body focus:outline-none focus:border-bnd-red/50 focus:bg-white/5 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="font-tech text-[10px] tracking-[0.2em] text-white/50 uppercase ml-1">Return Address (Email)</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-body focus:outline-none focus:border-bnd-red/50 focus:bg-white/5 transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-tech text-[10px] tracking-[0.2em] text-white/50 uppercase ml-1">Payload (Message)</label>
                <textarea 
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white font-body focus:outline-none focus:border-bnd-red/50 focus:bg-white/5 transition-all resize-none"
                  placeholder="Initiating contact sequence..."
                ></textarea>
              </div>
              
              {status && status.startsWith('error') && (
                <div className="text-red-500 text-xs font-tech text-center mt-2">
                  Transmission failed: {status.split('error: ')[1] || 'Please try again.'}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`mt-4 w-full relative overflow-hidden group py-4 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 interactive ${isSubmitting ? 'opacity-70 pointer-events-none' : 'hover:border-bnd-red hover:shadow-[0_0_20px_rgba(255,47,64,0.2)]'}`}
              >
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-bnd-red/20 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                
                <span className="relative z-10 font-tech text-xs tracking-[0.2em] uppercase font-bold text-white flex items-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Encrypting...
                    </>
                  ) : (
                    'Transmit Message'
                  )}
                </span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
