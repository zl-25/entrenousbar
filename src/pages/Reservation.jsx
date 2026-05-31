import React, { useState, useMemo } from 'react';

const PERSON_OPTIONS = [2, 4, 6, '8+'];
const TIME_OPTIONS = ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
const DAY_LABELS = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

const SPACES = [
  {
    id: 'vip',
    name: 'ESPACE VIP',
    neonClass: 'text-purple-400',
    neonShadow: 'text-shadow: 0 0 10px rgba(192, 132, 252, 0.5)',
    desc: 'Accès premium avec vue sur la scène, service VIP dédié et cocktails offerts.',
    price: '25 000 FCFA',
    priceDetail: '/pers',
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'premium',
    name: 'ESPACE PREMIUM',
    neonClass: 'text-green-400',
    neonShadow: 'text-shadow: 0 0 10px rgba(74, 222, 128, 0.5)',
    desc: 'Vue imprenable sur la scène, ambiance exclusive et service de qualité.',
    price: '15 000 FCFA',
    priceDetail: '/pers',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'standard',
    name: 'ESPACE STANDARD',
    neonClass: 'neon-text-yellow',
    neonShadow: 'text-shadow: 0 0 10px rgba(250, 204, 21, 0.5)',
    desc: 'Ambiance festive, accès au dancefloor et bar direct.',
    price: '10 000 FCFA',
    priceDetail: '/pers',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800'
  }
];

// Calendar helper functions
function getMonthName(monthIndex) {
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  return months[monthIndex];
}

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday=0 format
  return day === 0 ? 6 : day - 1;
}

