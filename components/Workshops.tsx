import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Ticket, Palette, ArrowRight, MapPin, Play, Image as ImageIcon, X } from 'lucide-react';
import { workshopItems, studentGallery, culturalGallery } from '../data/portfolio';
import { ProcessItem } from '../types';

// Imgur Optimization Helper
const getOptimizedImageUrl = (url: string) => {
    if (!url || !url.includes('imgur.com')) return url;
    if (url.match(/[s,b,t,m,l,h]\.(jpg|jpeg|png|webp)$/)) return url;
    return url.replace(/(\.[^.]+)$/, 'l$1');
};

const Workshops: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workshop' | 'culture'>('workshop');
  const [selectedMedia, setSelectedMedia] = useState<ProcessItem | null>(null);

  // Memoize filtered items
  const filteredEvents = useMemo(() => 
    workshopItems.filter(e => e.category === activeTab), [activeTab]
  );
  
  // Select the correct gallery data based on the active tab
  const currentGalleryData = useMemo(() => 
    activeTab === 'workshop' ? studentGallery : culturalGallery, [activeTab]
  );
  
  const galleryTitle = activeTab === 'workshop' ? "Momentos en el Taller" : "Bitácora Cultural";
  const gallerySubtitle = activeTab === 'workshop' 
      ? "Capturas del proceso de aprendizaje y la conexión con el arte." 
      : "Exposiciones, visitas a museos, sorteos y la vida artística en comunidad.";

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedMedia) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedMedia]);

  // Helper para controlar video on hover
  const handleVideoHover = (e: React.MouseEvent<HTMLVideoElement>, play: boolean) => {
    const video = e.currentTarget;
    if (play) {
        // Promesa segura para evitar error si el usuario saca el mouse muy rápido
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay was prevented or suppressed
            });
        }
    } else {
        video.pause();
        // Opcional: reiniciar el video
        // video.currentTime = 0; 
    }
  };

  return (
    <section id="talleres" className="py-24 bg-zinc-900 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-purple-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
             <span className="h-[1px] w-12 bg-gold/50 self-center mr-4"></span>
             <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Educación & Cultura</span>
             <span className="h-[1px] w-12 bg-gold/50 self-center ml-4"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Actividades</h2>
          
          {/* TABS */}
          <div className="flex justify-center gap-6 mt-8">
            <button 
                onClick={() => setActiveTab('workshop')}
                className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition-all ${
                    activeTab === 'workshop' ? 'text-gold border-gold' : 'text-zinc-500 border-transparent hover:text-zinc-300'
                }`}
            >
                Talleres Formativos
            </button>
            <button 
                onClick={() => setActiveTab('culture')}
                className={`text-sm uppercase tracking-widest pb-2 border-b-2 transition-all ${
                    activeTab === 'culture' ? 'text-gold border-gold' : 'text-zinc-500 border-transparent hover:text-zinc-300'
                }`}
            >
                Agenda Cultural
            </button>
          </div>
        </motion.div>

        {/* --- CARDS GRID (ACADEMIC OFFER) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px] mb-24">
          <AnimatePresence mode='wait'>
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-black border border-zinc-800 rounded-sm overflow-hidden hover:border-gold/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col"
              >
                {/* Image Header */}
                <div className="h-56 overflow-hidden relative shrink-0">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  {/* Optimized Thumbnail */}
                  <img 
                    src={getOptimizedImageUrl(event.image)} 
                    alt={event.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 z-20">
                     <span className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold backdrop-blur-md border ${
                       event.status === 'Abierto' ? 'bg-green-900/80 text-green-400 border-green-700' :
                       event.status === 'Lleno' ? 'bg-red-900/80 text-red-400 border-red-700' :
                       'bg-zinc-800/80 text-zinc-400 border-zinc-700'
                     }`}>
                       {event.status}
                     </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-4 text-gold/80 text-xs uppercase tracking-wider">
                    {event.category === 'workshop' ? <Palette size={16} /> : <Ticket size={16} />}
                    <span>{event.type}</span>
                  </div>

                  <h3 className="text-xl font-serif text-white mb-4 group-hover:text-gold transition-colors">{event.title}</h3>
                  
                  <div className="space-y-3 mb-6 border-b border-zinc-800 pb-6">
                    <div className="flex items-start gap-3 text-zinc-400 text-sm">
                      <Calendar size={16} className="mt-0.5 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start gap-3 text-zinc-400 text-sm">
                      <MapPin size={16} className="mt-0.5 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {event.description}
                  </p>

                  <a 
                    href="https://wa.me/"
                    target="_blank" 
                    rel="noreferrer"
                    className={`flex items-center justify-between w-full py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all duration-300 mt-auto ${
                      event.status === 'Abierto' 
                      ? 'bg-zinc-900 text-white hover:bg-gold hover:text-black cursor-pointer' 
                      : 'bg-zinc-900 text-zinc-600 cursor-not-allowed'
                    }`}
                  >
                    <span>{event.status === 'Abierto' ? 'Más Información' : 'No disponible'}</span>
                    {event.status === 'Abierto' && <ArrowRight size={16} />}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* --- DYNAMIC MEDIA GALLERY SECTION --- */}
        <motion.div
           key={activeTab} // Force re-render/animate on tab change
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="border-t border-zinc-800 pt-16"
        >
             <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-serif text-zinc-200 mb-2">{galleryTitle}</h3>
                <p className="text-zinc-500 text-sm">{gallerySubtitle}</p>
             </div>

             {/* Optimized Masonry using CSS Columns - Removed Layout Prop to prevent thrashing */}
             <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                 {currentGalleryData.map((item, index) => (
                     <div 
                        key={`${item.id}-${activeTab}`} // Unique key to force re-render correctly
                        className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-sm bg-zinc-950 border border-zinc-800 transform-gpu"
                        onClick={() => setSelectedMedia(item)}
                     >
                        {item.type === 'video' ? (
                            <div className="relative aspect-[9/16] bg-zinc-900">
                                <video 
                                    src={item.url} 
                                    muted 
                                    loop 
                                    playsInline
                                    preload="metadata"
                                    onMouseEnter={(e) => handleVideoHover(e, true)}
                                    onMouseLeave={(e) => handleVideoHover(e, false)}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full backdrop-blur-sm pointer-events-none">
                                    <Play size={12} className="text-white fill-white" />
                                </div>
                            </div>
                        ) : (
                            // OPTIMIZED IMAGE FOR GALLERY
                            <img 
                                src={getOptimizedImageUrl(item.url)} 
                                alt={item.title} 
                                className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 hover:scale-105"
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                             <p className="text-white text-xs font-serif">{item.title}</p>
                        </div>
                     </div>
                 ))}
             </div>
        </motion.div>

      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedMedia && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="absolute inset-0"
                   onClick={() => setSelectedMedia(null)}
                />

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center pointer-events-none"
                >
                    <div className="pointer-events-auto relative w-auto max-w-full max-h-[80vh]">
                        {selectedMedia.type === 'video' ? (
                            <video 
                                src={selectedMedia.url} 
                                controls 
                                autoPlay 
                                className="max-w-full max-h-[80vh] shadow-2xl rounded-sm border border-zinc-800"
                            />
                        ) : (
                            // FULL RES IMAGE FOR MODAL
                            <img 
                                src={selectedMedia.url} 
                                alt={selectedMedia.title}
                                className="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm border border-zinc-800" 
                            />
                        )}
                        <button 
                            onClick={() => setSelectedMedia(null)}
                            className="absolute -top-12 right-0 text-zinc-400 hover:text-white transition-colors p-2 bg-black/50 rounded-full"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="mt-4 text-center pointer-events-auto">
                        <h3 className="text-white text-xl font-serif">{selectedMedia.title}</h3>
                        <p className="text-zinc-500 text-sm mt-1">{selectedMedia.description}</p>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Workshops;