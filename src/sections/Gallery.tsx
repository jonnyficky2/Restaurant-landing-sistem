import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { Maximize2, X } from 'lucide-react';

const galleryItems = [
  {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    title: 'Signature Seared Fillet',
  },
  {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    title: 'Main Dining Hall Ambiance',
  },
  {
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=800',
    title: 'Culinary Team Preparing Dishes',
  },
  {
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
    title: 'Curated Wine Cellar',
  },
  {
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    title: 'Crafted Dessert Cocktails',
  },
  {
    url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    title: 'Artisanal Chocolate Spheres',
  },
];

const Gallery: React.FC = () => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-24 bg-zinc-900 border-t border-b border-zinc-950 relative">
      <Container>
        <SectionTitle subtitle="A Visual Culinary Feast" title="The Gilded Gallery" />
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              onClick={() => setLightboxImage(item.url)}
              className="relative group aspect-4/3 overflow-hidden rounded-xl cursor-pointer border border-zinc-800 shadow-lg"
            >
              {/* Image */}
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                <div className="bg-gold-500 text-zinc-950 p-2.5 rounded-full mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="h-4 w-4" />
                </div>
                <h4 className="text-white font-serif font-semibold text-lg tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {item.title}
                </h4>
                <p className="text-gold-400/80 text-[10px] tracking-widest uppercase font-semibold mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  Click to Expand
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm p-4 animate-fade-in-up"
          onClick={() => setLightboxImage(null)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 p-2 rounded-full cursor-pointer hover:rotate-90 duration-300 transition-transform"
            aria-label="Close Modal"
          >
            <X className="h-6 w-6" />
          </button>
          
          {/* Lightbox Container */}
          <div 
            className="relative max-w-4xl max-h-[80vh] overflow-hidden rounded-lg border border-zinc-800/80 shadow-2xl glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={lightboxImage} 
              alt="Expanded view" 
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
