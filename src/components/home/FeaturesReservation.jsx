import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';

const FeaturesReservation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    guests: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/reservation', { state: { ...formData } });
  };
  return (
    <section className="py-24 bg-[#0a0a0a]" id="reservation">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <ScrollReveal delay={100}>
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full bg-yellow-500/5">
                  <iconify-icon icon="lucide:tent" className="text-yellow-500 text-xl"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-1 text-white">Espace Plein Air</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Un cadre naturel et convivial sous les étoiles.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full bg-yellow-500/5">
                  <iconify-icon icon="lucide:music" className="text-yellow-500 text-xl"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-1 text-white">Musique Live & DJ</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Les meilleurs sons pour des soirées inoubliables.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full bg-yellow-500/5">
                  <iconify-icon icon="lucide:beer" className="text-yellow-500 text-xl"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-1 text-white">Boissons Fraîches</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Cocktails, bières, softs et bien plus encore.</p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-yellow-500/30 rounded-full bg-yellow-500/5">
                  <iconify-icon icon="lucide:shield-check" className="text-yellow-500 text-xl"></iconify-icon>
                </div>
                <div>
                  <h4 className="font-bold text-sm tracking-wider uppercase mb-1 text-white">Sécurité Assurée</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Profitez en toute sécurité avec notre équipe.</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Reservation Form Container */}
          <ScrollReveal delay={500} className="h-full w-full">
            <div className="bg-[#111] border border-white/5 shadow-2xl rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-yellow-500"></div>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-3 clash text-white">Réservez votre table</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">Assurez-vous une place de choix pour vous et vos amis en réservant votre table à l'avance.</p>
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Convives</label>
                  <select 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm appearance-none focus:outline-none focus:border-green-500 transition-colors text-white font-medium"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    <option value="">Sélectionnez le nombre de personnes</option>
                    <option value="2">2 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="6">6 personnes</option>
                    <option value="8+">8+ personnes (Espace VIP)</option>
                  </select>
                  <iconify-icon icon="lucide:users" className="absolute right-4 top-[38px] text-gray-500"></iconify-icon>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-green-500 transition-colors text-white font-medium [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" 
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Heure</label>
                    <input 
                      type="time" 
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-green-500 transition-colors text-white font-medium [&::-webkit-calendar-picker-indicator]:filter-[invert(1)]" 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold uppercase py-4 rounded-xl flex items-center justify-center gap-2 transition-all mt-4 shadow-[0_10px_30px_rgba(21,128,61,0.2)]">
                  Confirmer la réservation
                  <iconify-icon icon="lucide:check-circle"></iconify-icon>
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FeaturesReservation;
