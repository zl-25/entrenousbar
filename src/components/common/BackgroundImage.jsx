import React, { useState, useEffect } from 'react';

const BackgroundImage = ({ 
  src, 
  children, 
  className = '',
  overlayOpacity = 0.7,
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    // Précharge l'image en arrière-plan
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setIsLoaded(true); // Continue même en erreur
    
    if (priority) {
      img.loading = 'eager';
    } else {
      img.loading = 'lazy';
    }
    
    img.src = src;
  }, [src, priority]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#050505',
        backgroundImage: isLoaded ? `url('${src}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black pointer-events-none"
        style={{
          opacity: overlayOpacity
        }}
      />

      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-pulse" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;
