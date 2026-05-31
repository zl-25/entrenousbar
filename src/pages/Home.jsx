import React from 'react';
import Hero from '../components/home/Hero';
import EventsPreview from '../components/home/EventsPreview';
import FeaturesReservation from '../components/home/FeaturesReservation';
import GalleryPreview from '../components/home/GalleryPreview';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <EventsPreview />
      <FeaturesReservation />
      <GalleryPreview />
      <Newsletter />
    </div>
  );
};

export default Home;
