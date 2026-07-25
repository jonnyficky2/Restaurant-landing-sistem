import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold-950/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Container>
        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Image with frame */}
          <div className="md:col-span-6 relative group">
            {/* Elegant Background Gold Border Frame */}
            <div className="absolute -top-4 -left-4 w-1/2 h-1/2 border-t-2 border-l-2 border-gold-500/40 rounded-tl-lg pointer-events-none transition-all duration-500 group-hover:-top-2 group-hover:-left-2"></div>
            <div className="absolute -bottom-4 -right-4 w-1/2 h-1/2 border-b-2 border-r-2 border-gold-500/40 rounded-br-lg pointer-events-none transition-all duration-500 group-hover:-bottom-2 group-hover:-right-2"></div>
            
            {/* Main Image */}
            <div className="overflow-hidden rounded-lg shadow-2xl shadow-zinc-950/50 relative z-10 border border-zinc-900">
              <img 
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=800" 
                alt="Chef plating exquisite dish in The Gilded Spoon kitchen" 
                className="w-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-zinc-950/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>

            {/* Float badge */}
            <div className="absolute -bottom-2 -left-2 md:-left-6 bg-zinc-900 border border-zinc-800 text-zinc-100 p-4 rounded-lg shadow-xl z-20 flex flex-col items-center justify-center min-w-[120px]">
              <span className="text-2xl font-serif font-bold text-gold-500">15+</span>
              <span className="text-[9px] tracking-wider uppercase text-zinc-400 font-semibold mt-1">Years of Craft</span>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="md:col-span-6 space-y-6">
            <SectionTitle 
              subtitle="Our Philosophy" 
              title="Where Culinary Tradition Meets Innovation" 
              className="text-left mb-6"
            />
            
            <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base">
              Founded in 2010, <strong className="text-white font-medium">The Gilded Spoon</strong> was born from a passion for authentic culinary traditions and a commitment to modern creativity. Our kitchen is guided by a simple philosophy: honor the integrity of local ingredients, elevate their natural flavors, and serve them with absolute sophistication.
            </p>

            <p className="text-zinc-400 leading-relaxed font-light text-sm md:text-base">
              Every dish tells a unique story, blending classical European techniques with contemporary sensory elements. We work hand-in-hand with organic farms, local fishermen, and artisanal purveyors to ensure that only the freshest, most ethical ingredients reach your plate.
            </p>

            <div className="pt-6 border-t border-zinc-900 flex items-center space-x-6">
              <div>
                <h4 className="text-white font-serif text-lg font-semibold tracking-wide">Marcus Vance</h4>
                <p className="text-xs text-gold-500 tracking-widest uppercase mt-0.5">Executive Chef & Founder</p>
              </div>
              <div className="h-10 w-px bg-zinc-800"></div>
              <div className="italic text-zinc-500 text-sm font-serif">
                "Cuisine is the ultimate art of sharing."
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
