import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Search, Filter, Check, X } from 'lucide-react';

const AdminReservations = () => {
  const { reservations, updateReservationStatus } = useAdmin();
  const [filterStatus, setFilterStatus] = React.useState('Tous');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const cycleFilter = () => {
    const statuses = ['Tous', 'En attente', 'Confirmé', 'Annulé'];
    const nextIdx = (statuses.indexOf(filterStatus) + 1) % statuses.length;
    setFilterStatus(statuses[nextIdx]);
  };

  const filteredReservations = reservations.filter(r => {
    const matchStatus = filterStatus === 'Tous' || r.status === filterStatus;
    const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Réservations</h1>
          <p className="text-sm text-[#8A8D98]">Gérez les réservations de tables et VIP</p>
        </div>
      </div>

      <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2D36] flex flex-wrap justify-between items-center bg-[#111317]/50 gap-4">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A8D98]" />
            </div>
            <input 
              type="text" 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher un client..." 
              className="block w-full pl-10 pr-3 py-2 border border-[#2A2D36] rounded-lg bg-[#1A1D24] text-white placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] focus:ring-1 focus:ring-[#00E35F] text-sm transition-all"
            />
          </div>
          <button onClick={cycleFilter} className="flex items-center gap-2 px-4 py-2 border border-[#2A2D36] rounded-lg text-white hover:bg-[#2A2D36] transition-colors text-sm">
            <Filter size={16} />
            {filterStatus === 'Tous' ? 'Filtrer par statut' : `Filtre: ${filterStatus}`}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8A8D98]">
            <thead className="text-xs uppercase bg-[#111317]/50 text-[#8A8D98] border-b border-[#2A2D36]">
              <tr>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Détails</th>
                <th className="px-6 py-4 font-semibold">Heure</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2A2D36] flex items-center justify-center text-white font-bold uppercase">
                        {res.name.substring(0,2)}
                      </div>
                      <div className="font-semibold text-white">{res.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{res.type}</div>
                    <div className="text-xs">{res.persons} personnes</div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {res.time}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${
                      res.status === 'Confirmé' ? 'text-[#00E35F] bg-[#00E35F]/10 border border-[#00E35F]/20' :
                      res.status === 'En attente' ? 'text-orange-400 bg-orange-500/10 border border-orange-500/20' :
                      'text-red-400 bg-red-500/10 border border-red-500/20'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {res.status === 'En attente' && (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => updateReservationStatus(res.id, 'Confirmé')}
                          className="p-1.5 bg-[#00E35F]/10 hover:bg-[#00E35F]/20 text-[#00E35F] rounded-lg transition-colors border border-[#00E35F]/20" 
                          title="Confirmer"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => updateReservationStatus(res.id, 'Annulé')}
                          className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20" 
                          title="Refuser"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReservations;
