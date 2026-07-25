import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const menuItems = [
  {
    name: 'Pan-Seared Scallops',
    description: 'Fresh U-10 diver scallops with saffron-infused Carnaroli risotto, roasted baby fennel, and a citrus-butter reduction.',
    price: '$38',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600',
    tag: 'Signature',
  },
  {
    name: 'Truffle Filet Mignon',
    description: '8oz prime center-cut tenderloin, wild forest mushroom ragout, truffle potato purée, and a rich red wine demi-glace.',
    price: '$48',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
    tag: 'Chef Choice',
  },
  {
    name: 'Cognac Lobster Thermidor',
    description: 'Maine lobster tail, creamy Gruyère and cognac Mornay sauce, fresh tarragon, served in the shell with charred asparagus.',
    price: '$58',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&q=80&w=600',
    tag: 'Seasonal',
  },
];

const FeaturedMenu: React.FC = () => {
  return (
    <section id="menu" className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 relative">
      <Container>
        <SectionTitle subtitle="Taste Our Masterpieces" title="Featured Menu" />
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12">
          {menuItems.map((item) => (
            <div 
              key={item.name} 
              className="glass-card rounded-xl overflow-hidden group flex flex-col h-full hover:-translate-y-2 duration-300"
            >
              {/* Product Image Frame */}
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Dark image bottom overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent"></div>
                
                {/* Elegant Badge */}
                <span className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30 text-[9px] font-sans font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <h3 className="text-xl font-serif font-semibold text-white tracking-wide group-hover:text-gold-400 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <span className="text-xl font-serif font-bold text-gold-500 pl-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Border Accent */}
                <div className="w-full h-0.5 bg-zinc-800 group-hover:bg-gold-500/40 transition-colors duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Menu Drawer / Full Menu */}
        <div className="text-center mt-16">
          <p className="text-xs text-zinc-500 tracking-widest uppercase">
            * Dietary accommodations available upon request. Speak with your sommelier for wine pairings.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedMenu;
