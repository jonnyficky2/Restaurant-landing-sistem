import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const features = [
  {
    title: 'Exquisite Ambiance',
    description: 'Our elegant and intimate setting provides the perfect backdrop for any occasion.',
  },
  {
    title: 'World-Class Chefs',
    description: 'Our culinary team is composed of passionate professionals dedicated to their craft.',
  },
  {
    title: 'Premium Ingredients',
    description: 'We believe that great food starts with the finest, freshest ingredients available.',
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-gray-950/30">
      <Container>
        <SectionTitle subtitle="Our Promise" title="Why Choose The Gilded Spoon?" />
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="p-8 bg-gray-800/20 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
