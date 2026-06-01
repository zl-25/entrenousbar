import React, { useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

const Lightbox = ({ images, activeIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex, onClose, onPrev, onNext]);

  if (activeIndex === null) return null;

  const currentImage = images[activeIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors duration-200 p-2 z-50 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer"
        aria-label="Fermer la galerie"
      >
        <iconify-icon icon="lucide:x" style={{ fontSize: '24px', display: 'block' }}></iconify-icon>
      </button>

      {/* Navigation - Prev */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 p-3 z-50 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer"
        aria-label="Image précédente"
      >
        <iconify-icon icon="lucide:chevron-left" style={{ fontSize: '28px', display: 'block' }}></iconify-icon>
      </button>

      {/* Main Content Area */}
      <div 
        className="relative max-w-5xl max-h-[85vh] px-4 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-full max-h-[80vh]">
          <OptimizedImage
            src={currentImage.url}
            alt={`Photo de la galerie ${currentImage.id + 1}`}
            className="rounded-xl border border-white/10 shadow-[0_0_50px_rgba(21,128,61,0.15)] animate-fade-in max-w-full max-h-[80vh]"
            objectFit="contain"
            priority={true}
          />
        </div>
        
        {/* Caption/Counter */}
        <div className="mt-4 text-center">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            Image {activeIndex + 1} sur {images.length}
          </p>
        </div>
      </div>

      {/* Navigation - Next */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors duration-200 p-3 z-50 bg-white/5 hover:bg-white/10 rounded-full cursor-pointer"
        aria-label="Image suivante"
      >
        <iconify-icon icon="lucide:chevron-right" style={{ fontSize: '28px', display: 'block' }}></iconify-icon>
      </button>
    </div>
  );
};

export default Lightbox;
