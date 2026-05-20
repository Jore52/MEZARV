import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Instagram, Facebook, Phone, Video, ArrowDown, Mail, MapPin, MessageCircle } from 'lucide-react';
import Gallery from './components/Gallery';
import Certificates from './components/Certificates';
import Profile from './components/Profile';
import InProcess from './components/InProcess';
import Workshops from './components/Workshops';
import AICurator from './components/AICurator';
import { contactInfo } from './data/portfolio';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { scrollY } = useScroll();
  
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  // Observer para detectar sección activa optimizado
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'artista', 'galeria', 'proceso', 'talleres', 'certificados', 'contacto'];
      
      // Ajuste de lógica: Detectamos la sección que está a 150px del top (altura aproximada del header + margen)
      // Esto asegura que la sección activa sea la que el usuario está empezando a ver o tiene arriba.
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break; 
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check inicial
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'artista', label: 'El Artista' },
    { id: 'galeria', label: 'Obras' },
    { id: 'proceso', label: 'Atelier' },
    { id: 'talleres', label: 'Actividades' }, // Renombrado a Actividades
    { id: 'certificados', label: 'Trayectoria' },
    { id: 'contacto', label: 'Contacto' },
  ];

  return (
    <div className="min-h-screen bg-void text-zinc-100 font-sans selection:bg-gold selection:text-black overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:py-6 md:px-12 bg-zinc-950/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}
          className="text-2xl font-serif font-bold tracking-tighter text-white hover:text-gold transition-colors z-50"
        >
          MEZARV
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-zinc-400">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => scrollToSection(link.id)} 
              className={`hover:text-gold hover:scale-105 transition-all duration-300 relative py-1 ${activeSection === link.id ? 'text-gold' : ''}`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gold"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden text-white hover:text-gold transition-colors p-2 z-50 relative"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-950/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden p-4"
          >
            {navLinks.map((link) => (
               <button 
                 key={link.id}
                 onClick={() => scrollToSection(link.id)} 
                 className={`text-2xl font-serif transition-colors ${activeSection === link.id ? 'text-gold' : 'text-white hover:text-gold'}`}
               >
                 {link.label}
               </button>
            ))}
             <button 
               onClick={() => setIsMenuOpen(false)}
               className="absolute bottom-12 text-zinc-500 uppercase text-xs tracking-widest border border-zinc-800 px-6 py-2 rounded-full hover:border-gold hover:text-gold transition-colors"
              >
                  Cerrar
              </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-zinc-900 z-10" />
          {/* OPTIMIZED: fetchPriority="high" and loading="eager" for LCP */}
          <img 
            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2187&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        <div className="relative z-20 text-center px-4 w-full max-w-5xl mt-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-block overflow-hidden mb-6">
               <motion.div
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
               >
                 <span className="text-gold tracking-[0.5em] text-xs md:text-sm uppercase border-b border-gold/30 pb-2">Artista Plástico</span>
               </motion.div>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600 break-words">
              MEZARV
            </h1>
            <h2 className="text-lg md:text-2xl font-light text-zinc-300 tracking-[0.2em] mb-8">
              PEDRO ANTONIO VEJARANO
            </h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-lg mx-auto text-zinc-400 font-light leading-relaxed text-sm md:text-base px-6 text-center italic"
            >
              "Una belleza muy sutil e insólita..."
            </motion.p>
          </motion.div>
        </div>

        <motion.button 
          onClick={() => scrollToSection('artista')}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/50 hover:text-gold transition-colors cursor-pointer p-4"
          aria-label="Scroll Down"
        >
          <ArrowDown size={32} strokeWidth={1} />
        </motion.button>
      </header>

      {/* Main Content - Removed z-10 to allow fixed children to break out of stacking context */}
      <main className="relative bg-zinc-900">
        <Profile />
        <Gallery />
        <InProcess />
        <Workshops />
        <Certificates />
      </main>

      {/* Contact Section Improved */}
      <section id="contacto" className="bg-black relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row h-auto md:min-h-[600px]">
           {/* Left: Contact Info */}
           <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center relative z-10 bg-zinc-950 border-r border-zinc-900">
              <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
              >
                  <span className="text-gold text-xs tracking-[0.3em] uppercase mb-4 block">Contacto</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">Creemos algo<br/>atemporal.</h2>
                  <p className="text-zinc-500 font-light max-w-md mb-12 leading-relaxed">
                      Estoy disponible para comisiones privadas, exposiciones y colaboraciones artísticas.
                      La forma más rápida de contactarme es vía WhatsApp.
                  </p>

                  <div className="space-y-8 mb-12">
                      <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-gold/50 transition-colors">
                              <Mail size={20} className="text-zinc-400 group-hover:text-gold" />
                          </div>
                          <div>
                              <span className="block text-xs uppercase text-zinc-600 tracking-wider">Email</span>
                              <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-gold transition-colors">{contactInfo.email}</a>
                          </div>
                      </div>
                      
                      <div className="flex items-center gap-4 group">
                          <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-gold/50 transition-colors">
                              <MapPin size={20} className="text-zinc-400 group-hover:text-gold" />
                          </div>
                          <div>
                              <span className="block text-xs uppercase text-zinc-600 tracking-wider">Ubicación</span>
                              <span className="text-white">Lima, Perú (Atelier Privado)</span>
                          </div>
                      </div>
                  </div>

                  <a 
                    href={contactInfo.whatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-colors duration-300 w-full md:w-auto justify-center rounded-sm"
                  >
                      <MessageCircle size={18} />
                      Iniciar Conversación
                  </a>
              </motion.div>
           </div>

           {/* Right: Social & Visuals */}
           <div className="w-full md:w-1/2 bg-zinc-900 relative flex items-center justify-center p-12 min-h-[400px]">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
               <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent"></div>
               
               <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-md">
                   <a href={contactInfo.instagram} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 border border-zinc-800 hover:border-gold/30 hover:bg-zinc-800/50 transition-all duration-300 group rounded-sm aspect-square">
                       <Instagram size={32} className="text-zinc-500 group-hover:text-[#E1306C] mb-4 transition-colors" />
                       <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white">Instagram</span>
                   </a>
                   <a href={contactInfo.tiktok} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 border border-zinc-800 hover:border-gold/30 hover:bg-zinc-800/50 transition-all duration-300 group rounded-sm aspect-square">
                       <Video size={32} className="text-zinc-500 group-hover:text-white mb-4 transition-colors" />
                       <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white">TikTok</span>
                   </a>
                   <a href={contactInfo.facebook} target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center p-8 border border-zinc-800 hover:border-gold/30 hover:bg-zinc-800/50 transition-all duration-300 group rounded-sm aspect-square">
                       <Facebook size={32} className="text-zinc-500 group-hover:text-[#1877F2] mb-4 transition-colors" />
                       <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white">Facebook</span>
                   </a>
                   <a href={contactInfo.phoneCall} className="flex flex-col items-center justify-center p-8 border border-zinc-800 hover:border-gold/30 hover:bg-zinc-800/50 transition-all duration-300 group rounded-sm aspect-square">
                       <Phone size={32} className="text-zinc-500 group-hover:text-green-500 mb-4 transition-colors" />
                       <span className="text-xs uppercase tracking-widest text-zinc-400 group-hover:text-white">Llamar</span>
                   </a>
               </div>
           </div>
        </div>

        {/* Simple Copyright Footer */}
        <div className="border-t border-zinc-900 py-8 px-6 bg-black flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 uppercase tracking-wider">
           <p>© {new Date().getFullYear()} Pedro Antonio Vejarano Mezarina.</p>
           <p>Todos los derechos reservados.</p>
        </div>
      </section>

      {/* Asistente Virtual / Curador de IA */}
      <AICurator />
    </div>
  );
};

export default App;