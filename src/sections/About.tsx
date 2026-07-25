import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-950/30">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://source.unsplash.com/800x600/?restaurant,interior" 
              alt="Restaurant Interior" 
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <SectionTitle subtitle="Our Story" title="The Heart of Our Cuisine" className="text-left" />
            <p className="text-gray-400 mb-6">
              Founded in 2010, The Gilded Spoon was born from a passion for authentic flavors and a commitment to culinary innovation. Our philosophy is simple: use the freshest, locally-sourced ingredients to create dishes that are both classic and contemporary.
            </p>
            <p className="text-gray-400">
              Our award-winning chefs bring a world of experience to our kitchen, crafting a menu that is both a tribute to tradition and a celebration of modern gastronomy.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
