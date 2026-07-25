import React from 'react';
import Container from '../components/Container';
import Button from '../components/Button';

const ReservationCTA: React.FC = () => {
  return (
    <section id="reservation" className="py-20 bg-amber-600/10">
      <Container className="text-center">
        <h2 className="text-4xl font-bold mb-4">Make a Reservation</h2>
        <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
          Secure your table for an evening of fine dining and exceptional service. We look forward to welcoming you.
        </p>
        <Button variant="primary">Book Your Table Now</Button>
      </Container>
    </section>
  );
};

export default ReservationCTA;
