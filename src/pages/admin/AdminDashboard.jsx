import React from 'react';
import { Ticket, CalendarDays, ConciergeBell, Users, CircleDollarSign, Plus, Upload, BarChart3, MoreVertical, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { events, reservations, transactions, tickets } = useAdmin();
  const { userRole } = useAuth();

  // Real stats calculation based on actual DB records
  const totalIncome = transactions.filter(t => t.isIncome).reduce((acc, curr) => {
    const amountStr = typeof curr.amount === 'string' ? curr.amount : curr.amount?.toString() || '0';
    return acc + parseInt(amountStr.replace(/[^0-9]/g, ''), 10);
  }, 0);
  const eventsCount = events.length;
  const resCount = reservations.length;
  const ticketCount = tickets ? tickets.length : 0;
  
  // Calculate ticket sales total
  const ticketSalesTotal = (tickets || []).reduce((acc, t) => {
    const priceStr = typeof t.price === 'string' ? t.price : t.price?.toString() || '0';
    return acc + parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
  }, 0);
  
  // Calculate unique clients from reservations and tickets
  const uniqueClients = [...new Set([
    ...reservations.map(r => r.name || r.client_name),
    ...(tickets || []).map(t => t.buyer_name)
  ].filter(Boolean))].length;

  return (
    <div className="space-y-4 sm:space-y-6 pb-10">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {/* Tickets */}
        <div className="bg-[#1A1D24] rounded-xl p-4 sm:p-5 border border-[#2A2D36] relative overflow-hidden group hover:border-[#2A2D36]/80 transition-colors">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00E35F]/10 flex items-center justify-center">
              <Ticket className="text-[#00E35F]" size={20} />
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-[#8A8D98] uppercase tracking-wider">Ventes Tickets</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 truncate">
            {userRole === 'editor' ? '***' : `${ticketSalesTotal.toLocaleString()} F`}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-[#00E35F]">
              {userRole === 'editor' ? '-' : `${ticketCount} ticket${ticketCount > 1 ? 's' : ''}`} <span className="text-[#8A8D98] font-normal hidden sm:inline">vendu{ticketCount > 1 ? 's' : ''}</span>
            </span>
            <svg width="50" height="16" viewBox="0 0 60 20" className="overflow-visible">
              <path d="M0,15 L10,15 L20,15 L30,15 L40,15 L50,15 L60,15" fill="none" stroke="#00E35F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Events */}
        <div className="bg-[#1A1D24] rounded-xl p-4 sm:p-5 border border-[#2A2D36] relative overflow-hidden group hover:border-[#2A2D36]/80 transition-colors">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <CalendarDays className="text-purple-500" size={20} />
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-[#8A8D98] uppercase tracking-wider">Événements</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{eventsCount}</h3>
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-purple-400">+3 <span className="text-[#8A8D98] font-normal hidden sm:inline">ce mois</span></span>
            <svg width="50" height="16" viewBox="0 0 60 20" className="overflow-visible">
              <path d="M0,18 L15,14 L30,16 L45,8 L60,6" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Reservations */}
        <div className="bg-[#1A1D24] rounded-xl p-4 sm:p-5 border border-[#2A2D36] relative overflow-hidden group hover:border-[#2A2D36]/80 transition-colors">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <ConciergeBell className="text-orange-500" size={20} />
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-[#8A8D98] uppercase tracking-wider">Réservations</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{resCount}</h3>
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-orange-400">+14.2% <span className="text-[#8A8D98] font-normal hidden sm:inline">ce mois</span></span>
            <svg width="50" height="16" viewBox="0 0 60 20" className="overflow-visible">
              <path d="M0,15 L12,10 L24,14 L36,6 L48,8 L60,2" fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Clients */}
        <div className="bg-[#1A1D24] rounded-xl p-4 sm:p-5 border border-[#2A2D36] relative overflow-hidden group hover:border-[#2A2D36]/80 transition-colors">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="text-blue-500" size={20} />
            </div>
            <p className="text-[10px] sm:text-xs font-medium text-[#8A8D98] uppercase tracking-wider">Clients</p>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{uniqueClients}</h3>
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs font-medium text-blue-400">+22.7% <span className="text-[#8A8D98] font-normal hidden sm:inline">ce mois</span></span>
            <svg width="50" height="16" viewBox="0 0 60 20" className="overflow-visible">
              <path d="M0,16 L15,10 L30,12 L45,4 L60,0" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Revenue - Only show to admin/manager */}
        {userRole !== 'editor' && (
          <div className="bg-[#1A1D24] rounded-xl p-4 sm:p-5 border border-[#2A2D36] relative overflow-hidden group hover:border-[#2A2D36]/80 transition-colors sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#00E35F]/10 flex items-center justify-center">
                <CircleDollarSign className="text-[#00E35F]" size={20} />
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-[#8A8D98] uppercase tracking-wider">Chiffre d'affaires</p>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 truncate">{totalIncome.toLocaleString()} F</h3>
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-medium text-[#00E35F]">+20.3% <span className="text-[#8A8D98] font-normal hidden sm:inline">ce mois</span></span>
              <svg width="50" height="16" viewBox="0 0 60 20" className="overflow-visible">
                <path d="M0,15 L10,12 L20,16 L30,8 L40,10 L50,4 L60,0" fill="none" stroke="#00E35F" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {userRole !== 'editor' && (
          <Link to="/admin/events" className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-5 hover:border-[#00E35F]/30 hover:bg-[#00E35F]/5 transition-all group text-left block">
            <div className="w-10 h-10 rounded-lg bg-[#00E35F]/10 flex items-center justify-center mb-3 group-hover:bg-[#00E35F]/20 transition-colors">
              <Plus className="text-[#00E35F]" size={20} />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1">Créer événement</h3>
            <p className="text-[10px] text-[#8A8D98] hidden sm:block">Ajouter un nouvel événement</p>
          </Link>
        )}
        <Link to="/admin/tickets" className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all group text-left block">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3 group-hover:bg-purple-500/20 transition-colors">
            <Ticket className="text-purple-400" size={20} />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white mb-1">Gérer tickets</h3>
          <p className="text-[10px] text-[#8A8D98] hidden sm:block">Vérifier et valider</p>
        </Link>
        <Link to="/admin/gallery" className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-5 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all group text-left block">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3 group-hover:bg-orange-500/20 transition-colors">
            <Upload className="text-orange-400" size={20} />
          </div>
          <h3 className="text-xs sm:text-sm font-bold text-white mb-1">Ajouter photos</h3>
          <p className="text-[10px] text-[#8A8D98] hidden sm:block">Galerie & médias</p>
        </Link>
        {userRole !== 'editor' && (
          <Link to="/admin/reports" className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all group text-left block">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3 group-hover:bg-blue-500/20 transition-colors">
              <BarChart3 className="text-blue-400" size={20} />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white mb-1">Voir rapports</h3>
            <p className="text-[10px] text-[#8A8D98] hidden sm:block">Analyses détaillées</p>
          </Link>
        )}
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Prochains Événements */}
        <div className="lg:col-span-8 bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">Prochains événements</h2>
            {userRole !== 'editor' && (
              <Link to="/admin/events" className="text-xs font-medium text-[#00E35F] hover:text-green-400 border border-[#00E35F]/30 bg-[#00E35F]/10 px-3 py-1.5 rounded-lg transition-colors">
                Voir tous
              </Link>
            )}
          </div>
          
          <div className="space-y-4 overflow-x-auto pb-2">
            {events.slice(0, 4).map((evt) => (
              <div key={evt.id} className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 hover:bg-white/[0.02] rounded-lg transition-colors group">
                <img src={evt.image} alt={evt.title} className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover shadow-md flex-shrink-0 bg-gray-800" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight mb-1 truncate">{evt.title}</h4>
                  <p className="text-[10px] sm:text-xs text-[#8A8D98] flex items-center gap-2 truncate">
                    {evt.date} - {evt.time}
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-[#00E35F]/10 text-[#00E35F] border border-[#00E35F]/20 uppercase tracking-widest">Actif</span>
                  </p>
                </div>
                <div className="w-32 sm:w-48 flex-shrink-0 hidden sm:block">
                  <div className="flex justify-between text-[9px] sm:text-[10px] text-[#8A8D98] mb-1">
                    <span className="uppercase tracking-wider font-semibold">Tickets</span>
                    <span className="uppercase tracking-wider font-semibold">Prix</span>
                  </div>
                  <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-white mb-1.5">
                    <span>- / 500</span>
                    <span className="text-[#00E35F]">{userRole === 'editor' ? '***' : evt.price}</span>
                  </div>
                  <div className="overflow-hidden h-1 flex rounded bg-[#2A2D36]">
                    <div style={{width: '20%'}} className="bg-[#00E35F] rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dernières Réservations & Transactions */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Réservations</h2>
              <span className="text-[10px] font-bold text-[#00E35F] bg-[#00E35F]/10 border border-[#00E35F]/20 px-2 py-1 rounded-md">+{reservations.length}</span>
            </div>
            <div className="space-y-4">
              {reservations.slice(0, 3).map((res) => (
                <div key={res.id} className="flex items-center gap-3 p-2 hover:bg-white/[0.02] rounded-lg transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs text-white font-bold uppercase">
                    {res.name.substring(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">{res.name}</h4>
                    <p className="text-[10px] text-[#8A8D98]">{res.persons} pers. · {res.type} · {res.time}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded uppercase ${
                    res.status === 'Confirmé' ? 'text-[#00E35F] bg-[#00E35F]/10' :
                    res.status === 'En attente' ? 'text-orange-400 bg-orange-500/10' :
                    'text-red-400 bg-red-500/10'
                  }`}>
                    {res.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {userRole !== 'editor' && (
            <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-4 sm:p-6 flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider">Transactions</h2>
              </div>
              <div className="space-y-4">
                {transactions.slice(0, 3).map((tx) => (
                  <div key={tx.id} className="flex items-center gap-3 p-2 hover:bg-white/[0.02] rounded-lg transition-colors">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      tx.isIncome ? 'bg-[#00E35F]/10' : 'bg-red-500/10'
                    }`}>
                      {tx.isIncome ? <ArrowDownLeft className="text-[#00E35F]" size={16} /> : <ArrowUpRight className="text-red-400" size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{tx.type}</h4>
                      <p className="text-[10px] text-[#8A8D98]">{tx.method} · {tx.time}</p>
                    </div>
                    <span className={`text-xs font-bold whitespace-nowrap ${
                      tx.isIncome ? 'text-[#00E35F]' : 'text-red-400'
                    }`}>
                      {tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
