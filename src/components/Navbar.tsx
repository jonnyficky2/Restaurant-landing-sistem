import React, { useState, useEffect } from 'react';
import Container from './Container';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <Container>
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => scrollToSection('hero')}>
            The Gilded Spoon
          </div>
          <ul className="hidden md:flex items-center space-x-8">
            <li><button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition">About</button></li>
            <li><button onClick={() => scrollToSection('menu')} className="text-gray-300 hover:text-white transition">Menu</button></li>
            <li><button onClick={() => scrollToSection('gallery')} className="text-gray-300 hover:text-white transition">Gallery</button></li>
            <li><button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-white transition">Testimonials</button></li>
          </ul>
          <button onClick={() => scrollToSection('reservation')} className="hidden md:block bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition">
            Reservation
          </button>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
