import React from 'react';
import Container from './Container';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950/50 border-t border-gray-800 mt-20">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">The Gilded Spoon</h3>
            <p className="text-gray-400">Experience culinary excellence in درجةf sophistication and style.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">123 Luxury Lane, Metropolis</p>
            <p className="text-gray-400">contact@gildedspoon.com</p>
            <p className="text-gray-400">(123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <p className="text-gray-400">Mon - Fri: 5pm - 11pm</p>
            <p className="text-gray-400">Sat - Sun: 4pm - 12am</p>
          </div>
        </div>
        <div className="border-t border-gray-800 py-6 text-center text-gray-500">
          &copy; {new Date().getFullYear()} The Gilded Spoon. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
