import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const artistImages = [
  "https://i.imgur.com/VJYL7wN.jpg", // La foto que faltaba
  "https://i.imgur.com/b2wKfO6.jpg",
  "https://i.imgur.com/UJ2LuMR.jpg",
  "https://i.imgur.com/ebspfRL.jpg"
];

// Utility: Use Imgur "Huge Thumbnail" (h) or "Large Thumbnail" (l) for carousel
const getOptimizedProfileImage = (url: string) => {
    if (!url || !url.includes('imgur.com')) return url;
    // 'l' = Large Thumbnail (640px max side) - Sufficient for half-width column
    return url.replace(/(\.[^.]+)$/, 'l$1');
};

const Profile: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % artistImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="artista" className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-black to-black pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Carousel Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-5/12"
          >
            <div className="relative group aspect-[3/4]">
              <div className="absolute inset-0 bg-gold/5 translate-x-4 translate-y-4 border border-gold/20 rounded-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              <div className="relative w-full h-full overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900">
                <AnimatePresence mode='wait'>
                  <motion.img 
                    key={currentImage}
                    src={getOptimizedProfileImage(artistImages[currentImage])}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    alt="Pedro Antonio Vejarano Mezarina (Mezarv)" 
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </AnimatePresence>
                
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 z-20">
                    <span className="text-gold font-serif text-xl tracking-wide block">Mezarv</span>
                    <span className="text-zinc-400 text-xs tracking-[0.2em] uppercase">Artista Plástico</span>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute top-4 right-4 flex gap-1 z-20">
                  {artistImages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1 rounded-full transition-all duration-300 ${idx === currentImage ? 'w-6 bg-gold' : 'w-2 bg-zinc-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12"
          >
            <div className="flex items-center gap-4 mb-6">
               <span className="h-[1px] w-12 bg-gold/50"></span>
               <span className="text-gold tracking-[0.3em] text-xs font-semibold uppercase">Sobre el Artista</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">Pedro Antonio Vejarano Mezarina</h2>
            
            <div className="relative">
              <Quote className="absolute -top-6 -left-6 text-gold/10 w-16 h-16 rotate-180" />
              <blockquote className="text-zinc-300 font-light text-lg md:text-xl leading-relaxed italic relative z-10 border-l-2 border-gold/20 pl-6">
                "Yo <span className="text-gold font-normal">Mezarv</span>, en mi vida cotidiana sea cual sea el espacio ó tiempo, con sus climas naturales y sociales en el que me encuentre. Ahí es cuando en mi subconsciente comienzo a plasmar arte en cada uno de mis lienzos.
                <br /><br />
                Trato en lo posible de alcanzar en cada uno de ellos una belleza muy sutil é insólita, que me transmita algún tema para un buen dialogo y ambos. Yo y mi lienzo podamos alcanzar una bella propuesta gracias a la belleza de colores que me ofrece mi paleta, en la temática o técnica que mi imaginación me haga volar con absoluta libertad."
              </blockquote>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-end justify-between border-t border-zinc-800 pt-8"
            >
              {/* Real Artist Signature */}
              <img 
                src="https://i.imgur.com/J1gveug.png" 
                alt="Firma Mezarv" 
                className="h-24 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                style={{
                    filter: 'brightness(0) saturate(100%) invert(66%) sepia(61%) saturate(464%) hue-rotate(2deg) brightness(92%) contrast(89%)'
                }}
              />
              
              <div className="hidden md:flex flex-col text-right text-xs text-zinc-500 uppercase tracking-widest">
                <span>Est. 2018</span>
                <span>Lima, Perú</span>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Profile;