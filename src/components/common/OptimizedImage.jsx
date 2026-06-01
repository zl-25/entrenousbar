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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: width && height ? width / height : 'auto' }}>
      {/* Placeholder shimmer durant le chargement */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
      )}

      {/* Image principale */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          srcSet={srcSet}
          sizes={sizes}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          className={`w-full h-full object-contain ${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Fallback en cas d'erreur */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <iconify-icon
            icon="lucide:image-off"
            className="text-4xl text-gray-600"
          ></iconify-icon>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
