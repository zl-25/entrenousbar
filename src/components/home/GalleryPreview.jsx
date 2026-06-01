import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';
import OptimizedImage from '../common/OptimizedImage';

const GalleryPreview = () => {
  const images = [
    '/1000397653.jpg',
    '/1000397654.jpg',
    '/1000397655.jpg',
    '/1000397656.jpg',
    '/1000397657.jpg'
  ];

  return (
    <section className="py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Galerie</h2>
            <Link to="/gallery" className="text-xs font-bold tracking-widest text-gray-400 hover:text-white flex items-center gap-2">
              VOIR TOUTE LA GALERIE <iconify-icon icon="lucide:arrow-right"></iconify-icon>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <div className="aspect-square rounded-xl overflow-hidden">
                <OptimizedImage
                  src={img}
                  alt={`Gallery preview ${index + 1}`}
                  className="w-full h-full hover:scale-110 transition-transform duration-700"
                  objectFit="cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
