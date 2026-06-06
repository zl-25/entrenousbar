import React, { useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Search, Filter, Check, X, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminReservations = () => {
  const { reservations, updateReservationStatus, updateReservation, deleteReservation } = useAdmin();
  const [filterStatus, setFilterStatus] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingReservation, setEditingReservation] = useState(null);
  
  const cycleFilter = () => {
    const statuses = ['Tous', 'En attente', 'Confirmé', 'Annulé'];
    const nextIdx = (statuses.indexOf(filterStatus) + 1) % statuses.length;
    setFilterStatus(statuses[nextIdx]);
  };

  const filteredReservations = reservations.filter(r => {
    const matchStatus = filterStatus === 'Tous' || r.status === filterStatus;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = r.name?.toLowerCase().includes(searchLower) || 
                        r.email?.toLowerCase().includes(searchLower) ||
                        r.phone?.toLowerCase().includes(searchLower) ||
                        r.date?.toLowerCase().includes(searchLower);
    return matchStatus && matchSearch;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?")) {
      try {
        await deleteReservation(id);
        toast.success("Réservation supprimée");
      } catch (err) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateReservation(editingReservation.id, editingReservation);
      setEditingReservation(null);
      toast.success("Réservation modifiée avec succès");
    } catch (err) {
      toast.error("Erreur lors de la modification");
    }
  };

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
            <button 
              type="button"
              className="absolute inset-y-0 left-0 pl-3 flex items-center"
              onClick={() => document.getElementById('search-res-input')?.focus()}
            >
              <Search size={18} className="text-[#8A8D98] hover:text-white transition-colors" />
            </button>
            <input 
              id="search-res-input"
              type="text" 
              aria-label="Rechercher une réservation"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher nom, email, téléphone..." 
              className="block w-full pl-10 pr-3 py-2 border border-[#2A2D36] rounded-lg bg-[#1A1D24] text-white placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] focus:ring-1 focus:ring-[#00E35F] text-sm transition-all"
            />
          </div>
          <button type="button" onClick={cycleFilter} className="flex items-center gap-2 px-4 py-2 border border-[#2A2D36] rounded-lg text-white hover:bg-[#2A2D36] transition-colors text-sm">
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
                        {res.name?.substring(0,2) || '?'}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{res.name}</div>
                        <div className="text-xs text-[#8A8D98]">{res.email} • {res.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{res.type}</div>
                    <div className="text-xs">{res.persons} personnes {res.budget ? `• Budget: ${res.budget}` : ''}</div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    <div>{res.date}</div>
                    <div className="text-xs text-[#8A8D98]">{res.time}</div>
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
                    <div className="flex items-center justify-end gap-2">
                      {res.status === 'En attente' && (
                        <>
                          <button 
                            type="button"
                            onClick={() => updateReservationStatus(res.id, 'Confirmé')}
                            className="p-1.5 bg-[#00E35F]/10 hover:bg-[#00E35F]/20 text-[#00E35F] rounded-lg transition-colors border border-[#00E35F]/20" 
                            title="Confirmer"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            type="button"
                            onClick={() => updateReservationStatus(res.id, 'Annulé')}
                            className="p-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors border border-red-500/20" 
                            title="Refuser"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <button onClick={() => setEditingReservation(res)} className="p-1.5 bg-[#2A2D36] hover:bg-blue-500/20 text-[#8A8D98] hover:text-blue-400 rounded-lg transition-colors" title="Modifier"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(res.id)} className="p-1.5 bg-[#2A2D36] hover:bg-red-500/20 text-[#8A8D98] hover:text-red-400 rounded-lg transition-colors" title="Supprimer"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Modifier la réservation</h3>
              <button type="button" onClick={() => setEditingReservation(null)} className="text-[#8A8D98] hover:text-white" aria-label="Fermer"><X size={20}/></button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#8A8D98] mb-1">Nom complet</label>
                <input required type="text" value={editingReservation.name || ''} onChange={e => setEditingReservation({...editingReservation, name: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8A8D98] mb-1">Email</label>
                <input required type="email" value={editingReservation.email || ''} onChange={e => setEditingReservation({...editingReservation, email: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8A8D98] mb-1">Téléphone</label>
                <input required type="text" value={editingReservation.phone || ''} onChange={e => setEditingReservation({...editingReservation, phone: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#8A8D98] mb-1">Date</label>
                  <input required type="date" value={editingReservation.date || ''} onChange={e => setEditingReservation({...editingReservation, date: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8A8D98] mb-1">Heure</label>
                  <input required type="time" value={editingReservation.time || ''} onChange={e => setEditingReservation({...editingReservation, time: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#8A8D98] mb-1">Personnes</label>
                  <input required type="number" min="1" value={editingReservation.persons || 1} onChange={e => setEditingReservation({...editingReservation, persons: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#8A8D98] mb-1">Statut</label>
                  <select value={editingReservation.status || 'En attente'} onChange={e => setEditingReservation({...editingReservation, status: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]">
                    <option value="En attente">En attente</option>
                    <option value="Confirmé">Confirmé</option>
                    <option value="Annulé">Annulé</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#8A8D98] mb-1">Espace / Type</label>
                <select value={editingReservation.type || 'Standard'} onChange={e => setEditingReservation({...editingReservation, type: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]">
                  <option value="Table Standard">Table Standard</option>
                  <option value="Espace VIP">Espace VIP</option>
                  <option value="Privatisation">Privatisation</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#00E35F] hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all mt-6">Enregistrer les modifications</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReservations;
