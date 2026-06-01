import React, { useState } from 'react';

/**
 * Composant d'image optimisée avec:
 * - Lazy loading
 * - Srcset responsive  
 * - Placeholder pendant le chargement
 * - Gestion des erreurs
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  srcSet,
  sizes,
  priority = false,
  objectFit = 'cover',
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(true); // Start as loaded to show image immediately
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    console.error('Image load error:', src);
    onError?.(e);
  };

  if (hasError) {
    return (
      <div className={`w-full h-full bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-600">Image non disponible</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-full h-full ${className}`}
      style={{ objectFit }}
      onLoad={handleLoad}
      onError={handleError}
      crossOrigin="anonymous"
    />
  );
};

export default OptimizedImage;
