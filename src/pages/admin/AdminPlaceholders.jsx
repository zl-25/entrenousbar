import React, { useState } from 'react';
import { Settings, Users, BarChart3, Save, Plus, Download, Shield, Mail, X, Edit2, Trash2 } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import toast from 'react-hot-toast';

export const AdminUsers = () => {
  const { users, addUser, updateUser, deleteUser } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'editor', accessCode: '' });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.accessCode) {
      addUser(newUser);
      setNewUser({ name: '', email: '', role: 'editor', accessCode: '' });
      setIsModalOpen(false);
      toast.success("Membre ajouté avec succès");
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (editingUser.name && editingUser.email && editingUser.accessCode) {
      updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      toast.success("Membre mis à jour avec succès");
    } else {
      toast.error("Veuillez remplir tous les champs");
    }
  };

  const handleDeleteUser = (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${name} ?`)) {
      deleteUser(id);
      toast.success("Membre supprimé avec succès");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Utilisateurs Admin</h1>
          <p className="text-sm text-[#8A8D98]">Gestion des accès et permissions du panel</p>
        </div>
        <button type="button" onClick={() => setIsModalOpen(true)} className="bg-[#00E35F] hover:bg-green-400 text-black font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2">
          <Plus size={18} />
          Ajouter un membre
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Ajouter un membre</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-[#8A8D98] hover:text-white" aria-label="Fermer"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label htmlFor="new-user-name" className="block text-sm font-medium text-[#8A8D98] mb-1">Nom complet</label>
                <input id="new-user-name" required type="text" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label htmlFor="new-user-email" className="block text-sm font-medium text-[#8A8D98] mb-1">Adresse Email</label>
                <input id="new-user-email" required type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label htmlFor="new-user-access-code" className="block text-sm font-medium text-[#8A8D98] mb-1">Code d'accès (Mot de passe)</label>
                <input id="new-user-access-code" required type="text" value={newUser.accessCode} onChange={e => setNewUser({...newUser, accessCode: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label htmlFor="new-user-role" className="block text-sm font-medium text-[#8A8D98] mb-1">Rôle</label>
                <select id="new-user-role" value={newUser.role} onChange={e => setNewUser({...newUser, role: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]">
                  <option value="admin">Super Admin</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Éditeur</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#00E35F] hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all mt-6">Créer l'accès</button>
            </form>
          </div>
        </div>
      )}

      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Modifier le membre</h3>
              <button type="button" onClick={() => setEditingUser(null)} className="text-[#8A8D98] hover:text-white" aria-label="Fermer"><X size={20}/></button>
            </div>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div>
                <label htmlFor="edit-user-name" className="block text-sm font-medium text-[#8A8D98] mb-1">Nom complet</label>
                <input id="edit-user-name" required type="text" value={editingUser.name} onChange={e => setEditingUser({...editingUser, name: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label htmlFor="edit-user-email" className="block text-sm font-medium text-[#8A8D98] mb-1">Adresse Email</label>
                <input id="edit-user-email" required type="email" value={editingUser.email} onChange={e => setEditingUser({...editingUser, email: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label htmlFor="edit-user-access-code" className="block text-sm font-medium text-[#8A8D98] mb-1">Code d'accès (Mot de passe)</label>
                <input id="edit-user-access-code" required type="text" value={editingUser.accessCode || ''} onChange={e => setEditingUser({...editingUser, accessCode: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]" />
              </div>
              <div>
                <label htmlFor="edit-user-role" className="block text-sm font-medium text-[#8A8D98] mb-1">Rôle</label>
                <select id="edit-user-role" value={editingUser.role} onChange={e => setEditingUser({...editingUser, role: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00E35F]">
                  <option value="admin">Super Admin</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Éditeur</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-[#00E35F] hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all mt-6">Enregistrer les modifications</button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8A8D98]">
            <thead className="text-xs uppercase bg-[#111317]/50 text-[#8A8D98] border-b border-[#2A2D36]">
              <tr>
                <th className="px-6 py-4 font-semibold">Utilisateur</th>
                <th className="px-6 py-4 font-semibold">Rôle</th>
                <th className="px-6 py-4 font-semibold">Dernière connexion</th>
                <th className="px-6 py-4 font-semibold">Statut</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#00E35F]/20 text-[#00E35F] flex items-center justify-center font-bold">{user.initials}</div>
                      <div>
                        <div className="font-semibold text-white">{user.name}</div>
                        <div className="text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1">
                      <Shield size={14} className={
                        user.role === 'admin' ? "text-[#00E35F]" :
                        user.role === 'manager' ? "text-blue-400" :
                        "text-orange-400"
                      }/> 
                      {user.role === 'admin' ? 'Super Admin' : user.role === 'manager' ? 'Manager' : 'Éditeur'}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.lastLogin}</td>
                  <td className="px-6 py-4"><span className="bg-[#00E35F]/10 text-[#00E35F] px-2 py-1 rounded text-xs font-bold">{user.status}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setEditingUser(user)} className="p-2 text-[#8A8D98] hover:text-[#00E35F] hover:bg-[#00E35F]/10 rounded-lg transition-all" title="Modifier">
                        <Edit2 size={16} />
                      </button>
                      <button type="button" onClick={() => handleDeleteUser(user.id, user.name)} className="p-2 text-[#8A8D98] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Supprimer">
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export const AdminSettings = () => {
  const { siteSettings, updateSiteSettings } = useAdmin();
  const [formData, setFormData] = useState({ ...siteSettings });

  // Keep formData in sync when siteSettings changes (e.g. loaded from localStorage)
  React.useEffect(() => {
    setFormData({ ...siteSettings });
  }, [siteSettings]);

  const handleSave = () => {
    updateSiteSettings(formData);
    toast.success("Paramètres sauvegardés ! Le site public a été mis à jour.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Paramètres</h1>
          <p className="text-sm text-[#8A8D98]">Configuration générale du site</p>
        </div>
        <button type="button" onClick={handleSave} className="bg-[#00E35F] hover:bg-green-400 text-black font-bold py-2.5 px-4 rounded-xl transition-all flex items-center gap-2">
          <Save size={18} />
          Enregistrer
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Settings size={18} className="text-[#00E35F]"/> Informations Générales</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="settings-name" className="block text-xs font-semibold text-[#8A8D98] mb-1">Nom de l'établissement</label>
              <input id="settings-name" type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label htmlFor="settings-email" className="block text-xs font-semibold text-[#8A8D98] mb-1">Email de contact</label>
              <input id="settings-email" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label htmlFor="settings-phone" className="block text-xs font-semibold text-[#8A8D98] mb-1">Téléphone</label>
              <input id="settings-phone" type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-3 py-2 text-white" />
            </div>
          </div>
        </div>
        
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Réseaux Sociaux & Horaires</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="settings-instagram" className="block text-xs font-semibold text-[#8A8D98] mb-1">Lien Instagram</label>
              <input id="settings-instagram" type="text" value={formData.instagram} onChange={e => setFormData({...formData, instagram: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label htmlFor="settings-facebook" className="block text-xs font-semibold text-[#8A8D98] mb-1">Lien Facebook</label>
              <input id="settings-facebook" type="text" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-3 py-2 text-white" />
            </div>
            <div>
              <label htmlFor="settings-hours" className="block text-xs font-semibold text-[#8A8D98] mb-1">Horaires (Pied de page)</label>
              <textarea id="settings-hours" rows="2" value={formData.hours} onChange={e => setFormData({...formData, hours: e.target.value})} className="w-full bg-[#111317] border border-[#2A2D36] rounded-lg px-3 py-2 text-white"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminReports = () => {
  const { transactions, reservations, newsletters, tickets } = useAdmin();

  const downloadCSV = (filename, data, headers) => {
    // Utiliser le point-virgule comme séparateur pour Excel en français
    let csvContent = "data:text/csv;charset=utf-8," + headers.join(";") + "\n";
    data.forEach(row => {
      csvContent += row.join(";") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportTransactions = () => {
    const headers = ["ID", "Montant", "Date", "Client", "Produit", "Statut"];
    const data = transactions.map(t => [
      t.id,
      `"${t.amount || ''}"`,
      `"${t.date || ''}"`,
      `"${t.client || ''}"`,
      `"${t.type || ''}"`,
      `"${t.status || ''}"`
    ]);
    downloadCSV("bilan_financier.csv", data, headers);
  };

  const exportClients = () => {
    const headers = ["Source", "Nom", "Email", "Telephone", "Date"];
    const allClients = [
      ...reservations.map(r => ['"Réservation"', `"${r.name || ''}"`, `"${r.email || ''}"`, `"${r.phone || ''}"`, `"${r.created_at || r.date || ''}"`]),
      ...(tickets || []).map(t => [`"Ticket: ${t.ticket_name || t.ticket_type || 'Standard'}"`, `"${t.buyer_name || ''}"`, `"${t.buyer_email || ''}"`, `"${t.buyer_phone || ''}"`, `"${t.created_at || ''}"`])
    ];
    downloadCSV("clients_global.csv", allClients, headers);
  };

  const exportNewsletters = () => {
    const headers = ["ID", "Email", "Date d'inscription"];
    const data = newsletters.map(n => [n.id, `"${n.email || ''}"`, `"${n.created_at || n.subscribed_at || ''}"`]);
    downloadCSV("abonnes_newsletter.csv", data, headers);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Rapports & Exports</h1>
          <p className="text-sm text-[#8A8D98]">Analysez vos performances et exportez vos données</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6 hover:border-[#00E35F]/50 transition-colors flex flex-col">
          <div className="w-12 h-12 bg-[#00E35F]/10 text-[#00E35F] rounded-lg flex items-center justify-center mb-4">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Bilan Financier Mensuel</h3>
          <p className="text-sm text-[#8A8D98] mb-4 flex-grow">Exportez le résumé de toutes vos transactions du mois en cours au format CSV.</p>
          <button type="button" onClick={exportTransactions} className="w-full bg-[#2A2D36] hover:bg-[#00E35F]/20 hover:text-[#00E35F] text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Download size={16} /> Télécharger
          </button>
        </div>

        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6 hover:border-orange-500/50 transition-colors flex flex-col">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-400 rounded-lg flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Base de données Clients</h3>
          <p className="text-sm text-[#8A8D98] mb-4 flex-grow">Exportez la liste de tous vos clients (depuis les réservations) avec contacts.</p>
          <button type="button" onClick={exportClients} className="w-full bg-[#2A2D36] hover:bg-orange-500/20 hover:text-orange-400 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Download size={16} /> Télécharger
          </button>
        </div>

        <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6 hover:border-purple-500/50 transition-colors flex flex-col">
          <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center mb-4">
            <Mail size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Emails Newsletters</h3>
          <p className="text-sm text-[#8A8D98] mb-4 flex-grow">Générez un fichier CSV contenant tous vos abonnés.</p>
          <button type="button" onClick={exportNewsletters} className="w-full bg-[#2A2D36] hover:bg-purple-500/20 hover:text-purple-400 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Download size={16} /> Télécharger
          </button>
        </div>
      </div>
    </div>
  );
};
