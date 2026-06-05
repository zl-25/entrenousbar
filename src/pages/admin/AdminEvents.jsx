import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, X, Upload } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';
import toast from 'react-hot-toast';

const AdminEvents = () => {
  const { events, deleteEvent, addEvent, uploadImage } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', time: '', type: 'Soirée Clubbing', price: 'Gratuit', image: '',
    day: '', month: '', year: '', endTime: '', priceNum: 0, neonClass: 'neon-text', description: ''
  });

  // Mapping mois français vers numéro pour construire une date ISO valide
  const MONTH_MAP = {
    'JANVIER': '01', 'FÉVRIER': '02', 'MARS': '03', 'AVRIL': '04',
    'MAI': '05', 'JUIN': '06', 'JUILLET': '07', 'AOÛT': '08',
    'SEPTEMBRE': '09', 'OCTOBRE': '10', 'NOVEMBRE': '11', 'DÉCEMBRE': '12'
  };

  const filteredEvents = events?.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.type.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const url = await uploadImage(file);
      if (url) {
        setFormData({ ...formData, image: url });
      }
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Construire la date ISO à partir de jour/mois/année
    const monthNum = MONTH_MAP[formData.month] || '01';
    const isoDate = `${formData.year}-${monthNum}-${formData.day}`;
    
    // Formatter les données pour correspondre à EventDetail.jsx
    const formattedData = {
      ...formData,
      date: isoDate, // Date au format ISO parsable par new Date()
      description: formData.description.split('\n').filter(p => p.trim() !== ''),
      djs: [] // Pour faire simple on passe un tableau vide de djs
    };
    
    if (editingId) {
      await updateEvent(editingId, formattedData);
      toast.success("Événement mis à jour avec succès !");
    } else {
      await addEvent(formattedData);
      toast.success("Événement créé avec succès !");
    }
    
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ 
      title: '', time: '', type: 'Soirée Clubbing', price: 'Gratuit', image: '',
      day: '', month: '', year: '', endTime: '', priceNum: 0, neonClass: 'neon-text', description: ''
    });
  };

  const handleEditClick = (evt) => {
    setEditingId(evt.id);
    setFormData({
      title: evt.title || '',
      time: evt.time || '',
      type: evt.type || 'Soirée Clubbing',
      price: evt.price || 'Gratuit',
      image: evt.image || '',
      day: evt.day || '',
      month: evt.month || '',
      year: evt.year || '',
      endTime: evt.endTime || '',
      priceNum: evt.priceNum || 0,
      neonClass: evt.neonClass || 'neon-text',
      description: evt.description ? (Array.isArray(evt.description) ? evt.description.join('\n') : evt.description) : ''
    });
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ 
      title: '', time: '', type: 'Soirée Clubbing', price: 'Gratuit', image: '',
      day: '', month: '', year: '', endTime: '', priceNum: 0, neonClass: 'neon-text', description: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Événements</h1>
          <p className="text-sm text-[#8A8D98]">Gérez tous les événements de l'Entre Nous Bar</p>
        </div>
        <button onClick={openCreateModal} className="bg-[#00E35F] hover:bg-green-400 text-black font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(0,227,95,0.2)] flex items-center gap-2">
          <Plus size={18} />
          Créer un événement
        </button>
      </div>

      <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl overflow-hidden">
        <div className="p-4 border-b border-[#2A2D36] flex justify-between items-center bg-[#111317]/50">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-[#8A8D98]" />
            </div>
            <input 
              type="text" 
              placeholder="Rechercher un événement..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-[#2A2D36] rounded-lg bg-[#1A1D24] text-white placeholder-[#8A8D98] focus:outline-none focus:border-[#00E35F] focus:ring-1 focus:ring-[#00E35F] text-sm transition-all"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#8A8D98]">
            <thead className="text-xs uppercase bg-[#111317]/50 text-[#8A8D98] border-b border-[#2A2D36]">
              <tr>
                <th className="px-6 py-4 font-semibold">Événement</th>
                <th className="px-6 py-4 font-semibold">Date & Heure</th>
                <th className="px-6 py-4 font-semibold">Type</th>
                <th className="px-6 py-4 font-semibold">Prix</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => (
                <tr key={evt.id} className="border-b border-[#2A2D36] hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={evt.image || 'https://via.placeholder.com/150'} alt={evt.title} className="w-10 h-10 rounded-lg object-cover bg-[#111317]" />
                      <div className="font-semibold text-white">{evt.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white">{evt.date}</div>
                    <div className="text-xs">{evt.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-[#2A2D36] text-white px-2.5 py-1 rounded-md text-xs">{evt.type}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#00E35F]">
                    {evt.price}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEditClick(evt)} className="p-2 hover:bg-[#2A2D36] rounded-lg transition-colors text-white" title="Modifier">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if(window.confirm('Voulez-vous vraiment supprimer cet événement ?')) {
                            deleteEvent(evt.id);
                          }
                        }}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    Aucun événement trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Création Avancée */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]">
            <div className="p-4 border-b border-[#2A2D36] flex justify-between items-center bg-[#111317] sticky top-0 z-10">
              <h3 className="text-lg font-bold text-white">{editingId ? "Modifier l'événement" : "Créer un événement (Complet)"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8A8D98] hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Affiche de l'événement</label>
                <div className="w-full h-32 border-2 border-dashed border-[#2A2D36] rounded-xl flex flex-col items-center justify-center text-[#8A8D98] relative overflow-hidden bg-[#111317] hover:bg-[#2A2D36]/50 transition-colors cursor-pointer">
                  {formData.image ? (
                    <img src={formData.image} alt="Affiche" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  ) : (
                    <Upload size={24} className="mb-2" />
                  )}
                  <span className="relative z-10">{uploading ? 'Téléchargement...' : (formData.image ? 'Changer l\'image' : 'Cliquez pour uploader')}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" disabled={uploading} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Titre de l'événement</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Jour</label>
                  <select required value={formData.day} onChange={e => setFormData({...formData, day: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]">
                    <option value="">--</option>
                    {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')).map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Mois</label>
                  <select required value={formData.month} onChange={e => setFormData({...formData, month: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]">
                    <option value="">--</option>
                    {['JANVIER','FÉVRIER','MARS','AVRIL','MAI','JUIN','JUILLET','AOÛT','SEPTEMBRE','OCTOBRE','NOVEMBRE','DÉCEMBRE'].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Année</label>
                  <select required value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]">
                    <option value="">--</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Heure de début</label>
                  <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Heure de fin</label>
                  <input required type="time" value={formData.endTime} onChange={e => setFormData({...formData, endTime: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]">
                    <option value="Soirée Clubbing">Soirée Clubbing</option>
                    <option value="Concert Live">Concert Live</option>
                    <option value="Gala">Gala</option>
                    <option value="Brunch">Brunch</option>
                    <option value="After Work">After Work</option>
                    <option value="Festival">Festival</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Label Prix (ex: 10 000 FCFA)</label>
                  <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Valeur Prix (ex: 10000)</label>
                  <input required type="number" value={formData.priceNum} onChange={e => setFormData({...formData, priceNum: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]" />
                </div>
              </div>



              <div>
                <label className="block text-xs font-semibold text-[#8A8D98] uppercase mb-1">Description (Sautez des lignes pour les paragraphes)</label>
                <textarea required rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-[#111317] border border-[#2A2D36] rounded-lg text-white focus:outline-none focus:border-[#00E35F]"></textarea>
              </div>
              
              <div className="pt-4 border-t border-[#2A2D36] flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-white hover:bg-[#2A2D36] rounded-lg transition-colors">Annuler</button>
                <button type="submit" disabled={uploading} className="px-4 py-2 bg-[#00E35F] text-black font-bold rounded-lg hover:bg-green-400 transition-colors disabled:opacity-50">{editingId ? "Mettre à jour" : "Enregistrer"} l'événement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
