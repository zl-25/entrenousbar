import React from 'react';

const FeaturesReservation = () => {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full">
                <iconify-icon icon="lucide:tent" className="text-yellow-500 text-xl"></iconify-icon>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wider uppercase mb-1">Espace Plein Air</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Un cadre naturel et convivial sous les étoiles.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full">
                <iconify-icon icon="lucide:music" className="text-yellow-500 text-xl"></iconify-icon>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wider uppercase mb-1">Musique Live & DJ</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Les meilleurs sons pour des soirées inoubliables.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full">
                <iconify-icon icon="lucide:beer" className="text-yellow-500 text-xl"></iconify-icon>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wider uppercase mb-1">Boissons Fraîches</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Cocktails, bières, softs et bien plus encore.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full">
                <iconify-icon icon="lucide:shield-check" className="text-yellow-500 text-xl"></iconify-icon>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wider uppercase mb-1">Sécurité Assurée</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Profitez en toute sécurité avec notre équipe.</p>
              </div>
            </div>
          </div>

          {/* Right: Reservation Form Container */}
          <div className="bg-green-950/20 border border-green-900/50 rounded-3xl overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 flex-1">
              <h2 className="text-2xl font-bold uppercase mb-2 clash">Réservez votre table</h2>
              <p className="text-gray-400 text-sm mb-8">Réservez votre table à l'avance et profitez d'un espace privilégié.</p>
              
              <form className="space-y-4">
                <div className="relative">
                  <select className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none focus:border-green-600 transition-colors text-white">
                    <option>Nombre de personnes</option>
                    <option>2 personnes</option>
                    <option>4 personnes</option>
                    <option>6+ personnes</option>
                  </select>
                  <iconify-icon icon="lucide:chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"></iconify-icon>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input type="date" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-colors text-white" />
                  </div>
                  <div className="relative">
                    <input type="time" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-green-600 transition-colors text-white" />
                  </div>
                </div>
                <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold uppercase py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  Réserver maintenant
                  <iconify-icon icon="lucide:calendar-check"></iconify-icon>
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/3 bg-[url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center h-48 md:h-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesReservation;
