import React, { useState } from 'react';
import { Mail, Send, X, FileText } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import toast from 'react-hot-toast';

const AdminNewsletters = () => {
  const { newsletters, campaigns, addCampaign } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ subject: '', content: '' });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    if (newCampaign.subject && newCampaign.content) {
      addCampaign({
        subject: newCampaign.subject,
        status: 'Envoyée',
        recipients: newsletters.length
      });
      setNewCampaign({ subject: '', content: '' });
      setIsModalOpen(false);
      toast.success("Campagne envoyée avec succès !");
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Newsletters</h1>
          <p className="text-sm text-[#8A8D98]">Gérez vos abonnés et campagnes d'emailing</p>
        </div>
        <button type="button" onClick={() => setIsModalOpen(true)} className="bg-[#00E35F] hover:bg-green-400 text-black font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(0,227,95,0.2)] flex items-center gap-2">
          <Send size={18} />
          Créer une campagne
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-2xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Nouvelle Campagne Email</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#8A8D98] hover:text-white" aria-label="Fermer"><X size={20}/></button>
            </div>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label htmlFor="campaign-subject" className="block text-sm font-medium text-[#8A8D98] mb-1">Objet de l'email</label>
                <input id="campaign-subject" required type="text" value={newCampaign.subject} onChange={e => setNewCampaign({...newCampaign, subject: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" placeholder="Ex: Ne manquez pas notre soirée spéciale ce vendredi !" />
              </div>
              <div>
                <label htmlFor="campaign-content" className="block text-sm font-medium text-[#8A8D98] mb-1">Contenu du message</label>
                <textarea id="campaign-content" required rows="8" value={newCampaign.content} onChange={e => setNewCampaign({...newCampaign, content: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" placeholder="Rédigez votre message ici..."></textarea>
              </div>
              <div className="text-xs text-[#8A8D98] mb-4">
                Cet email sera envoyé à {newsletters.length} abonnés.
              </div>
              <button type="submit" className="w-full bg-[#00E35F] hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all mt-6 flex justify-center items-center gap-2">
                <Send size={18} />
                Envoyer la campagne
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#2A2D36] bg-[#111317]/50 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><Mail size={16} className="text-[#00E35F]"/> Abonnés récents</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#8A8D98]">
                <thead className="text-xs uppercase bg-[#111317]/50 text-[#8A8D98] border-b border-[#2A2D36]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Date d'inscription</th>
                    <th className="px-6 py-4 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.map(sub => (
                    <tr key={sub.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-white font-medium">
                        <div className="flex items-center gap-2">
                          {sub.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">{new Date(sub.subscribed_at).toLocaleDateString('fr-FR')}</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#00E35F]/10 text-[#00E35F] px-2 py-1 rounded-md text-xs font-bold">Actif</span>
                      </td>
                    </tr>
                  ))}
                  {newsletters.length === 0 && (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center">Aucun abonné pour le moment</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#2A2D36] bg-[#111317]/50 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2"><FileText size={16} className="text-[#00E35F]"/> Historique des campagnes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#8A8D98]">
                <thead className="text-xs uppercase bg-[#111317]/50 text-[#8A8D98] border-b border-[#2A2D36]">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Objet</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Destinataires</th>
                    <th className="px-6 py-4 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(camp => (
                    <tr key={camp.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{camp.subject}</td>
                      <td className="px-6 py-4">{new Date(camp.date).toLocaleDateString('fr-FR')}</td>
                      <td className="px-6 py-4">{camp.recipients} abonnés</td>
                      <td className="px-6 py-4">
                        <span className="bg-[#00E35F]/10 text-[#00E35F] px-2 py-1 rounded-md text-xs font-bold">{camp.status}</span>
                      </td>
                    </tr>
                  ))}
                  {campaigns.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center">Aucune campagne envoyée pour le moment</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6">
            <h3 className="font-bold text-white mb-4">Statistiques Globales</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8A8D98]">Total abonnés</span>
                  <span className="text-white font-bold">{newsletters.length}</span>
                </div>
                <div className="w-full bg-[#2A2D36] rounded-full h-1.5">
                  <div className="bg-[#00E35F] h-1.5 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8A8D98]">Taux d'ouverture (Moy.)</span>
                  <span className="text-white font-bold">{campaigns.length > 0 ? '42%' : '0%'}</span>
                </div>
                <div className="w-full bg-[#2A2D36] rounded-full h-1.5">
                  <div className="bg-[#00E35F] h-1.5 rounded-full" style={{ width: campaigns.length > 0 ? '42%' : '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#8A8D98]">Campagnes envoyées</span>
                  <span className="text-white font-bold">{campaigns.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNewsletters;
