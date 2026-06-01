import React, { useState, useEffect } from 'react';

const BackgroundImage = ({ 
  src, 
  children, 
  className = '',
  overlayOpacity = 0.7,
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setHasError(true);
    
    if (priority) {
      img.fetchPriority = 'high';
    }
    
    img.src = src;
  }, [src, priority]);

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: '#050505'
      }}
    >
      {/* Background image */}
      {isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      {/* Overlay gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black"
        style={{
          opacity: overlayOpacity
        }}
      />

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundImage;
