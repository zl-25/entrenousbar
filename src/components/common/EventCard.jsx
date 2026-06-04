import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ id, title, type, date, time, price, image, cardImage, neonClass, day: dayProp, month: monthProp }) => {
  // Parser la date de manière robuste - supporte les dates ISO (ex: "2026-06-22") 
  // et fallback vers les champs day/month si la date ISO échoue
  let day, month;
  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    day = dateObj.getDate();
    month = dateObj.toLocaleString('fr-FR', { month: 'short' }).toUpperCase();
  } else {
    // Fallback: utiliser les props day/month directement (anciens événements)
    day = dayProp || '?';
    month = monthProp ? monthProp.substring(0, 4).toUpperCase() : '';
  }
  const imgSrc = image || cardImage;

  return (
    <div className="group relative bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(21,128,61,0.15)] hover:border-white/10 flex flex-col">
      {/* Full-card clickable overlay for navigating to details */}
      <Link to={`/events/${id}`} className="absolute inset-0 z-10" aria-label={`Voir les détails de ${title}`} />
      
      <div className="relative aspect-[4/3] sm:aspect-[4/5] bg-[#0A0A0A] overflow-hidden border-b border-white/5 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full transition-transform duration-500 group-hover:scale-110 object-contain sm:object-cover"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={(e) => {
            e.target.style.background = '#333';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-green-700 text-white px-3 py-1.5 rounded-lg text-center shadow-lg">
          <p className="text-lg font-bold leading-tight">{day}</p>
          <p className="text-[10px] font-bold uppercase tracking-wider">{month}</p>
        </div>

        {/* Title over image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className={`text-xl sm:text-2xl font-bold clash leading-tight ${neonClass || 'text-white'}`}>{title}</h3>
          {type && <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase mt-1">{type}</p>}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1.5">
            <iconify-icon icon="lucide:clock" class="text-green-500"></iconify-icon> 
            {time}
          </span>
          <span className="flex items-center gap-1.5 font-bold text-green-500">
            <iconify-icon icon="lucide:ticket" class="text-green-500"></iconify-icon> 
            {price}
          </span>
        </div>
        <Link 
          to={`/events/${id}/tickets`}
          className="relative z-20 block w-full text-center bg-green-700 hover:bg-green-600 py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors mt-auto"
        >
          Acheter un ticket
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
