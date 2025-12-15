import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Scroll, ShieldCheck, Maximize2, X, Star } from 'lucide-react';
import { certificates } from '../data/portfolio';
import { Certificate } from '../types';

// Imgur Optimization Helper
const getOptimizedCertImage = (url: string) => {
    if (!url || !url.includes('imgur.com')) return url;
    if (url.match(/[s,b,t,m,l,h]\.(jpg|jpeg|png|webp)$/)) return url;
    return url.replace(/(\.[^.]+)$/, 'l$1');
};

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  return (
    <section id="certificados" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="h-[1px] w-12 bg-gold/50 self-center mr-4"></span>
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Reconocimientos</span>
            <span className="h-[1px] w-12 bg-gold/50 self-center ml-4"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-white mt-4">Trayectoria & Diplomas</h2>
          <p className="mt-4 text-zinc-500 font-light max-w-2xl mx-auto text-sm">
            Documentos oficiales que avalan el recorrido académico, exposiciones y premios obtenidos a lo largo de la carrera artística.
          </p>
        </motion.div>

        {/* Certificates Grid - Gallery Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Frame Container */}
              <div className="relative w-full aspect-[4/3] bg-zinc-900 border-4 border-zinc-800 shadow-2xl overflow-hidden mb-6 transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] rounded-sm">
                
                {/* Inner Matte */}
                <div className="absolute inset-0 border-[12px] border-zinc-950/50 z-10 pointer-events-none"></div>
                
                {cert.imageUrl ? (
                  <img 
                    src={getOptimizedCertImage(cert.imageUrl)} 
                    alt={cert.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                    <Award size={48} className="text-zinc-700 group-hover:text-gold transition-colors" />
                  </div>
                )}
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform"></div>

                {/* Overlay Icon */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-300 flex items-center justify-center z-30">
                   <div className="bg-black/80 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-gold/30">
                      <Maximize2 size={20} className="text-gold" />
                   </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center max-w-xs">
                <div className="flex items-center justify-center gap-2 mb-2">
                   <span className="h-[1px] w-4 bg-gold/30"></span>
                   <span className="text-gold text-xs font-serif italic tracking-widest">{cert.year}</span>
                   <span className="h-[1px] w-4 bg-gold/30"></span>
                </div>
                <h3 className="text-lg text-white font-serif mb-2 group-hover:text-gold transition-colors duration-300 leading-tight">{cert.title}</h3>
                <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">{cert.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Association Badge / Authenticity */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 border-t border-zinc-900 pt-12"
        >
            <div className="flex flex-col md:flex-row justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
                 <div className="flex items-center gap-4">
                     <ShieldCheck size={40} className="text-zinc-600" />
                     <div className="text-left">
                         <h4 className="text-zinc-300 font-serif text-sm">Autenticidad Garantizada</h4>
                         <p className="text-zinc-600 text-xs mt-1">Obras firmadas y seriadas</p>
                     </div>
                 </div>
                 <div className="w-px h-12 bg-zinc-800 hidden md:block"></div>
                 <div className="flex items-center gap-4">
                     <Award size={40} className="text-zinc-600" />
                     <div className="text-left">
                         <h4 className="text-zinc-300 font-serif text-sm">Reconocimiento Nacional</h4>
                         <p className="text-zinc-600 text-xs mt-1">Premios y Menciones</p>
                     </div>
                 </div>
            </div>
        </motion.div>
      </div>

      {/* Lightbox Modal for Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/98 backdrop-blur-md">
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0"
               onClick={() => setSelectedCert(null)}
             />
             
             <motion.div
               layoutId={`cert-${selectedCert.id}`}
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative w-full max-w-6xl h-[90vh] bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row"
               onClick={(e) => e.stopPropagation()}
             >
                <button 
                    onClick={() => setSelectedCert(null)}
                    className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Image Side - Full Res */}
                <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black flex items-center justify-center p-4 md:p-8 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
                    {selectedCert.imageUrl ? (
                        <img 
                          src={selectedCert.imageUrl} 
                          alt={selectedCert.title} 
                          className="w-full h-full object-contain shadow-2xl"
                        />
                    ) : (
                        <Scroll size={64} className="text-zinc-700" />
                    )}
                </div>

                {/* Info Side */}
                <div className="w-full md:w-1/3 h-1/2 md:h-full overflow-y-auto bg-zinc-900 border-l border-zinc-800 p-8 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                        <Award size={150} />
                    </div>

                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
                            Documento Oficial
                        </span>
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                            {selectedCert.title}
                        </h3>
                        <p className="text-zinc-400 font-light italic">{selectedCert.institution}</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="bg-zinc-800 p-2 rounded-md shrink-0">
                                <Scroll size={18} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-zinc-300 text-xs font-bold uppercase tracking-widest mb-1">Descripción</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">
                                    {selectedCert.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-zinc-800 p-2 rounded-md shrink-0">
                                <Star size={18} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-zinc-300 text-xs font-bold uppercase tracking-widest mb-1">Año de Emisión</h4>
                                <p className="text-zinc-500 text-sm">
                                    {selectedCert.year}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-zinc-800 text-center md:text-left">
                        <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                            Digitalización de archivo original del artista.
                        </p>
                    </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;