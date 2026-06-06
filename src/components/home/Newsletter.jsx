import React, { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import OptimizedImage from '../common/OptimizedImage';
import { supabase } from '../../lib/supabaseClient';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletters')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505' || (error.message && error.message.includes('unique'))) {
          setStatus('already');
          setTimeout(() => setStatus(null), 4000);
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus(null), 4000);
      }
    } catch (err) {
      console.error('Newsletter error:', err);
      setStatus('error');
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-green-950/40"></div>
      <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/4 opacity-20 pointer-events-none">
        <iconify-icon icon="lucide:leaf" className="text-[300px] text-green-500 rotate-12"></iconify-icon>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex items-center gap-8">
              <div className="w-32 md:w-40 shrink-0 transition-transform hover:scale-105 cursor-pointer">
                <OptimizedImage
                  src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/960f6757-273c-400d-ba6e-33abc45b8955/1780235731271-08a07200/1000397469.png"
                  alt="Logo Entre Nous Bar"
                  className="w-full h-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  objectFit="contain"
                  priority={true}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold uppercase mb-2 clash">RESTEZ CONNECTÉ</h2>
                <p className="text-gray-300">Recevez nos actus, promos et invitations exclusives.</p>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <form onSubmit={handleSubmit} className="flex w-full md:w-[500px]">
                <input 
                  type="email" 
                  aria-label="Adresse email pour la newsletter"
                  placeholder="Votre adresse email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-black/60 border border-white/10 rounded-l-lg px-6 py-4 focus:outline-none focus:border-green-600 text-white" 
                />
                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold uppercase px-8 rounded-r-lg transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? '...' : "S'INSCRIRE"}
                </button>
              </form>
              {status === 'success' && (
                <p className="text-green-400 text-sm mt-3 text-center lg:text-left font-bold">✅ Inscription réussie ! Bienvenue dans la famille.</p>
              )}
              {status === 'already' && (
                <p className="text-yellow-400 text-sm mt-3 text-center lg:text-left font-bold">⚠️ Cet email est déjà inscrit.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm mt-3 text-center lg:text-left font-bold">❌ Erreur, veuillez réessayer.</p>
              )}
              {!status && (
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-4 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
                  Ou rejoignez notre chaîne WhatsApp <iconify-icon icon="logos:whatsapp-icon" className="text-base"></iconify-icon>
                </p>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Newsletter;
