import React, { useState } from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminHeader = ({ toggleSidebar }) => {
  const { reservations } = useAdmin();
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingReservations = reservations?.filter(r => r.status === 'En attente') || [];
  const notificationCount = pendingReservations.length;

  return (
    <header className="h-16 sm:h-20 border-b border-[#2A2D36] bg-[#111317]/50 backdrop-blur-sm flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-2 sm:gap-4">
        <button 
          onClick={toggleSidebar}
          className="text-[#8A8D98] hover:text-white p-2 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-[#00E35F] transition-colors" 
          aria-label="Ouvrir le menu"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative w-48 sm:w-64 md:w-80 group hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#8A8D98] group-focus-within:text-[#00E35F] transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="block w-full pl-10 pr-3 py-2 border border-[#2A2D36] rounded-lg leading-5 bg-[#1A1D24] text-gray-300 placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] focus:ring-1 focus:ring-[#00E35F] text-xs sm:text-sm transition-all"
          />
        </div>
        <button className="text-[#8A8D98] hover:text-white p-2 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-[#00E35F]">
          <Search size={20} />
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative text-[#8A8D98] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E35F] rounded-full p-1"
          >
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#00E35F] text-black text-[9px] sm:text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#111317]">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-[#1A1D24] border border-[#2A2D36] rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-[#2A2D36] bg-[#111317]">
                <h3 className="text-sm font-bold text-white">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {pendingReservations.length > 0 ? (
                  pendingReservations.map(res => (
                    <div key={res.id} className="p-3 border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                      <p className="text-xs text-white font-medium">Nouvelle réservation: {res.name}</p>
                      <p className="text-[10px] text-[#8A8D98]">{res.persons} pers. - {res.date || res.time}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-[#8A8D98]">Aucune notification</div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 cursor-pointer pl-3 sm:pl-4 border-l border-[#2A2D36]">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1A1D24] flex items-center justify-center text-[#00E35F] font-bold border border-[#2A2D36]">
            AD
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white leading-tight">Admin</p>
            <p className="text-[11px] text-[#8A8D98]">Super Administrateur</p>
          </div>
          <ChevronDown size={16} className="text-[#8A8D98] ml-1 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
