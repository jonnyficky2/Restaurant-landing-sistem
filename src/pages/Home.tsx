import MainLayout from '../layouts/MainLayout';
import Hero from '../sections/Hero';
import About from '../sections/About';
import FeaturedMenu from '../sections/FeaturedMenu';
import WhyChooseUs from '../sections/WhyChooseUs';
import Gallery from '../sections/Gallery';
import Testimonials from '../sections/Testimonials';
import ReservationCTA from '../sections/ReservationCTA';

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <FeaturedMenu />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <ReservationCTA />
    </MainLayout>
  );
};

export default Home;
