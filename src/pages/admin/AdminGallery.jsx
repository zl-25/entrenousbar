import React, { useState } from 'react';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const AdminGallery = () => {
  const { gallery, addGalleryImage, deleteGalleryImage, uploadImage } = useAdmin();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const url = await uploadImage(file);
      if (url) {
        await addGalleryImage(url);
      }
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Galerie Photos</h1>
          <p className="text-sm text-[#8A8D98]">Gérez les photos affichées sur le site public</p>
        </div>
        <div className="relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            disabled={uploading}
          />
          <button className="bg-[#00E35F] hover:bg-green-400 text-black font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_15px_rgba(0,227,95,0.2)] flex items-center gap-2">
            <Upload size={18} />
            {uploading ? 'Téléchargement...' : 'Ajouter une photo'}
          </button>
        </div>
      </div>

      <div className="bg-[#1A1D24] border border-[#2A2D36] rounded-xl p-6">
        {gallery.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-[#2A2D36] rounded-full flex items-center justify-center mb-4 text-[#8A8D98]">
              <ImageIcon size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Aucune photo</h2>
            <p className="text-[#8A8D98] max-w-md">
              Ajoutez des photos pour enrichir la galerie de votre site.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map(img => (
              <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-[#111317]">
                <img src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={() => {
                      if(window.confirm('Voulez-vous vraiment supprimer cette photo ?')) {
                        deleteGalleryImage(img.id);
                      }
                    }}
                    className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminGallery;
