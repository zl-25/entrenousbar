import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';

const Hero = () => {
  return (
    <section className="hero-gradient pt-32 pb-20 lg:pt-48 lg:pb-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold leading-[1.1] sm:leading-[0.9] tracking-tight sm:tracking-tighter mb-6 uppercase">
              Le Bar <br /><span className="text-green-500">Plein Air</span> <br />qui Rassemble
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-xl lg:text-2xl font-semibold text-yellow-500 mb-6">Ambiance • Musique • Plaisir</p>
          </ScrollReveal>
          <ScrollReveal delay={500}>
            <p className="text-gray-300 text-lg mb-10 max-w-lg">
              Entre Nous Bar, le spot incontournable pour vos soirées entre amis. Découvrez une expérience unique sous les étoiles.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={700}>
            <div className="flex flex-wrap gap-4">
              <a href="#events" className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded font-bold flex items-center gap-2 transition-all">
                VOIR LES ÉVÉNEMENTS
                <iconify-icon icon="lucide:calendar"></iconify-icon>
              </a>
              <Link to="/reservation" className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded font-bold flex items-center gap-2 transition-all">
                RÉSERVER UNE TABLE
                <iconify-icon icon="lucide:utensils"></iconify-icon>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
