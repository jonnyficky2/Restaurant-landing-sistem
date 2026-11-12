import React, { useState, useEffect } from 'react';
import Container from './Container';
import { Menu, X, Utensils } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section on scroll
      const sections = ['hero', 'about', 'menu', 'why-choose-us', 'gallery', 'testimonials', 'reservation'];
      const scrollPosition = window.scrollY + 120; // Offset for navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'why-choose-us', label: 'Why Us' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-900 shadow-xl py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            className="flex items-center space-x-2 text-white cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <Utensils className="h-6 w-6 text-gold-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-xl md:text-2xl font-serif font-bold tracking-wide uppercase">
              The <span className="text-gold-500">Gilded</span> Spoon
            </span>
          </div>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm tracking-widest uppercase transition-colors duration-300 relative py-1 ${
                    activeSection === item.id
                      ? 'text-gold-500 font-medium'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('reservation')}
              className="bg-transparent border border-gold-500 hover:bg-gold-500 text-gold-500 hover:text-zinc-950 px-6 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 transform active:scale-95 shadow-md shadow-gold-500/5 hover:shadow-gold-500/20"
            >
              Reservation
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-zinc-400 hover:text-white focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-zinc-950/95 backdrop-blur-lg z-40 md:hidden animate-fade-in-up border-t border-zinc-900">
          <Container className="py-8">
            <ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-lg tracking-widest uppercase w-full text-left py-2 border-b border-zinc-900 ${
                      activeSection === item.id ? 'text-gold-500 font-semibold' : 'text-zinc-300'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection('reservation')}
                  className="w-full text-center bg-gold-500 text-zinc-950 py-3 rounded-full font-bold tracking-widest uppercase text-sm mt-4 hover:bg-gold-600 transition-colors"
                >
                  Book A Table
                </button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
