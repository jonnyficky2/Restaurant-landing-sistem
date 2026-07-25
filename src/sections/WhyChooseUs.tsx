import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { Award, Wine, Leaf } from 'lucide-react';

const features = [
  {
    icon: Wine,
    title: 'Exquisite Ambiance',
    description: 'Immerse yourself in our beautifully detailed dining room. Our ambient lighting and custom acoustics create the perfect backdrop for intimacy.',
  },
  {
    icon: Award,
    title: 'World-Class Artisans',
    description: 'Our culinary kitchen is directed by masters of gastronomy who bring experience from global Michelin-starred establishments to every plate.',
  },
  {
    icon: Leaf,
    title: 'Prime ingredients',
    description: 'We believe premium gastronomy starts at the roots. We utilize organic, hand-harvested ingredients sourced directly from small local purveyors.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Subtle glowing orb in background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-950/5 rounded-full blur-[120px] pointer-events-none"></div>

      <Container>
        <SectionTitle subtitle="Our Promise" title="Why Dine with The Gilded Spoon?" />
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12 relative z-10">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="glass-card p-10 rounded-xl text-center flex flex-col items-center group relative overflow-hidden"
              >
                {/* Gold glowing hover corner */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl group-hover:scale-150 duration-500 transition-transform"></div>

                {/* Styled Golden Icon Container */}
                <div className="h-16 w-16 bg-gradient-to-br from-gold-500 to-amber-600 rounded-full flex items-center justify-center text-zinc-950 mb-8 shadow-lg shadow-gold-500/10 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="h-8 w-8" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold text-white tracking-wide mb-4 group-hover:text-gold-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
