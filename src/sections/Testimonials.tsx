import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'An absolutely unforgettable dining experience. Every dish showed a meticulous attention to detail. The truffle filet mignon was outstanding, and the sommelier was exceptionally knowledgeable. A true gem.',
    author: 'Eleanor Vance',
    role: 'Gastronomy Critic',
    rating: 5,
  },
  {
    quote: 'The ambiance is perfect for special occasions—elegant, intimate, and warm. The hospitality was seamless; the staff anticipated our every need. We will undoubtedly be returning.',
    author: 'Julian Thorne',
    role: 'Connoisseur Member',
    rating: 5,
  },
  {
    quote: 'From the first bite of the seared scallops to the final chocolate sphere, everything was exquisite. The balance of textures and flavors is unmatched in the city. Highly recommended.',
    author: 'Seraphina Monroe',
    role: 'Culinary Enthusiast',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-gold-950/5 rounded-full blur-[80px] pointer-events-none"></div>

      <Container>
        <SectionTitle subtitle="Guest Experiences" title="What Our Guests Say" />
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-12 relative z-10">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.author} 
              className="glass-card p-10 rounded-xl relative flex flex-col justify-between h-full group"
            >
              {/* Quote Icon Accents */}
              <div className="absolute top-6 right-8 text-zinc-800/30 group-hover:text-gold-500/10 transition-colors duration-500">
                <Quote className="h-10 w-10 scale-x-[-1]" />
              </div>

              <div>
                {/* Star Ratings */}
                <div className="flex space-x-1 mb-6 text-gold-500">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-500" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-zinc-300 italic font-light text-sm leading-relaxed mb-8 relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-zinc-900 mt-auto">
                <p className="font-serif font-semibold text-white tracking-wide">
                  {testimonial.author}
                </p>
                <p className="text-xs text-gold-500/80 tracking-wider uppercase font-semibold mt-1">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