const Reservation = () => {
  const today = new Date();
  const [personCount, setPersonCount] = useState(4);
  const [selectedTime, setSelectedTime] = useState('21:00');
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(calendarYear, calendarMonth);
    const firstDay = getFirstDayOfMonth(calendarYear, calendarMonth);
    const days = [];

    // Empty slots before the 1st
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, disabled: true });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(calendarYear, calendarMonth, d);
      const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      days.push({ day: d, disabled: isPast });
    }

    return days;
  }, [calendarMonth, calendarYear]);

  const canGoPrev = calendarYear > today.getFullYear() || (calendarYear === today.getFullYear() && calendarMonth > today.getMonth());

  const handlePrevMonth = () => {
    if (!canGoPrev) return;
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(y => y - 1);
    } else {
      setCalendarMonth(m => m - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(y => y + 1);
    } else {
      setCalendarMonth(m => m + 1);
    }
    setSelectedDate(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const missing = [];
    if (!selectedDate) missing.push("la date de réservation");
    if (!selectedSpace) missing.push("l'espace (VIP, Premium, etc.)");
    if (!name) missing.push("votre nom complet");
    if (!phone) missing.push("votre téléphone");
    if (!email) missing.push("votre email");

    if (missing.length > 0) {
      alert(`Veuillez renseigner : ${missing.join(', ')}.`);
      return;
    }
    setSubmitted(true);
  };

  const formattedDate = selectedDate
    ? `${selectedDate} ${getMonthName(calendarMonth)} ${calendarYear}`
    : null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] pt-28 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-700/20 border-2 border-green-600 flex items-center justify-center mx-auto">
            <iconify-icon icon="lucide:check" class="text-green-500 text-4xl"></iconify-icon>
          </div>
          <h1 className="text-3xl font-bold clash text-white">RÉSERVATION ENVOYÉE !</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Merci <strong className="text-white">{name}</strong> ! Votre réservation pour le <strong className="text-white">{formattedDate}</strong> à <strong className="text-white">{selectedTime}</strong> a été enregistrée. Vous recevrez une confirmation à <strong className="text-green-500">{email}</strong>.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Espace</span><span className="font-bold">{SPACES.find(s => s.id === selectedSpace)?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Personnes</span><span className="font-bold">{personCount}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-bold">{formattedDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Heure</span><span className="font-bold">{selectedTime}</span></div>
          </div>
          <button onClick={() => { setSubmitted(false); setSelectedDate(null); setSelectedSpace(null); }} className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all">
            Nouvelle réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-28 sm:pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">

        {/* Header */}
        <section className="mb-10 sm:mb-12">
          <p className="text-xs font-bold tracking-[0.3em] text-green-500 uppercase mb-3">Entre Nous Bar</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight clash text-white mb-3">
            RÉSERVEZ <span className="text-green-600">VOTRE TABLE</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg leading-relaxed">
            Réservez votre espace privilégié pour une soirée inoubliable sous les étoiles d'Entre Nous Bar.
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">

            {/* Left Column — Form (3 cols) */}
            <div className="lg:col-span-3 space-y-8">

              {/* Glass Card — Main Form */}
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8 space-y-8">

                {/* Person Count */}
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4 block">Nombre de personnes</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                    {PERSON_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPersonCount(opt)}
                        className={`h-12 rounded-xl border text-sm font-bold transition-all duration-200 ${
                          personCount === opt
                            ? 'border-green-600 bg-green-600/20 text-green-400 shadow-[0_0_15px_rgba(21,128,61,0.2)]'
                            : 'border-white/15 bg-white/5 text-white hover:border-green-500/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4 block">Date de réservation</label>
                  <div className="bg-black/30 rounded-2xl p-4 sm:p-5 border border-white/5">
                    {/* Month Navigation */}
                    <div className="flex items-center justify-between mb-5">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${canGoPrev ? 'bg-white/10 hover:bg-white/20 text-white' : 'text-gray-700 cursor-not-allowed'}`}
                        disabled={!canGoPrev}
                      >
                        <iconify-icon icon="lucide:chevron-left"></iconify-icon>
                      </button>
                      <span className="text-sm font-bold tracking-wider uppercase">
                        {getMonthName(calendarMonth)} {calendarYear}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                      >
                        <iconify-icon icon="lucide:chevron-right"></iconify-icon>
                      </button>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {DAY_LABELS.map(d => (
                        <div key={d} className="text-center text-[10px] text-gray-600 font-bold tracking-wider">{d}</div>
                      ))}
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((item, idx) => {
                        if (item.day === null) {
                          return <div key={`empty-${idx}`} className="h-10"></div>;
                        }
                        const isSelected = selectedDate === item.day;
                        const isToday = item.day === today.getDate() && calendarMonth === today.getMonth() && calendarYear === today.getFullYear();
                        return (
                          <button
                            key={item.day}
                            type="button"
                            disabled={item.disabled}
                            onClick={() => setSelectedDate(item.day)}
                            className={`h-10 rounded-lg text-xs font-bold transition-all duration-200 ${
                              item.disabled
                                ? 'text-gray-700 cursor-not-allowed'
                                : isSelected
                                  ? 'bg-green-700 text-white shadow-[0_0_15px_rgba(21,128,61,0.4)]'
                                  : isToday
                                    ? 'border border-green-600/50 text-green-400 hover:bg-green-700/20'
                                    : 'border border-white/10 text-white hover:border-green-600/50 hover:bg-white/5'
                            }`}
                          >
                            {item.day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Time Selector */}
                <div>
                  <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4 block">Heure d'arrivée</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {TIME_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 rounded-xl text-xs font-bold transition-all duration-200 border ${
                          selectedTime === t
                            ? 'border-green-600 bg-green-600/20 text-green-400 shadow-[0_0_15px_rgba(21,128,61,0.2)]'
                            : 'border-white/15 bg-white/5 text-white hover:border-green-500/50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Fields */}
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Nom complet *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Votre nom complet"
                        required
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Téléphone *</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+241 XX XX XX XX"
                        required
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-600 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2 block">Email de confirmation *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                      className="w-full h-12 bg-black/40 border border-white/10 rounded-xl px-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-600 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Space Selection (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold clash">Choisissez <span className="text-yellow-500">votre espace</span></h2>

              {SPACES.map((space) => (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setSelectedSpace(space.id)}
                  className={`w-full text-left relative overflow-hidden rounded-3xl group border transition-all duration-300 ${
                    selectedSpace === space.id
                      ? 'border-green-600 shadow-[0_0_30px_rgba(21,128,61,0.2)] ring-1 ring-green-600/50'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <div className="h-44 sm:h-48 overflow-hidden relative">
                    <img
                      src={space.image}
                      alt={space.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Selected checkmark */}
                    {selectedSpace === space.id && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                        <iconify-icon icon="lucide:check" class="text-white text-lg"></iconify-icon>
                      </div>
                    )}
                  </div>
                  <div className="p-5 absolute bottom-0 left-0 right-0">
                    <h3 className={`text-xl sm:text-2xl font-bold clash mb-1 ${space.neonClass}`} style={{ textShadow: selectedSpace === space.id ? undefined : 'none' }}>
                      {space.name}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 mb-3">{space.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white">{space.price} <span className="text-[10px] text-gray-500">{space.priceDetail}</span></span>
                      <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedSpace === space.id
                          ? 'bg-green-600 text-white'
                          : 'bg-white/10 text-gray-400 group-hover:bg-green-700 group-hover:text-white'
                      }`}>
                        {selectedSpace === space.id ? 'SÉLECTIONNÉ' : 'SÉLECTIONNER'}
                      </span>
                    </div>
                  </div>
                </button>
              ))}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <iconify-icon icon="lucide:clock" class="text-green-500 text-xl mb-2"></iconify-icon>
                  <p className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">Confirmation rapide</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <iconify-icon icon="lucide:shield-check" class="text-green-500 text-xl mb-2"></iconify-icon>
                  <p className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">Paiement sécurisé</p>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-xl p-3 text-center">
                  <iconify-icon icon="lucide:calendar-check" class="text-green-500 text-xl mb-2"></iconify-icon>
                  <p className="text-[9px] font-bold tracking-wider text-gray-400 uppercase">Annulation flexible</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Summary & CTA */}
          <div className="mt-10 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold clash text-white mb-1">RÉCAPITULATIF</h3>
                <p className="text-xs text-gray-500">Vérifiez vos informations avant de confirmer</p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                {selectedDate && (
                  <span className="bg-green-700/20 border border-green-700/50 text-green-400 px-3 py-1.5 rounded-lg font-bold">
                    <iconify-icon icon="lucide:calendar" class="mr-1"></iconify-icon> {formattedDate}
                  </span>
                )}
                <span className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg font-bold">
                  <iconify-icon icon="lucide:clock" class="mr-1"></iconify-icon> {selectedTime}
                </span>
                <span className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg font-bold">
                  <iconify-icon icon="lucide:users" class="mr-1"></iconify-icon> {personCount} pers.
                </span>
                {selectedSpace && (
                  <span className="bg-white/5 border border-white/10 text-white px-3 py-1.5 rounded-lg font-bold">
                    {SPACES.find(s => s.id === selectedSpace)?.name}
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black h-14 rounded-2xl font-black uppercase tracking-[0.15em] shadow-[0_10px_30px_rgba(250,204,21,0.2)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] cursor-pointer"
            >
              RÉSERVER MAINTENANT
              <iconify-icon icon="lucide:arrow-right" class="text-xl"></iconify-icon>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
