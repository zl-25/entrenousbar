import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'ACCUEIL', path: '/' },
    { name: 'ÉVÉNEMENTS', path: '/events' },
    { name: 'RÉSERVATIONS', path: '/reservation' },
    { name: 'GALERIE', path: '/gallery' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center shrink-0 order-first">
            <Link to="/" id="nav-logo-link" className="block group">
              <OptimizedImage
                src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/960f6757-273c-400d-ba6e-33abc45b8955/1780235731271-08a07200/1000397469.png"
                alt="Entre Nous Bar Logo"
                className="h-10 md:h-16 w-auto drop-shadow-[0_0_10px_rgba(34,197,94,0.2)] group-hover:scale-105 transition-transform duration-300"
                priority={true}
                width={160}
                height={64}
              />
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-xs font-semibold tracking-widest transition-colors ${
                  location.pathname === link.path 
                    ? 'text-white border-b-2 border-green-600 pb-1' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/events" id="nav-reserve-cta" className="hidden sm:block bg-green-700 hover:bg-green-600 text-white px-6 py-2.5 rounded text-xs font-bold tracking-wider transition-all uppercase">
              Réserver / Acheter
            </Link>
            <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors flex items-center justify-center p-1" title="Espace Staff">
              <iconify-icon icon="lucide:user" class="text-xl"></iconify-icon>
            </Link>
            <button className="lg:hidden text-white text-2xl" onClick={() => setIsOpen(!isOpen)}>
              <iconify-icon icon={isOpen ? "lucide:x" : "lucide:menu"}></iconify-icon>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#050505] border-t border-white/5 p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-semibold tracking-widest ${
                location.pathname === link.path ? 'text-green-500' : 'text-gray-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/events" className="mt-4 text-center bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded text-xs font-bold tracking-wider transition-all uppercase" onClick={() => setIsOpen(false)}>
            Réserver / Acheter
          </Link>
          <Link to="/admin/login" className="mt-2 text-center text-gray-400 hover:text-white text-xs font-bold tracking-widest transition-all uppercase flex items-center justify-center gap-2" onClick={() => setIsOpen(false)}>
            <iconify-icon icon="lucide:user" class="text-lg"></iconify-icon>
            Espace Staff
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
