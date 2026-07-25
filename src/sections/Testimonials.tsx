import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const testimonials = [
  {
    quote: 'An absolutely unforgettable dining experience. The attention to detail in every dish was remarkable. A true gem.',
    author: 'Eleanor Vance',
  },
  {
    quote: 'The ambiance is perfect for a special occasion. The staff made us feel so welcome. We will definitely be back!',
    author: 'Julian Thorne',
  },
  {
    quote: 'From the first bite to the last, everything was exquisite. The wine pairing was spot on. Highly recommended.',
    author: 'Seraphina Monroe',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-950/30">
      <Container>
        <SectionTitle subtitle="What Our Guests Say" title="Testimonials" />
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.author} className="bg-gray-800/20 p-8 rounded-lg text-center">
              <p className="text-gray-400 italic mb-6">"{testimonial.quote}"</p>
              <p className="font-bold text-amber-500">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
