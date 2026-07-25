import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white">
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      <div className="absolute inset-0">
        <img
          src="https://source.unsplash.com/1600x900/?restaurant,dark"
          alt="Gourmet dish"
          className="w-full h-full object-cover"
        />
      </div>
      <Container className="relative z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          A Symphony of Flavors
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Experience an unforgettable culinary journey.
        </p>
        <Button>Book a Table</Button>
      </Container>
    </section>
  );
};

export default Hero;
