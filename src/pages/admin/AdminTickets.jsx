import React, { useState, useEffect } from 'react';
import { Search, QrCode, CheckCircle, XCircle, Camera } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabaseClient';

const AdminTickets = () => {
  const [ticketCode, setTicketCode] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Vérifier un ticket via Supabase
  const verifyTicket = async (code) => {
    if (!code) return;
    try {
      // Chercher le ticket dans Supabase
      const { data: ticket, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('reference', code)
        .single();

      if (error || !ticket) {
        setScanResult({
          success: false,
          error: 'Ticket introuvable dans la base de données'
        });
        toast.error('Ticket invalide !');
      } else if (ticket.status === 'used') {
        setScanResult({
          success: false,
          error: `Ce ticket a déjà été utilisé le ${new Date(ticket.scanned_at).toLocaleString('fr-FR')}`
        });
        toast.error('Ticket déjà utilisé !');
      } else {
        // Marquer comme utilisé
        await supabase
          .from('tickets')
          .update({ status: 'used', scanned_at: new Date().toISOString() })
          .eq('id', ticket.id);

        setScanResult({
          success: true,
          ticket: {
            code: ticket.reference,
            event: ticket.event_title,
            type: ticket.ticket_type,
            buyer: ticket.buyer_name,
            status: 'Validé ✓'
          }
        });
        toast.success('Ticket validé avec succès !');
      }
    } catch (err) {
      console.error(err);
      setScanResult({
        success: false,
        error: 'Erreur de connexion au serveur'
      });
      toast.error('Erreur de connexion');
    }
    setCameraActive(false);
  };

  const handleSimulateScan = async (e) => {
    e.preventDefault();
    await verifyTicket(ticketCode);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Vérification des Tickets</h1>
        <p className="text-sm text-[#8A8D98]">Scannez ou entrez manuellement le code du ticket</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <QrCode className="text-purple-500" />
            Scanner un ticket
          </h2>
          
          <div className="w-full aspect-video bg-[#111317] border-2 border-dashed border-[#2A2D36] rounded-xl flex flex-col items-center justify-center overflow-hidden relative mb-6">
            {!cameraActive ? (
              <div className="flex flex-col items-center text-[#8A8D98]">
                <Camera size={48} className="mb-2 opacity-50" />
                <p>La caméra est désactivée</p>
                <button 
                  onClick={() => {
                    if (window.isSecureContext === false) {
                      toast.error("ATTENTION: La caméra nécessite une connexion sécurisée (HTTPS) ou 'localhost' pour fonctionner sur mobile. Si vous testez via une adresse IP locale, cela peut bloquer la caméra.", { duration: 8000 });
                    }
                    setCameraActive(true);
                  }}
                  className="mt-4 bg-[#2A2D36] hover:bg-[#3f4352] text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <Camera size={16} />
                  Activer la caméra
                </button>
                {window.isSecureContext === false && (
                  <p className="mt-3 text-xs text-red-400 text-center max-w-xs">
                    ⚠️ La caméra peut ne pas fonctionner car vous n'êtes pas sur une connexion HTTPS ou localhost.
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full h-full relative">
                <Scanner 
                  onScan={(detectedCodes) => {
                    if (detectedCodes && detectedCodes.length > 0) {
                      const rawValue = detectedCodes[0].rawValue;
                      // Le QR contient un JSON avec {id, ticketId, eventId, email}
                      // On extrait la référence (champ "id") pour la vérification
                      let ticketRef = rawValue;
                      try {
                        const parsed = JSON.parse(rawValue);
                        ticketRef = parsed.id || parsed.reference || rawValue;
                      } catch {
                        // Si ce n'est pas du JSON, on utilise le texte brut
                      }
                      verifyTicket(ticketRef);
                    }
                  }} 
                  onError={(error) => {
                    console.error("Scanner error:", error);
                    toast.error("Erreur caméra : " + (error?.name === 'NotAllowedError' ? 'Permission refusée' : (error?.message || 'impossible d\'accéder')));
                  }}
                  options={{ delayBetweenScanSuccess: 2000 }}
                />
                <button 
                  onClick={() => setCameraActive(false)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm transition-all"
                >
                  Arrêter la caméra
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#2A2D36]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-[#1A1D24] text-[#8A8D98] text-sm">OU ENTRÉE MANUELLE</span>
            </div>
          </div>

          <form onSubmit={handleSimulateScan} className="mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Code du ticket (ex: ENB-12345)" 
                value={ticketCode}
                onChange={(e) => setTicketCode(e.target.value)}
                className="flex-1 w-full px-4 py-3 border border-[#2A2D36] rounded-xl bg-[#111317] text-white placeholder-[#8A8D98] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all uppercase"
              />
              <button 
                type="submit"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
              >
                Vérifier
              </button>
            </div>
          </form>
        </div>

        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Résultat du scan</h2>
          
          {scanResult ? (
            <div className={`p-6 rounded-xl border ${scanResult.success ? 'bg-[#00E35F]/10 border-[#00E35F]/30' : 'bg-red-500/10 border-red-500/30'}`}>
              {scanResult.success ? (
                <div className="text-center">
                  <CheckCircle size={64} className="text-[#00E35F] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-[#00E35F] mb-2">Ticket Valide</h3>
                  
                  <div className="bg-[#111317] rounded-lg p-4 mt-6 text-left space-y-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#2A2D36] pb-2">
                      <span className="text-[#8A8D98] text-xs sm:text-sm">Code</span>
                      <span className="font-mono text-white font-bold break-all">{scanResult.ticket.code}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#2A2D36] pb-2">
                      <span className="text-[#8A8D98] text-xs sm:text-sm">Événement</span>
                      <span className="text-white font-medium break-words">{scanResult.ticket.event}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#2A2D36] pb-2">
                      <span className="text-[#8A8D98] text-xs sm:text-sm">Type</span>
                      <span className="text-purple-400 font-bold">{scanResult.ticket.type}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <span className="text-[#8A8D98] text-xs sm:text-sm">Acheteur</span>
                      <span className="text-white break-words">{scanResult.ticket.buyer}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setScanResult(null);
                      setTicketCode('');
                    }}
                    className="mt-6 w-full bg-[#2A2D36] hover:bg-[#3f4352] text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Nouveau scan
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <XCircle size={64} className="text-red-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-red-500 mb-2">Erreur</h3>
                  <p className="text-red-400 mb-6">{scanResult.error}</p>
                  <button 
                    onClick={() => {
                      setScanResult(null);
                      setTicketCode('');
                    }}
                    className="w-full bg-[#2A2D36] hover:bg-[#3f4352] text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Réessayer
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-[#8A8D98]">
              <QrCode size={48} className="mb-4 opacity-20" />
              <p>En attente de scan...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
