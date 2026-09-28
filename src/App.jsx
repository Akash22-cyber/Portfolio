import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import Identity from './components/Identity';
import FloatingMedia from './components/FloatingMedia';
import CustomCursor from './components/CustomCursor';
import Layout from './components/Layout';
import ContactModal from './components/ContactModal';

const SideNav = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-5 hidden md:flex">
      <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent -z-10"></div>
      
      {['hero', 'projects', 'identity'].map((id, index) => (
        <a 
          key={id}
          href={`#${id}`} 
          className="relative w-8 h-8 flex items-center justify-center group interactive"
        >
          <span className="w-2 h-2 rounded-full bg-white/30 border border-white/10 transition-all duration-300 group-hover:bg-bnd-red group-hover:scale-125 group-hover:shadow-[0_0_8px_var(--spidey-red)]"></span>
          <span className="absolute right-full mr-3 whitespace-nowrap font-display text-[10px] tracking-[0.2em] uppercase text-white/80 bg-[#08080e]/80 border border-white/10 px-3 py-1.5 rounded backdrop-blur-sm opacity-0 -translate-x-2 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
            {id}
          </span>
        </a>
      ))}
    </div>
  );
};

function App() {
  return (
    <Layout>
      <CustomCursor />
      <Navbar />
      <SideNav />
      <FloatingMedia />
      <ContactModal />
      
      <main>
        <Hero />
        <ProjectsSection />
        <Identity />
      </main>
    </Layout>
  );
}

export default App;
