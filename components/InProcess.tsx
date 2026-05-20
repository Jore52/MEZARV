import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Video, Image as ImageIcon, Film, MousePointerClick, ChevronLeft, ChevronRight } from 'lucide-react';
import { atelierItems } from '../data/portfolio';
import { ProcessItem } from '../types';

const InProcess: React.FC = () => {
  const [activeItem, setActiveItem] = useState<ProcessItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Estados para Drag-to-Scroll
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // Para diferenciar click de drag

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeItem]);

  // Helper para generar miniatura de video (Imgur trick)
  const getThumbnail = (item: ProcessItem) => {
    if (item.type === 'image') return item.url;
    if (item.url.includes('imgur.com') && item.type === 'video') {
       return item.url.replace('.mp4', '.jpg');
    }
    return 'https://via.placeholder.com/300x500/000/fff?text=Video';
  };

  const renderModalContent = (item: ProcessItem) => {
    if (item.type === 'image') {
       return <img src={item.url} alt={item.title} className="w-full h-full object-contain" />;
    }
    return (
      <video 
        src={item.url} 
        controls 
        autoPlay 
        loop
        playsInline
        className="w-full h-full object-contain bg-black"
      >
        Tu navegador no soporta el elemento de video.
      </video>
    );
  };

  // --- MANEJADORES DE SCROLL Y DRAG ---

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    // Un pequeño timeout para limpiar el flag de dragging después del click
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad del scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // Si se mueve más de 5px, lo consideramos arrastre y no click
    if (Math.abs(walk) > 5) {
        setIsDragging(true);
    }
  };

  const scrollByAmount = (amount: number) => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleItemClick = (item: ProcessItem) => {
      if (!isDragging) {
          setActiveItem(item);
      }
  };

  return (
    <section id="proceso" className="py-24 bg-[#050505] relative border-t border-zinc-900 overflow-hidden select-none">
      
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      <div className="max-w-[95%] mx-auto relative z-10 flex flex-col h-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 px-4 md:px-0">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Film className="w-4 h-4 text-gold animate-pulse" />
              <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Behind the Scenes</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white">El Atelier</h2>
            <p className="text-zinc-500 mt-2 font-light text-sm max-w-md">
              Un vistazo crudo y sin filtros al proceso creativo. Donde el caos se ordena.
            </p>
          </div>
          
          <div className="hidden md:flex gap-4 items-center">
             <span className="text-zinc-600 text-xs uppercase tracking-widest">Explorar</span>
             <div className="flex gap-2">
                <button 
                    onClick={() => scrollByAmount(-400)}
                    className="p-3 border border-zinc-800 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all text-white"
                >
                    <ChevronLeft size={20} />
                </button>
                <button 
                    onClick={() => scrollByAmount(400)}
                    className="p-3 border border-zinc-800 rounded-full hover:bg-gold hover:text-black hover:border-gold transition-all text-white"
                >
                    <ChevronRight size={20} />
                </button>
             </div>
          </div>
        </div>

        {/* Horizontal Scroll Container (The Film Strip) */}
        <div 
          ref={scrollContainerRef}
          className={`flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar pl-4 md:pl-0 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollBehavior: isDown ? 'auto' : 'smooth' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {atelierItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => handleItemClick(item)}
              className={`snap-center shrink-0 relative group h-[500px] ${
                item.isVertical 
                  ? 'w-[280px] md:w-[300px]' 
                  : 'w-[88vw] max-w-[450px] md:w-[450px]'
              }`}
            >
              {/* Card Container */}
              <div className="w-full h-full bg-zinc-900 border border-zinc-800 relative overflow-hidden transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] rounded-sm pointer-events-none md:pointer-events-auto">
                
                {/* Media Layer */}
                <div className="w-full h-full relative">
                  {item.type === 'video' ? (
                    <>
                      {/* Video Preview */}
                      <img 
                        src={getThumbnail(item)} 
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                        draggable={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:scale-110 transition-transform">
                            <Play size={20} fill="currentColor" className="ml-1" />
                         </div>
                      </div>
                    </>
                  ) : (
                    <img 
                      src={item.url} 
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                      draggable={false}
                    />
                  )}
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content Layer */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end border-b border-zinc-700 pb-4 mb-3">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2 py-1 rounded-sm">
                        {item.status}
                     </span>
                     <span className="text-zinc-500 text-xs font-mono">{item.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-1 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-zinc-400 text-xs line-clamp-2 font-light leading-relaxed">
                    {item.description || 'Sin descripción disponible.'}
                  </p>
                  
                  <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    <MousePointerClick size={12} />
                    <span>Ver Detalles</span>
                  </div>
                </div>

                {/* Decorative Film Holes */}
                <div className="absolute top-0 left-0 bottom-0 w-4 bg-black/50 border-r border-white/5 flex flex-col justify-between py-2 z-20">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-2 h-3 bg-black/80 mx-auto rounded-[1px]" />
                    ))}
                </div>
                 <div className="absolute top-0 right-0 bottom-0 w-4 bg-black/50 border-l border-white/5 flex flex-col justify-between py-2 z-20">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-2 h-3 bg-black/80 mx-auto rounded-[1px]" />
                    ))}
                </div>

              </div>
            </motion.div>
          ))}
          
          {/* End Spacer */}
          <div className="w-12 shrink-0"></div>
        </div>

        {/* Mobile visual cue */}
        <div className="md:hidden flex justify-center mt-4 text-zinc-600 text-xs uppercase tracking-widest animate-pulse">
             ← Desliza →
        </div>
      </div>

      {/* Universal Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-xl">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0"
               onClick={() => setActiveItem(null)}
             />
             
             <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className={`relative bg-zinc-900 overflow-hidden shadow-2xl border border-zinc-800 flex flex-col
                 ${activeItem.isVertical 
                    ? 'h-[85vh] aspect-[9/16] max-w-[90vw] md:max-w-sm rounded-lg' 
                    : 'w-full max-w-[95vw] md:max-w-5xl aspect-video rounded-lg'
                 }`}
             >
                <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-end">
                   <button 
                    onClick={() => setActiveItem(null)}
                    className="bg-black/50 hover:bg-gold hover:text-black text-white p-2 rounded-full transition-all backdrop-blur-md"
                  >
                     <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
                  {renderModalContent(activeItem)}
                </div>
                
                <div className="bg-zinc-900 p-4 border-t border-zinc-800 flex justify-between items-center">
                    <div>
                        <h4 className="text-white font-serif">{activeItem.title}</h4>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider">{activeItem.status}</span>
                    </div>
                    {activeItem.type === 'video' && <Video size={16} className="text-gold" />}
                    {activeItem.type === 'image' && <ImageIcon size={16} className="text-gold" />}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default InProcess;