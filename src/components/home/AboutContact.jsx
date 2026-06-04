import React from 'react';

const AboutContact = () => {
  return (
    <>
      {/* SECTION À PROPOS */}
      <section id="about" className="py-24 bg-[#080808] relative border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/40 via-[#050505] to-[#050505]"></div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter neon-text">
                À PROPOS
              </h2>
              <div className="h-1 w-20 bg-green-500 rounded"></div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Niché au cœur de la ville, <strong className="text-white">Entre Nous Bar</strong> est plus qu'un simple bar en plein air : c'est un véritable sanctuaire urbain. Conçu pour offrir une évasion sensorielle, notre espace marie l'esthétique vibrante des néons à la fraîcheur d'un environnement extérieur.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                Que ce soit pour un afterwork détendu, une soirée clubbing mémorable ou un événement privé, nous mettons un point d'honneur à vous offrir un service premium, une musique pointue et des cocktails signatures inoubliables.
              </p>
              <div className="flex gap-4 pt-4">
                <div className="glass-panel p-4 text-center rounded-xl flex-1 border border-white/10">
                  <h3 className="text-2xl font-bold text-green-500 mb-1">500+</h3>
                  <p className="text-xs text-gray-400 font-semibold tracking-wider">CAPACITÉ</p>
                </div>
                <div className="glass-panel p-4 text-center rounded-xl flex-1 border border-white/10">
                  <h3 className="text-2xl font-bold text-green-500 mb-1">3</h3>
                  <p className="text-xs text-gray-400 font-semibold tracking-wider">ESPACES VIP</p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(34,197,94,0.15)] group">
              <img 
                src="/1000397686.jpg" 
                alt="Ambiance Entre Nous" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CONTACT */}
      <section id="contact" className="py-24 bg-[#050505] relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter neon-text mb-4">
              NOUS CONTACTER
            </h2>
            <div className="h-1 w-20 bg-green-500 rounded mx-auto mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Une question, une réservation spéciale ou une demande de privatisation ? Notre équipe est à votre disposition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center hover:border-green-500/30 transition-colors group">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-3xl group-hover:scale-110 transition-transform">
                <iconify-icon icon="lucide:map-pin"></iconify-icon>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Adresse</h3>
              <p className="text-gray-400">123 Avenue des Néons<br />Abidjan, Côte d'Ivoire</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-green-500/20 text-center shadow-[0_0_30px_rgba(34,197,94,0.05)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-black text-3xl group-hover:scale-110 transition-transform">
                <iconify-icon icon="lucide:phone"></iconify-icon>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Téléphone</h3>
              <p className="text-green-400 font-semibold text-lg">+225 01 23 45 67 89</p>
              <p className="text-gray-500 text-sm mt-2">Du Mercredi au Dimanche, 18h - 5h</p>
            </div>
            
            <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center hover:border-green-500/30 transition-colors group">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-3xl group-hover:scale-110 transition-transform">
                <iconify-icon icon="lucide:mail"></iconify-icon>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Email</h3>
              <p className="text-gray-400">contact@entrenousbar.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutContact;
