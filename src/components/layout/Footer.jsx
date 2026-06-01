import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <img src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/960f6757-273c-400d-ba6e-33abc45b8955/1780235731271-08a07200/1000397469.png" alt="Logo Entre Nous Bar" className="h-16 md:h-20 w-auto mb-6 drop-shadow-md" loading="lazy" decoding="async" width="160" height="80" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Entre Nous Bar, le bar plein air qui vous accueille dans une ambiance chaleureuse et festive.
            </p>
            <div className="flex gap-4">
              <a href="#" id="footer-fb" className="text-xl text-gray-400 hover:text-white transition-colors"><iconify-icon icon="lucide:facebook"></iconify-icon></a>
              <a href="#" id="footer-ig" className="text-xl text-gray-400 hover:text-white transition-colors"><iconify-icon icon="lucide:instagram"></iconify-icon></a>
              <a href="#" id="footer-tt" className="text-xl text-gray-400 hover:text-white transition-colors"><iconify-icon icon="ri:tiktok-fill"></iconify-icon></a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6">Liens Utiles</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" id="f-link-1" className="hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/events" id="f-link-2" className="hover:text-white transition-colors">Événements</Link></li>
              <li><Link to="/reservation" id="f-link-3" className="hover:text-white transition-colors">Réservations</Link></li>
              <li><Link to="/gallery" id="f-link-4" className="hover:text-white transition-colors">Galerie</Link></li>
              <li><Link to="#" id="f-link-5" className="hover:text-white transition-colors">À propos</Link></li>
              <li><Link to="#" id="f-link-6" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6">Infos Pratiques</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <iconify-icon icon="lucide:map-pin" className="text-green-500 mt-1"></iconify-icon>
                <span>Libreville, Gabon</span>
              </li>
              <li className="flex items-start gap-3">
                <iconify-icon icon="lucide:phone" className="text-green-500 mt-1"></iconify-icon>
                <span>+241 62 12 34 56</span>
              </li>
              <li className="flex items-start gap-3">
                <iconify-icon icon="lucide:mail" className="text-green-500 mt-1"></iconify-icon>
                <span>contact@entrenousbar.ga</span>
              </li>
              <li className="flex items-start gap-3">
                <iconify-icon icon="lucide:clock" className="text-green-500 mt-1"></iconify-icon>
                <span>Ouvert tous les jours<br />18H00 - 02H00</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6">Paiements Sécurisés</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <img src="/visa-logo.svg" className="h-6 w-auto" alt="Visa" />
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <img src="/mastercard-logo.svg" className="h-7 w-auto" alt="Mastercard" />
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all">
                <img src="/airtel-money-logo.svg" className="h-7 w-auto" alt="Airtel Money" />
              </div>
            </div>
            <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest">@entrenousbar</p>
            <div className="mt-2 flex gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><iconify-icon icon="lucide:facebook"></iconify-icon></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><iconify-icon icon="lucide:instagram"></iconify-icon></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><iconify-icon icon="ri:tiktok-fill"></iconify-icon></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-gray-500 font-bold tracking-widest">
          <p>© 2024 ENTRE NOUS BAR. TOUS DROITS RÉSERVÉS.</p>
          <div className="flex gap-8">
            <a href="#" id="legal-mentions" className="hover:text-white">MENTIONS LÉGALES</a>
            <a href="#" id="legal-cgv" className="hover:text-white">CONDITIONS GÉNÉRALES</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
