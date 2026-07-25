import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const menuItems = [
  {
    name: 'Seared Scallops',
    description: 'With saffron risotto and a lemon-butter sauce.',
    price: '$32',
    image: 'https://source.unsplash.com/400x400/?scallops',
  },
  {
    name: 'Filet Mignon',
    description: '8oz prime cut, with truffle mashed potatoes and asparagus.',
    price: '$45',
    image: 'https://source.unsplash.com/400x400/?filet-mignon',
  },
  {
    name: 'Lobster Thermidor',
    description: 'A creamy mixture of cooked lobster meat, egg yolks, and brandy.',
    price: '$55',
    image: 'https://source.unsplash.com/400x400/?lobster',
  },
];

const FeaturedMenu: React.FC = () => {
  return (
    <section id="menu" className="py-20">
      <Container>
        <SectionTitle subtitle="Taste Our Creations" title="Featured Menu" />
        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.name} className="bg-gray-800/20 rounded-lg overflow-hidden group">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-amber-500 font-bold">{item.price}</p>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedMenu;
