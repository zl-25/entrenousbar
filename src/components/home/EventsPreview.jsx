import React from 'react';
import { Link } from 'react-router-dom';
import { EVENTS } from '../../data/events';
import ScrollReveal from '../common/ScrollReveal';
import OptimizedImage from '../common/OptimizedImage';

const EventsPreview = () => {
  const previewEvents = EVENTS.slice(0, 4);

  return (
    <section className="py-24 bg-[#050505]" id="events">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Événements à Venir</h2>
            <Link to="/events" className="text-xs font-bold tracking-widest text-gray-400 hover:text-white flex items-center gap-2">
              VOIR TOUS LES ÉVÉNEMENTS <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewEvents.map((event, index) => (
            <ScrollReveal key={event.id} delay={index * 150} className="h-full">
              <Link to={`/events/${event.id}/tickets`} className="event-card rounded-2xl overflow-hidden group block h-full bg-[#111] hover:bg-[#1a1a1a] transition-colors">
                <div className="relative aspect-[4/5] bg-black">
                  <OptimizedImage
                    src={event.cardImage}
                    alt={event.title}
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    objectFit="contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1 rounded text-center">
                    <p className="text-lg font-bold leading-tight">{event.day}</p>
                    <p className="text-[10px] font-bold uppercase">{event.month}</p>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className={`text-xl sm:text-2xl font-bold mb-0 clash ${event.neonClass}`}>{event.title}</h3>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-center text-[11px] sm:text-xs text-gray-400 mb-6">
                    <span className="flex items-center gap-1.5"><iconify-icon icon="lucide:clock" className="text-green-500"></iconify-icon> {event.time}</span>
                    <span className="flex items-center gap-1.5"><iconify-icon icon="lucide:ticket" className="text-green-500"></iconify-icon> {event.price}</span>
                  </div>
                  <div className="block w-full text-center bg-green-700 group-hover:bg-green-600 py-3 rounded font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-colors text-white">
                    Acheter un ticket
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
