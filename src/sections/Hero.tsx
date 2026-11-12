import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToReservation = () => {
    const section = document.getElementById('reservation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600"
          alt="Luxury dining room of The Gilded Spoon"
          className="w-full h-full object-cover scale-105 animate-[zoom-out_20s_infinite_alternate]"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/80"></div>
      </div>

      {/* Hero Content */}
      <Container className="relative z-10 max-w-4xl px-4 flex flex-col items-center">
        {/* Golden Subtitle Badging */}
        <div className="inline-flex items-center space-x-2 border border-gold-500/30 bg-gold-950/20 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm animate-fade-in-up">
          <span className="h-1.5 w-1.5 bg-gold-500 rounded-full animate-ping" />
          <span className="text-[10px] tracking-widest font-sans font-semibold text-gold-400 uppercase">
            Michelin Star Quality Cuisine
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] mb-6 tracking-wide select-none">
          A Symphony of <br />
          <span className="bg-gradient-to-r from-amber-200 via-gold-400 to-amber-200 bg-clip-text text-transparent">
            Refined Flavors
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl text-zinc-300 font-light max-w-2xl mb-10 leading-relaxed font-sans">
          Indulge in an unforgettable culinary experience crafted by award-winning chefs using organic, locally-sourced ingredients.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            onClick={scrollToReservation}
            className="shadow-xl"
          >
            Book A Table
          </Button>
          <Button 
            variant="secondary"
            onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Menu
          </Button>
        </div>
      </Container>

      {/* Animated Scroll Down Indicator */}
      <button
        type="button"
        onClick={() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer text-zinc-400 hover:text-gold-500 transition-colors duration-300"
        aria-label="Scroll to discover more about The Gilded Spoon"
      >
        <span className="text-[9px] tracking-widest uppercase font-semibold mb-2">Scroll to discover</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-gold-500" />
      </button>
    </section>
  );
};

export default Hero;
