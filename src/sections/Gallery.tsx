import React from 'react';
import Container from '../components/Container';
import SectionTitle from '../components/SectionTitle';

const images = [
  'https://source.unsplash.com/600x400/?gourmet,food',
  'https://source.unsplash.com/600x400/?restaurant,dining',
  'https://source.unsplash.com/600x400/?chef,cooking',
  'https://source.unsplash.com/600x400/?wine,cellar',
];

const Gallery: React.FC = () => {
  return (
    <section id="gallery" className="py-20">
      <Container>
        <SectionTitle subtitle="Visual Feast" title="Our Gallery" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg">
              <img src={image} alt={`Gallery image ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Gallery;
