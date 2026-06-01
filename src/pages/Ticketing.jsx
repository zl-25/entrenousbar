import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getEventById } from '../data/events';
import { jsPDF } from 'jspdf';
import { validateForm, ticketingSchema } from '../utils/validationSchemas';
import TicketDisplay from '../components/ticketing/TicketDisplay';
import OptimizedImage from '../components/common/OptimizedImage';

const TICKETS = [
  { id: 'test', name: 'Ticket Test', desc: 'Ticket de test pour validation de paiement', price: '200 FCFA', priceNum: 200, icon: 'lucide:settings', iconColor: 'text-red-500' },
  { id: 'standard', name: 'Ticket Standard', desc: 'Accès général à l\'événement', price: '5 000 FCFA', priceNum: 5000, icon: 'lucide:ticket', iconColor: 'text-green-500' },
  { id: 'vip', name: 'VIP Pass', desc: 'Accès prioritaire + Espace VIP', price: '15 000 FCFA', priceNum: 15000, icon: 'lucide:crown', iconColor: 'text-yellow-500' },
  { id: 'table4', name: 'Table 4 places', desc: 'Table réservée + 1 bouteille au choix', price: '40 000 FCFA', priceNum: 40000, icon: 'lucide:users-2', iconColor: 'text-blue-500' },
  { id: 'earlybird', name: 'Early Bird', desc: 'Quantité limitée à prix réduit', price: '3 000 FCFA', priceNum: 3000, icon: 'lucide:zap', iconColor: 'text-purple-500' }
];

const STEPS = [
  { id: 1, short: 'Choix du ticket' },
  { id: 2, short: 'Infos client' },
  { id: 3, short: 'Paiement' },
  { id: 4, short: 'Confirmation' }
];

