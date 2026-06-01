import React, { useState } from 'react';
import './Gallery.css';
import Lightbox from '../components/common/Lightbox';
import OptimizedImage from '../components/common/OptimizedImage';

const GALLERY_IMAGES = [
  '1000397653.jpg', '1000397654.jpg', '1000397655.jpg', '1000397656.jpg', '1000397657.jpg',
  '1000397658.jpg', '1000397659.jpg', '1000397664.jpg', '1000397665.jpg', '1000397666.jpg',
  '1000397667.jpg', '1000397668.jpg', '1000397669.jpg', '1000397670.jpg', '1000397671.jpg',
  '1000397672.jpg', '1000397673.jpg', '1000397674.jpg', '1000397675.jpg', '1000397676.jpg',
  '1000397677.jpg', '1000397678.jpg', '1000397679.jpg', '1000397680.jpg', '1000397681.jpg',
  '1000397682.jpg', '1000397684.jpg', '1000397685.jpg', '1000397686.jpg'
].map((filename, i) => ({
  id: i,
  url: `/${filename}`
}));

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-page section-padding pt-28 sm:pt-32 pb-20">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-green-500 uppercase mb-4">L'ambiance Entre Nous</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold clash tracking-tight text-white mb-4">
            NOTRE GALERIE
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Revivez en images les meilleurs moments passés sous les étoiles de l'Entre Nous Bar.
          </p>
        </div>

        <div className="masonry-grid">
          {GALLERY_IMAGES.map((img, idx) => (
            <div 
              key={img.id} 
              className="masonry-item"
              onClick={() => setActiveIndex(idx)}
            >
              <OptimizedImage
                src={img.url}
                alt={`Gallery ${img.id}`}
                className="masonry-img cursor-pointer"
                objectFit="cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="masonry-overlay">
                <span className="zoom-icon">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox 
        images={GALLERY_IMAGES}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default Gallery;
