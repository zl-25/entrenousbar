import React, { useState } from 'react';
import { TrendingUp, TrendingDown, CreditCard, Search } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminPayments = () => {
  const { transactions } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const totalRevenue = transactions
    .filter(t => t.isIncome)
    .reduce((sum, t) => {
      const val = parseInt(String(t.amount).replace(/\D/g, '')) || 0;
      return sum + val;
    }, 0);

  const totalExpenses = transactions
    .filter(t => !t.isIncome)
    .reduce((sum, t) => {
      const val = parseInt(String(t.amount).replace(/\D/g, '')) || 0;
      return sum + val;
    }, 0);

  const filtered = transactions.filter(t =>
    (t.type || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.method || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Paiements</h1>
        <p className="text-sm text-[#8A8D98]">Historique des transactions et revenus</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#00E35F]/10 rounded-xl flex items-center justify-center">
            <TrendingUp size={22} className="text-[#00E35F]" />
          </div>
          <div>
            <p className="text-xs text-[#8A8D98] uppercase font-bold">Revenus</p>
            <p className="text-2xl font-bold text-white">
              {totalRevenue.toLocaleString('fr-FR')} <span className="text-sm text-[#8A8D98]">FCFA</span>
            </p>
          </div>
        </div>
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
            <TrendingDown size={22} className="text-red-400" />
          </div>
          <div>
            <p className="text-xs text-[#8A8D98] uppercase font-bold">Dépenses</p>
            <p className="text-2xl font-bold text-white">
              {totalExpenses.toLocaleString('fr-FR')} <span className="text-sm text-[#8A8D98]">FCFA</span>
            </p>
          </div>
        </div>
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <CreditCard size={22} className="text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-[#8A8D98] uppercase font-bold">Transactions</p>
            <p className="text-2xl font-bold text-white">{transactions.length}</p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2D36] bg-[#111317]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A8D98]" />
            </div>
            <input
              type="text"
              aria-label="Rechercher une transaction"
              placeholder="Rechercher une transaction..."
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
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Méthode</th>
                <th className="px-6 py-4 font-semibold">Heure</th>
                <th className="px-6 py-4 font-semibold text-right">Montant</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(t => (
                <tr key={t.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${t.isIncome ? 'bg-[#00E35F]' : 'bg-red-400'}`}></span>
                      <span className="text-white font-medium">{t.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{t.method}</td>
                  <td className="px-6 py-4">{t.time}</td>
                  <td className={`px-6 py-4 text-right font-bold ${t.isIncome ? 'text-[#00E35F]' : 'text-red-400'}`}>
                    {t.isIncome ? '+' : '-'}{t.amount}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <CreditCard size={32} className="mx-auto mb-3 opacity-20" />
                    <p>Aucune transaction pour le moment</p>
                    <p className="text-xs mt-1">Les transactions apparaissent après les achats de tickets.</p>
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

export default AdminPayments;
