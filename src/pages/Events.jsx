import React, { useState } from 'react';
import EventCard from '../components/common/EventCard';
import { useAdmin } from '../contexts/AdminContext';

const FILTERS = ['TOUS', 'JUIN', 'JUIL.', 'AOÛT'];

// Mapping des numéros de mois vers les labels des filtres
const MONTH_NUM_TO_FILTER = {
  6: 'JUIN', 7: 'JUIL.', 8: 'AOÛT'
};
// Mapping des noms complets de mois vers les labels des filtres  
const MONTH_NAME_TO_FILTER = {
  'JUIN': 'JUIN', 'JUILLET': 'JUIL.', 'AOÛT': 'AOÛT'
};

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('TOUS');
  const { events } = useAdmin();

  const filteredEvents = activeFilter === 'TOUS' 
    ? events 
    : events.filter(e => {
      // Essayer d'extraire le mois depuis la date ISO
      const dateObj = new Date(e.date);
      if (!isNaN(dateObj.getTime())) {
        const monthFilter = MONTH_NUM_TO_FILTER[dateObj.getMonth() + 1];
        return monthFilter === activeFilter;
      }
      // Fallback: comparer avec le champ month (anciens événements)
      const mappedFilter = MONTH_NAME_TO_FILTER[e.month];
      return mappedFilter === activeFilter || e.month === activeFilter;
    });

  return (
    <div className="min-h-screen bg-[#050505] pt-28 sm:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-green-500 uppercase mb-4">Entre Nous Bar Présente</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold clash tracking-tight text-white mb-4">
            ÉVÉNEMENTS<br className="sm:hidden" /> À VENIR
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Découvrez tous nos événements et réservez vos places en ligne. Chaque soirée est une expérience unique.
          </p>
          
          {/* Filters */}
          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mt-8">
            {FILTERS.map(filter => (
              <button 
                key={filter}
                className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === filter 
                    ? 'bg-green-700 border-green-700 text-white shadow-[0_0_20px_rgba(21,128,61,0.3)]' 
                    : 'bg-transparent border-white/10 text-gray-400 hover:border-green-600 hover:text-white'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} {...event} />
          ))}
        </div>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <iconify-icon icon="lucide:calendar-x" class="text-5xl text-gray-600 mb-4"></iconify-icon>
            <p className="text-gray-500 text-lg font-bold">Aucun événement pour ce mois.</p>
            <p className="text-gray-600 text-sm mt-2">Revenez bientôt ou explorez les autres mois !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
