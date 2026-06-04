import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import CalendarComponent from '../components/reservation/CalendarComponent';
import SpaceSelector from '../components/reservation/SpaceSelector';
import ReservationForm from '../components/reservation/ReservationForm';
import { useAdmin } from '../contexts/AdminContext';

const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const SPACES = [
  { id: 'vip', name: 'ESPACE VIP' },
  { id: 'premium', name: 'ESPACE PREMIUM' },
  { id: 'standard', name: 'ESPACE STANDARD' }
];

const Reservation = () => {
  const location = useLocation();
  const prefill = location.state || {};
  const { addReservation } = useAdmin();
  
  const today = new Date();
  const [personCount, setPersonCount] = useState(prefill.guests ? parseInt(prefill.guests) || 4 : 4);
  const [selectedTime, setSelectedTime] = useState(prefill.time || '21:00');
  const [selectedSpace, setSelectedSpace] = useState(null);
  
  const initialDate = prefill.date ? new Date(prefill.date) : today;
  const [calendarMonth, setCalendarMonth] = useState(initialDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(initialDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(prefill.date ? initialDate.getDate() : null);
  
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [submitted]);

  const handleMonthChange = (direction) => {
    if (direction === -1) {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear(y => y - 1);
      } else {
        setCalendarMonth(m => m - 1);
      }
      setSelectedDate(null);
    } else {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear(y => y + 1);
      } else {
        setCalendarMonth(m => m + 1);
      }
      setSelectedDate(null);
    }
  };

  const formattedDate = selectedDate
    ? `${selectedDate} ${MONTH_NAMES[calendarMonth]} ${calendarYear}`
    : null;

  const handleSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Simulation de l'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));

      addReservation({
        name: formData.name,
        persons: formData.personCount || personCount,
        date: formattedDate,
        time: selectedTime,
        type: SPACES.find(s => s.id === selectedSpace)?.name || 'Standard',
        phone: formData.phone,
        email: formData.email
      });

      setSubmitted(true);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("Erreur lors de l'envoi de la réservation");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] pt-28 pb-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-green-700/20 border-2 border-green-600 flex items-center justify-center mx-auto">
            <iconify-icon icon="lucide:check" className="text-green-500 text-4xl"></iconify-icon>
          </div>
          <h1 className="text-3xl font-bold clash text-white">RÉSERVATION ENVOYÉE !</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Merci ! Votre réservation pour le <strong className="text-white">{formattedDate}</strong> à <strong className="text-white">{selectedTime}</strong> a été enregistrée. Vous recevrez une confirmation par email.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Espace</span><span className="font-bold">{SPACES.find(s => s.id === selectedSpace)?.name}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Personnes</span><span className="font-bold">{personCount}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-bold">{formattedDate}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Heure</span><span className="font-bold">{selectedTime}</span></div>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedDate(null);
              setSelectedSpace(null);
            }}
            className="bg-green-700 hover:bg-green-600 text-white px-8 py-3 rounded-xl text-xs font-bold tracking-wider transition-all uppercase"
          >
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

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Selections (3 cols) */}
          <div className="lg:col-span-3 space-y-8">
            {/* Calendar */}
            <CalendarComponent
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              calendarMonth={calendarMonth}
              calendarYear={calendarYear}
              onMonthChange={handleMonthChange}
            />

            {/* Space Selector */}
            <SpaceSelector
              selectedSpace={selectedSpace}
              onSelectSpace={setSelectedSpace}
            />
          </div>

          {/* Right Column - Form (2 cols) */}
          <div className="lg:col-span-2">
            <ReservationForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              personCount={personCount}
              onPersonCountChange={setPersonCount}
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              selectedSpace={selectedSpace}
              selectedDate={selectedDate}
            />
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-green-700/20 rounded-lg flex items-center justify-center mb-4">
              <iconify-icon icon="lucide:check-circle" className="text-2xl text-green-500"></iconify-icon>
            </div>
            <h4 className="font-bold text-white mb-2">Réservation Instantanée</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Confirmez votre réservation en quelques clics et recevez une confirmation par email instantanément.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-yellow-700/20 rounded-lg flex items-center justify-center mb-4">
              <iconify-icon icon="lucide:star" className="text-2xl text-yellow-500"></iconify-icon>
            </div>
            <h4 className="font-bold text-white mb-2">Service VIP</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Choisissez votre espace et profitez d'une expérience premium adaptée à vos préférences.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="w-12 h-12 bg-purple-700/20 rounded-lg flex items-center justify-center mb-4">
              <iconify-icon icon="lucide:phone" className="text-2xl text-purple-500"></iconify-icon>
            </div>
            <h4 className="font-bold text-white mb-2">Support 24/7</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Une question ? Contactez notre équipe à tout moment pour obtenir de l'aide.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
