import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-green-950/40"></div>
      <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/4 opacity-20 pointer-events-none">
        <iconify-icon icon="lucide:leaf" className="text-[300px] text-green-500 rotate-12"></iconify-icon>
      </div>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-8">
            <div className="w-32 md:w-40 shrink-0 transition-transform hover:scale-105 cursor-pointer">
              <img src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/960f6757-273c-400d-ba6e-33abc45b8955/1780235731271-08a07200/1000397469.png" alt="Logo Entre Nous Bar" className="w-full h-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase mb-2 clash">RESTEZ CONNECTÉ</h2>
              <p className="text-gray-300">Recevez nos actus, promos et invitations exclusives.</p>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <form className="flex w-full md:w-[500px]">
              <input type="email" placeholder="Votre adresse email" className="flex-1 bg-black/60 border border-white/10 rounded-l-lg px-6 py-4 focus:outline-none focus:border-green-600 text-white" />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold uppercase px-8 rounded-r-lg transition-colors">
                S'INSCRIRE
              </button>
            </form>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-4 text-center lg:text-left flex items-center justify-center lg:justify-start gap-2">
              Ou rejoignez notre chaîne WhatsApp <iconify-icon icon="logos:whatsapp-icon" className="text-base"></iconify-icon>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
