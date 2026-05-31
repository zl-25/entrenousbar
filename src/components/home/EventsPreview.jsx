import React from 'react';
import { EVENTS } from '../../data/events';

const EventsPreview = () => {
  const previewEvents = EVENTS.slice(0, 4);

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Événements à Venir</h2>
          <a href="/events" className="text-xs font-bold tracking-widest text-gray-400 hover:text-white flex items-center gap-2">
            VOIR TOUS LES ÉVÉNEMENTS <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewEvents.map((event) => (
            <div key={event.id} className="event-card rounded-2xl overflow-hidden group">
              <div className="relative h-64">
                <img src={event.cardImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-green-700 text-white px-3 py-1 rounded text-center">
                  <p className="text-lg font-bold leading-tight">{event.day}</p>
                  <p className="text-[10px] font-bold uppercase">{event.month}</p>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className={`text-2xl font-bold mb-0 clash ${event.neonClass}`}>{event.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-6">
                  <span className="flex items-center gap-1.5"><iconify-icon icon="lucide:clock" className="text-green-500"></iconify-icon> {event.time}</span>
                  <span className="flex items-center gap-1.5"><iconify-icon icon="lucide:ticket" className="text-green-500"></iconify-icon> {event.price}</span>
                </div>
                <button className="block w-full text-center bg-green-700 hover:bg-green-600 py-3 rounded font-bold text-xs uppercase tracking-wider transition-colors">
                  Acheter un ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
