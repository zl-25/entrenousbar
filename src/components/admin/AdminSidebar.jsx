import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Calendar, Ticket, ConciergeBell, Users, 
  CreditCard, Image as ImageIcon, Mail, UserCog, Settings, BarChart2, LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();
  const { logout, userRole, currentUser } = useAuth();

  const allNavItems = [
    { name: 'Dashboard', path: '/admin', icon: Home, exact: true, roles: ['admin', 'manager', 'editor'] },
    { name: 'Événements', path: '/admin/events', icon: Calendar, roles: ['admin', 'manager'] },
    { name: 'Tickets', path: '/admin/tickets', icon: Ticket, roles: ['admin', 'manager', 'editor'] },
    { name: 'Réservations', path: '/admin/reservations', icon: ConciergeBell, roles: ['admin', 'manager', 'editor'] },
    { name: 'Clients', path: '/admin/clients', icon: Users, roles: ['admin', 'manager'] },
    { name: 'Paiements', path: '/admin/payments', icon: CreditCard, roles: ['admin', 'manager'] },
    { name: 'Galerie', path: '/admin/gallery', icon: ImageIcon, roles: ['admin', 'manager', 'editor'] },
    { name: 'Newsletters', path: '/admin/newsletters', icon: Mail, roles: ['admin'] },
    { name: 'Utilisateurs', path: '/admin/users', icon: UserCog, roles: ['admin'] },
    { name: 'Paramètres', path: '/admin/settings', icon: Settings, roles: ['admin'] },
    { name: 'Rapports', path: '/admin/reports', icon: BarChart2, roles: ['admin', 'manager'] }
  ];

  // Filtrer selon le rôle
  const navItems = allNavItems.filter(item => item.roles.includes(userRole));
  
  // Obtenir les initiales et le libellé du rôle
  const initials = currentUser?.name?.substring(0, 2).toUpperCase() || 'AD';
  const roleLabels = {
    'admin': 'Admin',
    'manager': 'Manager',
    'editor': 'Éditeur'
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeSidebar}
        aria-hidden="true"
      ></div>

      <aside className={`fixed inset-y-0 left-0 z-40 w-[260px] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex-shrink-0 bg-[#14161B] border-r border-[#2A2D36] flex flex-col h-full`}>
        <div className="h-24 flex items-center justify-center border-b border-[#2A2D36]/50 px-4 py-3">
          <Link to="/admin">
            <img src="https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/960f6757-273c-400d-ba6e-33abc45b8955/1780235731271-08a07200/1000397469.png" alt="Logo" className="h-12 object-contain" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <p className="text-[10px] font-bold text-[#8A8D98] uppercase tracking-wider mb-4 px-3">Tableau de bord</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.exact 
                ? location.pathname === item.path 
                : location.pathname.startsWith(item.path);
              
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) closeSidebar();
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E35F] ${
                    isActive 
                      ? 'bg-[#0A3F22]/40 text-[#00E35F] font-medium border-l-2 border-[#00E35F]' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 pb-6 hidden sm:block">
          <div className="bg-[#0A3F22]/20 border border-[#00E35F]/20 rounded-xl p-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00E35F]/10 rounded-full blur-xl"></div>
            <h3 className="text-xs font-bold text-[#00E35F] uppercase tracking-wide mb-2">Site Public</h3>
            <Link to="/" target="_blank" className="w-full bg-[#00E35F] hover:bg-green-500 text-black font-semibold text-sm py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
              Voir le site
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-[#2A2D36]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1A1D24] flex items-center justify-center text-[#00E35F] font-bold border border-[#2A2D36]">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{currentUser?.name || 'Utilisateur'}</p>
                <p className="text-[10px] text-[#8A8D98]">{roleLabels[userRole] || 'Connecté'}</p>
              </div>
            </div>
            <button onClick={logout} className="text-[#8A8D98] hover:text-red-400 transition-colors p-2" title="Déconnexion">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
