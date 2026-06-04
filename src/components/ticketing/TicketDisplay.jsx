import React, { useState, useEffect } from 'react';
import { generateTicketQRCode } from '../../utils/qrCodeGenerator';
import OptimizedImage from '../common/OptimizedImage';

const TicketDisplay = ({ 
  event, 
  ticket, 
  formData, 
  onDownload,
  isLoading = false 
}) => {
  const [qrCode, setQrCode] = useState(null);
  const [qrLoading, setQrLoading] = useState(true);

  // Utiliser useState pour stabiliser la référence et éviter la boucle de re-rendu
  const [reference] = useState(() => `ENB-${event.id}-${ticket.id}-${Date.now().toString().slice(-5)}`);

  useEffect(() => {
    const generateQR = async () => {
      setQrLoading(true);
      try {
        const qr = await generateTicketQRCode({
          id: reference,
          ticketId: ticket.id,
          eventId: event.id,
          email: formData.email,
          timestamp: new Date().toISOString()
        });
        setQrCode(qr);

        // Save ticket to database
        try {
          await fetch('/api/tickets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              reference,
              event_id: event.id,
              event_title: event.title,
              ticket_type: ticket.id,
              ticket_name: ticket.name,
              price: ticket.price,
              buyer_name: formData.name,
              buyer_email: formData.email,
              buyer_phone: formData.phone || '',
              qr_data: JSON.stringify({ id: reference, ticketId: ticket.id, eventId: event.id, email: formData.email })
            })
          });
        } catch (err) {
          console.warn('Impossible de sauvegarder le ticket en base:', err);
        }
      } catch (err) {
        console.error('Erreur QR code:', err);
      } finally {
        setQrLoading(false);
      }
    };
    generateQR();
  }, [reference, ticket.id, event.id, formData.email]);

  return (
    <div className="bg-[#050505] border border-white/5 rounded-3xl p-6 md:p-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-600/20 rounded-full blur-[80px]"></div>
      
      <div className="flex flex-col md:flex-row gap-8 relative z-10">
        {/* Ticket Image */}
        <div className="w-full md:w-2/5 shrink-0">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-black">
            <OptimizedImage 
              src={event.image}
              alt={event.title}
              className="w-full h-full"
              objectFit="cover"
              priority={true}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-yellow-500 font-bold uppercase tracking-widest text-[10px] mb-2">Événement Confirmé</p>
              <h3 className={`text-2xl font-bold clash leading-none ${event.neonClass || 'text-white'}`}>
                {event.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-green-700/20 rounded-full flex items-center justify-center text-green-500 text-2xl">
              <iconify-icon icon="lucide:check-circle"></iconify-icon>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold clash leading-tight">Paiement Réussi !</h1>
              <p className="text-gray-400 text-sm">Merci {formData.name}, votre commande est confirmée.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Référence</span>
                <span className="text-sm font-bold text-white break-all">{reference}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date & Heure</span>
                <span className="text-sm font-bold text-white">{event.day} {event.month} • {event.time}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Lieu</span>
                <span className="text-sm font-bold text-white">Entre Nous Bar, Libreville</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</span>
                <span className="text-sm font-bold text-white break-all">{formData.email}</span>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl">
              {qrLoading ? (
                <div className="w-40 h-40 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-green-600"></div>
                </div>
              ) : qrCode ? (
                <>
                  <img src={qrCode} alt="Ticket QR Code" className="w-40 h-40 mb-2" />
                  <span className="text-[9px] font-black text-black uppercase tracking-tighter">Scannez à l'entrée</span>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-red-600 text-xs font-bold">Erreur QR Code</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 mt-auto">
            <div className="flex justify-between items-center mb-6">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400">Tickets</span>
                <span className="text-sm font-bold text-white">1 × {ticket.name}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400">Total</span>
                <span className="text-xl font-bold text-green-500">{ticket.price}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3" data-html2canvas-ignore="true">
              <button 
                onClick={() => onDownload(qrCode, reference)}
                disabled={isLoading || qrLoading}
                className="w-full bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all uppercase text-xs tracking-widest text-white"
              >
                <iconify-icon icon="lucide:download"></iconify-icon>
                {isLoading ? 'Génération...' : 'Télécharger mon ticket (PDF)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDisplay;