const Ticketing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = getEventById(id);

  const [step, setStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(TICKETS[0].id);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '', newsletters: false });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [isVerifying, setIsVerifying] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('status') === 'success';
  });
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('status') === 'success') {
        const cartId = localStorage.getItem('maketou_cart_id');
        if (!cartId) {
          setPaymentError('Référence de paiement introuvable.');
          return;
        }

        setIsVerifying(true);
        try {
          const response = await fetch(`https://api.maketou.net/api/v1/stores/cart/${cartId}`, {
            headers: {
              'Authorization': `Bearer ${import.meta.env.VITE_MAKETOU_API_KEY}`
            }
          });

          if (!response.ok) throw new Error('Erreur vérification');
          const data = await response.json();

          if (data.status === 'completed') {
            const savedData = localStorage.getItem('maketou_form_data');
            if (savedData) setFormData(JSON.parse(savedData));
            const savedTicket = localStorage.getItem('maketou_ticket');
            if (savedTicket) setSelectedTicket(savedTicket);
            setStep(4);
          } else {
            setPaymentError(`Le paiement n'est pas encore finalisé (statut: ${data.status}). Veuillez contacter le support si le problème persiste.`);
          }
        } catch (err) {
          console.error(err);
          setPaymentError('Impossible de vérifier le statut de votre paiement.');
        } finally {
          setIsVerifying(false);
        }
      }
    };
    verifyPayment();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4 bg-[#050505]">
        <h1 className="text-4xl font-bold clash text-white mb-6">ÉVÉNEMENT INTROUVABLE</h1>
        <button onClick={() => navigate('/events')} className="bg-green-700 text-white px-8 py-3 rounded-xl font-bold">RETOUR</button>
      </div>
    );
  }

  const currentTicket = TICKETS.find(t => t.id === selectedTicket);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleFormBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleNext = async (e) => {
    if (e) e.preventDefault();

    if (step === 2) {
      // Validation
      const { isValid, errors: validationErrors } = validateForm(ticketingSchema, formData);
      if (!isValid) {
        setErrors(validationErrors);
        setTouched({ name: true, email: true, phone: true });
        return;
      }

      setErrors({});
      setIsProcessing(true);
      try {
        const nameParts = formData.name.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Client';

        localStorage.setItem('maketou_form_data', JSON.stringify(formData));
        localStorage.setItem('maketou_ticket', selectedTicket);

        const response = await fetch('https://api.maketou.net/api/v1/stores/cart/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_MAKETOU_API_KEY}`
          },
          body: JSON.stringify({
            productDocumentId: import.meta.env.VITE_MAKETOU_PRODUCT_ID,
            email: formData.email,
            firstName: firstName,
            lastName: lastName,
            phone: formData.phone,
            redirectURL: `${window.location.origin}${window.location.pathname}?status=success`,
            customerPrice: currentTicket.priceNum,
            meta: {
              eventId: event.id,
              ticketId: currentTicket.id
            }
          })
        });

        if (!response.ok) {
          const errorBody = await response.text();
          console.error('Maketou API error:', response.status, errorBody);
          throw new Error(`Erreur Maketou (${response.status})`);
        }

        const data = await response.json();

        if (data && data.redirectUrl) {
          if (data.cart && data.cart.id) {
            localStorage.setItem('maketou_cart_id', data.cart.id);
          }
          setStep(3);
          window.location.href = data.redirectUrl;
        } else {
          throw new Error('URL de redirection manquante');
        }
      } catch (error) {
        console.error(error);
        alert('Une erreur est survenue lors de l\'initialisation du paiement. Veuillez réessayer.');
        setIsProcessing(false);
      }
      return;
    }

    if (step < 4) setStep(step + 1);
  };

  const downloadTicket = async (qrCodeBase64, reference) => {
    setIsDownloading(true);
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Fond noir
      pdf.setFillColor(5, 5, 5);
      pdf.rect(0, 0, 210, 297, 'F');

      // Header
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(22);
      pdf.text('ENTRE NOUS BAR', 105, 30, { align: 'center' });
      
      pdf.setTextColor(21, 128, 61); // green-700
      pdf.setFontSize(14);
      pdf.text('TICKET OFFICIEL', 105, 40, { align: 'center' });

      // Ticket Box
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(20, 50, 170, 200, 5, 5, 'S');

      // Event Info
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.text(event.title, 105, 70, { align: 'center' });

      pdf.setFontSize(12);
      pdf.setTextColor(156, 163, 175); // gray-400
      pdf.text(`${event.day} ${event.month} ${event.year} • ${event.time}`, 105, 80, { align: 'center' });

      // Ligne de séparation
      pdf.setDrawColor(50, 50, 50);
      pdf.line(30, 95, 180, 95);

      // Détails
      pdf.setFontSize(10);
      pdf.setTextColor(156, 163, 175);
      pdf.text('TITULAIRE', 30, 110);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.text(formData.name, 30, 117);

      pdf.setFontSize(10);
      pdf.setTextColor(156, 163, 175);
      pdf.text('TYPE DE TICKET', 120, 110);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.text(currentTicket.name, 120, 117);

      pdf.setFontSize(10);
      pdf.setTextColor(156, 163, 175);
      pdf.text('RÉFÉRENCE', 30, 130);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.text(reference, 30, 137);

      pdf.setFontSize(10);
      pdf.setTextColor(156, 163, 175);
      pdf.text('PRIX', 120, 130);
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(12);
      pdf.text(currentTicket.price, 120, 137);

      // Ligne de séparation
      pdf.setDrawColor(50, 50, 50);
      pdf.line(30, 150, 180, 150);

      // QR Code
      if (qrCodeBase64) {
        pdf.addImage(qrCodeBase64, 'PNG', 65, 160, 80, 80);
      }

      pdf.save(`Ticket_EntreNousBar_${reference}.pdf`);
    } catch (err) {
      console.error('Erreur PDF:', err);
      alert('Erreur lors de la génération du ticket PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const renderStepper = () => (
    <div className="flex items-center justify-between mb-12 overflow-x-auto pb-4 max-w-4xl mx-auto">
      {STEPS.map((s, index) => {
        const isCompleted = step > s.id;
        const isActive = step === s.id;

        let dotClass = 'border border-gray-700 bg-transparent text-gray-500';
        if (isActive) dotClass = 'border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(250,204,21,0.3)]';
        if (isCompleted || (s.id === 4 && step === 4)) dotClass = 'bg-green-700 border-green-700 text-white shadow-[0_0_15px_rgba(21,128,61,0.5)]';

        let textClass = 'text-gray-500';
        if (isActive) textClass = 'text-yellow-500';
        if (isCompleted || (s.id === 4 && step === 4)) textClass = 'text-green-500';

        return (
          <React.Fragment key={s.id}>
            <div className="flex items-center gap-2 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${dotClass}`}>
                {isCompleted ? <iconify-icon icon="lucide:check"></iconify-icon> : s.id}
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase hidden sm:block transition-colors duration-300 ${textClass}`}>
                {s.short}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div className="h-px w-8 bg-gray-800 shrink-0 mx-2"></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  const renderRecapCard = () => (
    <div className="lg:col-span-5 space-y-8">
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-5 sm:p-6">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
          <OptimizedImage 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full"
            objectFit="cover"
            priority={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 45vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-4 left-4 pr-4">
            <span className="bg-green-700 text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-2 inline-block">Événement sélectionné</span>
            <h2 className={`text-xl sm:text-2xl font-bold clash tracking-tight leading-tight ${event.neonClass || 'text-white'}`}>{event.title}</h2>
            <p className="text-gray-400 text-xs mt-1">{event.day} {event.month} {event.year} • {event.time}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-4 border-b border-white/5">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Ticket Choisi</span>
              <span className="text-base sm:text-lg font-bold text-green-500">{currentTicket?.name}</span>
            </div>
            <span className="text-lg sm:text-xl font-black text-white">{currentTicket?.price}</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b border-white/5">
            <span className="text-gray-400 text-sm">Quantité</span>
            <span className="font-bold text-white">1</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-base sm:text-lg font-bold clash text-yellow-500">Total à payer</span>
            <span className="text-xl sm:text-2xl font-black text-white">{currentTicket?.price}</span>
          </div>
        </div>
      </div>

      <div className="bg-green-950/10 border border-green-900/30 rounded-2xl p-6 hidden lg:block">
        <div className="flex gap-4">
          <iconify-icon icon="lucide:shield-check" className="text-2xl text-green-500 shrink-0"></iconify-icon>
          <div>
            <h4 className="text-sm font-bold uppercase mb-1 text-white">Paiement Sécurisé</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Vos informations sont protégées par un cryptage SSL de bout en bout pour garantir une transaction sûre.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {!isVerifying && !paymentError && renderStepper()}

        {/* STEP 1: CHOIX DU TICKET */}
        {!isVerifying && !paymentError && step === 1 && (
          <div className="max-w-2xl mx-auto space-y-8 pb-32">
            <div className="text-center mb-8">
              <h1 className={`text-3xl sm:text-4xl font-bold clash tracking-tight leading-tight mb-2 ${event.neonClass || 'text-white'}`}>
                {event.title}
              </h1>
              <p className="text-yellow-500 text-sm font-bold tracking-wide flex items-center justify-center gap-2 mb-2">
                <iconify-icon icon="lucide:calendar"></iconify-icon>
                {event.day} {event.month} {event.year} • {event.time}
              </p>
              <p className="text-gray-400 text-xs font-medium flex items-center justify-center gap-2">
                <iconify-icon icon="lucide:map-pin"></iconify-icon>
                ENTRE NOUS BAR • LIBREVILLE
              </p>
            </div>

            <div className="space-y-4">
              {TICKETS.map(ticket => (
                <label key={ticket.id} className="block cursor-pointer group">
                  <input
                    type="radio"
                    name="ticket"
                    className="hidden peer"
                    checked={selectedTicket === ticket.id}
                    onChange={() => setSelectedTicket(ticket.id)}
                  />
                  <div className="bg-white/[0.03] border border-white/10 peer-checked:border-green-600 peer-checked:bg-green-600/10 p-5 rounded-2xl flex items-center justify-between transition-all duration-300 group-hover:border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                        <iconify-icon icon={ticket.icon} className={`text-2xl ${ticket.iconColor}`}></iconify-icon>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm sm:text-base uppercase mb-0.5 text-white">{ticket.name}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-400 font-medium">{ticket.desc}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-black text-sm sm:text-base text-white">{ticket.price}</p>
                      <div className="w-5 h-5 rounded-full border-2 border-white/20 mt-2 ml-auto flex items-center justify-center">
                        <div className={`w-2.5 h-2.5 rounded-full bg-green-500 transition-transform duration-300 ${selectedTicket === ticket.id ? 'scale-100' : 'scale-0'}`}></div>
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-md border-t border-white/10 p-4 sm:p-6 z-40">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Ticket sélectionné</p>
                    <h5 className="text-sm font-bold clash text-white">{currentTicket?.name} (1x)</h5>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Total</p>
                    <p className="text-lg font-black text-green-500">{currentTicket?.price}</p>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full bg-green-700 hover:bg-green-600 active:scale-[0.98] transition-all text-white py-4 rounded-xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(21,128,61,0.2)]"
                >
                  Continuer <iconify-icon icon="lucide:arrow-right"></iconify-icon>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: INFOS CLIENT */}
        {!isVerifying && !paymentError && step === 2 && (
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {renderRecapCard()}

            <div className="lg:col-span-7">
              <div className="mb-8">
                <h3 className="text-3xl sm:text-4xl font-bold clash tracking-tighter mb-2 text-white">Infos Client</h3>
                <p className="text-gray-400 text-sm">Veuillez renseigner vos informations pour l'envoi de votre ticket numérique.</p>
              </div>

              <form onSubmit={handleNext} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                    Nom Complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ex: Jean Dupont"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    onBlur={handleFormBlur}
                    className={`w-full px-5 py-4 bg-white/[0.03] border focus:outline-none rounded-xl text-sm text-white transition-all ${
                      touched.name && errors.name
                        ? 'border-red-500 focus:bg-red-600/5'
                        : 'border-white/10 focus:border-green-600 focus:bg-green-600/5'
                    }`}
                  />
                  {touched.name && errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Ex: +241 62 12 34 56"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      onBlur={handleFormBlur}
                      className={`w-full px-5 py-4 bg-white/[0.03] border focus:outline-none rounded-xl text-sm text-white transition-all ${
                        touched.phone && errors.phone
                          ? 'border-red-500 focus:bg-red-600/5'
                          : 'border-white/10 focus:border-green-600 focus:bg-green-600/5'
                      }`}
                    />
                    {touched.phone && errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      onBlur={handleFormBlur}
                      className={`w-full px-5 py-4 bg-white/[0.03] border focus:outline-none rounded-xl text-sm text-white transition-all ${
                        touched.email && errors.email
                          ? 'border-red-500 focus:bg-red-600/5'
                          : 'border-white/10 focus:border-green-600 focus:bg-green-600/5'
                      }`}
                    />
                    {touched.email && errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">Adresse (Facultatif)</label>
                  <textarea
                    name="address"
                    placeholder="Votre adresse de résidence"
                    rows="3"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="w-full px-5 py-4 bg-white/[0.03] border border-white/10 focus:border-green-600 focus:bg-green-600/5 focus:outline-none rounded-xl text-sm text-white resize-none transition-all"
                  ></textarea>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <input
                    type="checkbox"
                    name="newsletters"
                    id="newsletters"
                    checked={formData.newsletters}
                    onChange={handleFormChange}
                    className="w-5 h-5 bg-black/40 border-white/10 rounded accent-green-600 cursor-pointer"
                  />
                  <label htmlFor="newsletters" className="text-xs text-gray-400 cursor-pointer pt-0.5 leading-relaxed">
                    J'accepte de recevoir les actualités et offres exclusives de Entre Nous Bar par email.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold uppercase py-5 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(250,204,21,0.2)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? 'Redirection sécurisée...' : `Payer ${currentTicket?.price}`}
                  {!isProcessing && <iconify-icon icon="lucide:lock"></iconify-icon>}
                </button>

                <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest mt-4">
                  Étape 2 sur 3 : En cliquant, vous serez redirigé vers l'interface de paiement Maketou.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {isVerifying && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <h3 className="text-2xl font-bold clash text-white mb-2">Vérification de votre paiement...</h3>
            <p className="text-gray-400">Veuillez patienter quelques instants.</p>
          </div>
        )}

        {paymentError && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-3xl mb-6">
              <iconify-icon icon="lucide:x-circle"></iconify-icon>
            </div>
            <h3 className="text-2xl font-bold clash text-white mb-2">Problème de paiement</h3>
            <p className="text-red-400 mb-6">{paymentError}</p>
            <button onClick={() => window.location.href = '/'} className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl font-bold transition-all">Retour à l'accueil</button>
          </div>
        )}

        {!isVerifying && !paymentError && step === 4 && (
          <div className="flex flex-col md:flex-row gap-8">
            <TicketDisplay
              event={event}
              ticket={currentTicket}
              formData={formData}
              onDownload={downloadTicket}
              isLoading={isDownloading}
            />

            <div className="flex flex-col gap-3 md:mt-8" data-html2canvas-ignore="true">
              <button
                onClick={() => navigate('/')}
                className="border border-white/10 hover:bg-white/5 py-3 rounded-xl font-bold text-center transition-all uppercase text-[10px] tracking-widest text-white"
              >
                Retour Accueil
              </button>
              <a href="https://wa.me/24100000000" target="_blank" rel="noreferrer" className="bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase text-[10px] tracking-widest">
                <iconify-icon icon="logos:whatsapp-icon"></iconify-icon> WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticketing;
