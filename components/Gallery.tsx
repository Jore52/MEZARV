import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Search, ChevronDown } from 'lucide-react';
import { galleryItems, contactInfo } from '../data/portfolio';
import { Artwork } from '../types';

// Utility to use Imgur's "Large Thumbnail" (suffix 'l') for grid views to save bandwidth
// Original: https://i.imgur.com/xyz.jpg -> Optimized: https://i.imgur.com/xyzl.jpg
const getOptimizedImageUrl = (url: string) => {
  if (!url || !url.includes('imgur.com')) return url;
  // If it already has a suffix or is not a standard format, leave it
  if (url.match(/[s,b,t,m,l,h]\.(jpg|jpeg|png|webp)$/)) return url;
  
  return url.replace(/(\.[^.]+)$/, 'l$1');
};

// Secciones de la galería en orden de aparición. "Otros" agrupa todo lo que no
// es Surrealismo ni Abstracto (Pintura, Escultura, Instalación, etc.)
const GALLERY_SECTIONS: { key: string; title: string; subtitle: string; match: (category: string) => boolean }[] = [
  { key: 'Surrealismo', title: 'Surrealismo', subtitle: 'El diálogo entre el subconsciente y el lienzo', match: (c) => c === 'Surrealismo' },
  { key: 'Abstracto', title: 'Abstracto', subtitle: 'Libertad imaginativa de la paleta', match: (c) => c === 'Abstracto' },
  { key: 'Otros', title: 'Otras Obras', subtitle: 'Pintura y exploraciones diversas', match: (c) => !['Surrealismo', 'Abstracto'].includes(c) },
];

// Obras que son en realidad una sola imagen dividida: deben mostrarse siempre
// apiladas verticalmente en este orden exacto y juntas en la misma columna.
const STACKED_GROUPS: string[][] = [['20', '21', '22']];

