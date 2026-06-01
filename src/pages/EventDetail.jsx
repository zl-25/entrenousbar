import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../data/events';
import OptimizedImage from '../components/common/OptimizedImage';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = getEventById(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold clash text-white mb-6">ÉVÉNEMENT INTROUVABLE</h1>
        <p className="text-gray-400 mb-8 max-w-md">L'événement que vous recherchez n'existe pas ou n'est plus disponible.</p>
        <button 
          onClick={() => navigate('/events')}
          className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded text-sm font-bold tracking-wider transition-all uppercase"
        >
          Retour aux événements
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white font-satoshi selection:bg-green-500/30 pt-20">
      {/* Hero Event Section */}
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0">
            <OptimizedImage
              src={event.image}
              alt={event.title}
              className="w-full h-full sm:scale-105 opacity-60 sm:opacity-100"
              objectFit="cover"
              priority={true}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505]"></div>
          
          <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full relative z-10 pt-20">
              <Link to="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase mb-8">
                  <iconify-icon icon="lucide:arrow-left"></iconify-icon> Retour aux événements
              </Link>
              <br />
              <div className="inline-block bg-green-700 text-white px-5 py-2 rounded-lg font-bold mb-4 sm:mb-6">
                  <p className="text-xl sm:text-2xl leading-none">{event.day}</p>
                  <p className="text-[10px] sm:text-xs uppercase">{event.month} {event.year}</p>
              </div>
              <h1 className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4 clash break-words hyphens-auto ${event.neonClass}`}>
                  {event.title.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                      {word}{i < event.title.split(' ').length - 1 ? (event.title.split(' ').length > 2 && i === 1 ? <br className="hidden md:block" /> : ' ') : ''}
                    </React.Fragment>
                  ))}
              </h1>
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center text-xs sm:text-sm font-bold tracking-widest text-gray-300 uppercase mt-6 sm:mt-8">
                  <span className="flex items-center gap-2"><iconify-icon icon="lucide:clock" className="text-green-500 text-lg sm:text-xl"></iconify-icon> {event.time} - {event.endTime}</span>
                  <span className="flex items-center gap-2"><iconify-icon icon="lucide:map-pin" className="text-green-500 text-lg sm:text-xl"></iconify-icon> Entre Nous Bar, Libreville</span>
                  <span className="flex items-center gap-2"><iconify-icon icon="lucide:ticket" className="text-green-500 text-lg sm:text-xl"></iconify-icon> {event.price}</span>
              </div>
          </div>
      </section>

      {/* Details Grid */}
      <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="grid lg:grid-cols-3 gap-12">
                  
                  {/* Description Column */}
                  <div className="lg:col-span-2 space-y-12">
                      <div className="space-y-6">
                          <h2 className="text-3xl font-bold clash tracking-tight border-l-4 border-green-600 pl-6">À propos de l'événement</h2>
                          {event.description.map((para, idx) => (
                            <p key={idx} className="text-gray-400 text-lg leading-relaxed">
                                {para}
                            </p>
                          ))}
                      </div>

                      {/* Artists Grid */}
                      {event.djs && event.djs.length > 0 && (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold clash tracking-tight">LINE-UP ARTISTES</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {event.djs.map((dj, idx) => (
                                  <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden group">
                                      <div className="h-64 overflow-hidden relative">
                                          <OptimizedImage
                                            src={dj.image}
                                            alt={dj.name}
                                            className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                                            objectFit="cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                      </div>
                                      <div className="p-4">
                                          <h4 className="font-bold text-lg">{dj.name}</h4>
                                          <p className="text-green-500 text-xs font-bold">{dj.style}</p>
                                      </div>
                                  </div>
                                ))}
                            </div>
                        </div>
                      )}
                  </div>

                  {/* Rules & CTA Column */}
                  <div className="space-y-8">
                      <div className="bg-white/5 backdrop-blur-md border border-white/5 p-8 rounded-3xl lg:sticky lg:top-32">
                          <h3 className="text-2xl font-bold clash mb-6 text-yellow-500">Règles & Accès</h3>
                          <ul className="space-y-4">
                              <li className="flex gap-4">
                                  <iconify-icon icon="lucide:alert-circle" className="text-green-500 text-xl shrink-0"></iconify-icon>
                                  <p className="text-sm text-gray-300"><strong className="text-white">Âge:</strong> Réservé aux personnes de 18 ans et plus.</p>
                              </li>
                              <li className="flex gap-4">
                                  <iconify-icon icon="lucide:id-card" className="text-green-500 text-xl shrink-0"></iconify-icon>
                                  <p className="text-sm text-gray-300"><strong className="text-white">Identité:</strong> Pièce d'identité originale obligatoire à l'entrée.</p>
                              </li>
                              <li className="flex gap-4">
                                  <iconify-icon icon="lucide:shirt" className="text-green-500 text-xl shrink-0"></iconify-icon>
                                  <p className="text-sm text-gray-300"><strong className="text-white">Dress Code:</strong> Tenue correcte exigée.</p>
                              </li>
                              <li className="flex gap-4">
                                  <iconify-icon icon="lucide:ban" className="text-green-500 text-xl shrink-0"></iconify-icon>
                                  <p className="text-sm text-gray-300"><strong className="text-white">Tolérance Zéro:</strong> Interdiction stricte de drogues et comportement violent.</p>
                              </li>
                              <li className="flex gap-4">
                                  <iconify-icon icon="lucide:shield-check" className="text-green-500 text-xl shrink-0"></iconify-icon>
                                  <p className="text-sm text-gray-300"><strong className="text-white">Sécurité:</strong> Fouille systématique à l'entrée pour la sécurité de tous.</p>
                              </li>
                          </ul>

                          <div className="mt-10 pt-10 border-t border-white/10">
                              <div className="flex justify-between items-center mb-6">
                                  <div>
                                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Prix du ticket</p>
                                      {event.priceNum > 0 ? (
                                        <p className="text-3xl font-bold text-white">{event.priceNum.toLocaleString('fr-FR')} <span className="text-sm">FCFA</span></p>
                                      ) : (
                                        <p className="text-3xl font-bold text-white uppercase text-green-500">Gratuit</p>
                                      )}
                                  </div>
                                  <div className="text-right text-xs text-green-500 font-bold uppercase tracking-tighter">
                                      {event.priceNum > 0 ? 'Places limitées' : 'Entrée Libre'}
                                  </div>
                              </div>
                              
                              {event.priceNum > 0 && (
                                <Link to={`/events/${event.id}/tickets`} 
                                   className="block w-full text-center bg-green-700 hover:bg-green-600 text-white font-bold py-5 rounded-xl uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(21,128,61,0.3)]">
                                    Acheter un ticket
                                </Link>
                              )}
                              {event.priceNum > 0 && (
                                <p className="text-[10px] text-center text-gray-500 mt-4 uppercase font-bold tracking-widest">
                                    Réservez maintenant pour garantir votre entrée
                                </p>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </div>
  );
};

export default EventDetail;
