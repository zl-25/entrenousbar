import React from 'react';

const GalleryPreview = () => {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Galerie</h2>
          <a href="/gallery" className="text-xs font-bold tracking-widest text-gray-400 hover:text-white flex items-center gap-2">
            VOIR TOUTE LA GALERIE <iconify-icon icon="lucide:arrow-right"></iconify-icon>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="aspect-square rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400" alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