const Gallery: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedId]);

  // OPTIMIZATION: Memoize sections to prevent re-calculations.
  // Agrupamos las obras por categoría respetando el orden de GALLERY_SECTIONS.
  const sections = useMemo(() => {
    const query = searchQuery.toLowerCase();
    // Mapa id -> grupo apilado al que pertenece (para agrupar en una celda).
    const groupByMember = new Map<string, string[]>();
    STACKED_GROUPS.forEach(group => group.forEach(id => groupByMember.set(id, group)));

    return GALLERY_SECTIONS.map(section => {
      const items = galleryItems
        .filter(art => art.title.toLowerCase().includes(query) && section.match(art.category))
        .sort((a, b) => sortOrder === 'newest' ? b.year - a.year : a.year - b.year);

      // Convertimos las obras en "celdas": una obra suelta, o un grupo apilado.
      // El grupo se coloca donde aparece su primer miembro y siempre respeta
      // el orden fijo definido en STACKED_GROUPS (id 20, luego 21, luego 22).
      const cells: { key: string; arts: Artwork[] }[] = [];
      const consumed = new Set<string>();
      for (const art of items) {
        if (consumed.has(art.id)) continue;
        const group = groupByMember.get(art.id);
        if (group) {
          const groupArts = group
            .map(id => items.find(a => a.id === id))
            .filter((a): a is Artwork => Boolean(a));
          groupArts.forEach(a => consumed.add(a.id));
          cells.push({ key: `group-${group.join('-')}`, arts: groupArts });
        } else {
          cells.push({ key: art.id, arts: [art] });
        }
      }

      return { ...section, items, cells };
    }).filter(section => section.items.length > 0);
  }, [searchQuery, sortOrder]);

  const hasResults = sections.length > 0;

  const selectedArtwork = useMemo(() =>
    galleryItems.find(a => a.id === selectedId), [selectedId]
  );

  // Estilos y contenido de una tarjeta de obra, reutilizados tanto por las
  // obras sueltas como por las piezas de un grupo apilado.
  const cardClasses = "relative group cursor-pointer overflow-hidden bg-zinc-800 shadow-xl border border-zinc-800 hover:border-gold/30 transition-colors transform-gpu rounded-sm";

  const renderCardInner = (art: Artwork) => (
    <div className="relative bg-zinc-800 min-h-[300px]">
      {/* Placeholder / Skeleton Background */}
      <div className="absolute inset-0 bg-zinc-800 animate-pulse"></div>

      {/* OPTIMIZED IMAGE: Uses thumbnail in grid */}
      <img
        src={getOptimizedImageUrl(art.imageUrl)}
        alt={art.title}
        className="w-full h-auto min-h-[300px] object-cover transform transition-transform duration-700 ease-out group-hover:scale-105 relative z-10"
        loading="lazy"
        decoding="async"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500/1a1a1a/333333?text=Mezarv';
        }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-20"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 z-30">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-gold text-[10px] tracking-[0.2em] uppercase mb-2 block">{art.category}</span>
          <h3 className="text-2xl font-serif text-white mb-2">{art.title}</h3>
          <div className="h-[1px] w-full bg-gradient-to-r from-gold/50 to-transparent mt-4"></div>
        </div>

        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all delay-100 hover:bg-gold hover:text-black hover:scale-110">
          <Maximize2 size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <section id="galeria" className="py-24 px-4 md:px-12 bg-zinc-900 relative min-h-screen">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex justify-center mb-4">
            <span className="h-[1px] w-12 bg-gold/50 self-center mr-4"></span>
            <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Colección Oficial</span>
            <span className="h-[1px] w-12 bg-gold/50 self-center ml-4"></span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white">Galería Principal</h2>
        </motion.div>

        {/* --- FILTER UI --- */}
        <div className="mb-12 space-y-6">
          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-950/50 p-4 border border-zinc-800 rounded-lg backdrop-blur-sm">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar obra por nombre..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-200 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:border-gold/50 text-sm placeholder-zinc-600 transition-colors"
              />
            </div>

            {/* Filters Group */}
            <div className="flex gap-4 w-full md:w-auto justify-end">
               {/* Sort Date */}
               <div className="relative w-full md:w-auto">
                 <select 
                   value={sortOrder}
                   onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                   className="w-full md:w-auto appearance-none bg-zinc-900 border border-zinc-700 text-zinc-300 pl-4 pr-10 py-2 rounded-md text-sm focus:outline-none focus:border-gold/50 cursor-pointer hover:bg-zinc-800"
                 >
                   <option value="newest">Más recientes</option>
                   <option value="oldest">Más antiguas</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 pointer-events-none" />
               </div>
            </div>
          </div>
        </div>

        {/* Gallery Sections: Surrealismo → Abstracto → Otros */}
        <div className="space-y-20">
          {sections.map((section) => (
            <div key={section.key} id={`galeria-${section.key.toLowerCase()}`} className="scroll-mt-24">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-3xl md:text-4xl font-serif text-white">{section.title}</h3>
                  <span className="h-[1px] flex-1 bg-gradient-to-r from-gold/40 to-transparent"></span>
                  <span className="text-zinc-600 text-xs uppercase tracking-widest">{section.items.length} obras</span>
                </div>
                <p className="text-zinc-500 font-light italic mt-2 text-sm">{section.subtitle}</p>
              </div>

              {/* Section Grid */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                <AnimatePresence mode='popLayout'>
                  {section.cells.map((cell) => (
                    <motion.div
                      key={cell.key}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="break-inside-avoid space-y-6"
                    >
                      {/* Cada celda es una obra suelta o un grupo apilado (una sola
                          imagen dividida). Se mantiene siempre junta en la columna. */}
                      {cell.arts.map((art) => (
                        <div
                          key={art.id}
                          onClick={() => setSelectedId(art.id)}
                          className={cardClasses}
                        >
                          {renderCardInner(art)}
                        </div>
                      ))}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {!hasResults && (
            <div className="text-center py-20 text-zinc-500">
                <p>No se encontraron obras con los filtros seleccionados.</p>
            </div>
        )}
      </div>

      {/* Lightbox / Modal - Optimized for MOBILE & DESKTOP */}
      <AnimatePresence>
        {selectedId && selectedArtwork && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-0 md:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-[95vw] h-full md:h-[90vh] bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col md:flex-row shadow-2xl z-50 rounded-none md:rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button - Global Position */}
              <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-[60] text-white/80 hover:text-white bg-black/50 p-2 rounded-full backdrop-blur-md transition-colors"
                >
                  <X size={24} />
              </button>

              {/* IMAGE SECTION - 75% Height on Mobile, 75% Width on Desktop */}
              <div className="w-full md:w-3/4 h-[75%] md:h-full bg-black flex items-center justify-center relative group">
                 {/* Background Blur for atmosphere - Uses optimized URL for blur to load fast */}
                 <div className="absolute inset-0 bg-cover bg-center blur-3xl opacity-40" style={{backgroundImage: `url(${getOptimizedImageUrl(selectedArtwork.imageUrl)})`}}></div>
                 
                 {/* Main Image - USES FULL RESOLUTION ORIGINAL URL */}
                 <img 
                  src={selectedArtwork.imageUrl} 
                  alt={selectedArtwork.title} 
                  className="relative z-10 w-full h-full object-contain p-0 md:p-4 shadow-2xl"
                  loading="eager"
                  decoding="async"
                />
              </div>
              
              {/* TEXT SECTION - 25% Height on Mobile, 25% Width on Desktop */}
              <div className="w-full md:w-1/4 h-[25%] md:h-full bg-zinc-900 border-t md:border-t-0 md:border-l border-zinc-800 p-4 md:p-8 flex flex-col justify-center relative">
                
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 h-full flex flex-col justify-between md:justify-center">
                  <div>
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                        <span className="px-2 py-0.5 border border-gold/30 text-gold text-[10px] uppercase tracking-widest rounded-full">{selectedArtwork.category}</span>
                        <span className="text-zinc-500 font-serif italic text-xs md:text-sm">{selectedArtwork.year}</span>
                    </div>

                    <h2 className="text-xl md:text-3xl font-serif text-white mb-2 md:mb-6 leading-tight line-clamp-2 md:line-clamp-none">
                        {selectedArtwork.title}
                    </h2>
                  </div>
                  
                  {/* Button at the bottom */}
                  <a 
                    href={contactInfo.whatsApp}
                    target="_blank"
                    rel="noreferrer" 
                    className="w-full group bg-white text-black py-3 md:py-4 px-6 uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                  >
                    Consultar Obra
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;