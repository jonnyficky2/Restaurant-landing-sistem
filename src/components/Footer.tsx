import React from 'react';
import Container from './Container';
import { MapPin, Phone, Mail, Clock, Utensils } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 mt-20 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-zinc-400">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-white">
              <Utensils className="h-5 w-5 text-gold-500" />
              <span className="text-lg font-serif font-bold uppercase tracking-wider">
                The <span className="text-gold-500">Gilded</span> Spoon
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Experience culinary excellence defined by sophistication, fresh ingredients, and a world-class ambiance. A journey of taste tailored for the refined palate.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-gold-500 transition-colors duration-300" aria-label="Instagram">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="hover:text-gold-500 transition-colors duration-300" aria-label="Facebook">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="hover:text-gold-500 transition-colors duration-300" aria-label="Twitter">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="space-y-4">
            <h3 className="text-white font-serif text-lg font-semibold tracking-wider uppercase border-b border-zinc-900 pb-2">
              Hours of Service
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center">
                <span>Weekdays</span>
                <span className="text-zinc-300">5:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Saturday</span>
                <span className="text-zinc-300">4:00 PM - 12:00 AM</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Sunday</span>
                <span className="text-zinc-300">4:00 PM - 10:00 PM</span>
              </li>
              <li className="flex items-center space-x-2 text-xs text-gold-500 pt-1">
                <Clock className="h-3 w-3" />
                <span>Kitchen closes 30m before close</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-serif text-lg font-semibold tracking-wider uppercase border-b border-zinc-900 pb-2">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-gold-500 transition-colors duration-300">Our Story</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-gold-500 transition-colors duration-300">Featured Menu</a>
              </li>
              <li>
                <a href="#why-choose-us" className="hover:text-gold-500 transition-colors duration-300">Why Choose Us</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-gold-500 transition-colors duration-300">Gallery</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-gold-500 transition-colors duration-300">Testimonials</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact info */}
          <div className="space-y-4">
            <h3 className="text-white font-serif text-lg font-semibold tracking-wider uppercase border-b border-zinc-900 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <span>123 Luxury Lane, Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold-500 shrink-0" />
                <span>reservations@gildedspoon.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} The Gilded Spoon. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-zinc-300 transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors duration-300">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
