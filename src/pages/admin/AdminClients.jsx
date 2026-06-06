import React, { useState } from 'react';
import { Search, Users, Phone, Mail } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminClients = () => {
  const { reservations, tickets } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  // Combiner les réservations et les tickets pour obtenir tous les clients
  const allClientData = [
    ...reservations.map(r => ({
      name: r.name,
      phone: r.phone,
      email: r.email,
      type: r.type || 'Réservation',
      created_at: r.created_at
    })),
    ...(tickets || []).map(t => ({
      name: t.buyer_name,
      phone: t.buyer_phone,
      email: t.buyer_email,
      type: `Ticket: ${t.ticket_name || t.ticket_type || 'Standard'}`,
      created_at: t.created_at
    }))
  ];

  // Construire la liste unique des clients
  const clients = allClientData
    .filter(r => r.name && r.name.trim() !== '')
    .reduce((acc, r) => {
      const existing = acc.find(c => c.name === r.name);
      if (existing) {
        existing.visits += 1;
        if (new Date(r.created_at) > new Date(existing.lastVisit)) {
          existing.lastVisit = r.created_at;
          // Mettre à jour le type avec la dernière action
          existing.type = r.type;
        }
      } else {
        acc.push({
          id: r.id || `${r.name}-${r.created_at}`,
          name: r.name,
          phone: r.phone || '—',
          email: r.email || '—',
          visits: 1,
          lastVisit: r.created_at || new Date().toISOString(),
          type: r.type || '—',
        });
      }
      return acc;
    }, []);

  const filtered = clients.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Clients</h1>
          <p className="text-sm text-[#8A8D98]">Base de données clients (Acheteurs de tickets & Réservations)</p>
        </div>
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl px-4 py-3 flex items-center gap-3">
          <Users size={20} className="text-[#00E35F]" />
          <div>
            <p className="text-xs text-[#8A8D98]">Total clients</p>
            <p className="text-xl font-bold text-white">{clients.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2D36] bg-[#111317]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A8D98]" />
            </div>
            <input
              type="text"
              aria-label="Rechercher un client"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-[#2A2D36] rounded-lg bg-[#1A1D24] text-white placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] text-sm transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8A8D98]">
            <thead className="text-xs uppercase bg-[#111317]/50 border-b border-[#2A2D36]">
              <tr>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Espace réservé</th>
                <th className="px-6 py-4 font-semibold">Visites</th>
                <th className="px-6 py-4 font-semibold">Dernière visite</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(client => (
                <tr key={client.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00E35F]/20 to-[#00E35F]/5 border border-[#00E35F]/20 flex items-center justify-center text-[#00E35F] font-bold uppercase text-sm">
                        {client.name.substring(0, 2)}
                      </div>
                      <span className="font-semibold text-white">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs mb-1">
                      <Phone size={12} />
                      {client.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Mail size={12} />
                      {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#2A2D36] text-white px-2.5 py-1 rounded-md text-xs">{client.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white font-bold">{client.visits}</span>
                  </td>
                  <td className="px-6 py-4">
                    {client.lastVisit ? new Date(client.lastVisit).toLocaleDateString('fr-FR') : '—'}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <Users size={32} className="mx-auto mb-3 opacity-20" />
                    <p>Aucun client trouvé</p>
                    <p className="text-xs mt-1">Les clients apparaissent automatiquement via les achats de tickets et les réservations.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminClients;
