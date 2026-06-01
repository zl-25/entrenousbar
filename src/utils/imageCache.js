/**
 * Cache helper pour localStorage permettant de mémoriser les images
 * et réduire les requêtes réseau
 */

const CACHE_VERSION = 'img-cache-v1';
const CACHE_EXPIRY_HOURS = 24;

export const cacheImage = (url, dataUrl) => {
  try {
    const timestamp = Date.now();
    localStorage.setItem(
      `${CACHE_VERSION}:${url}`,
      JSON.stringify({ dataUrl, timestamp })
    );
  } catch (err) {
    // Silently fail if localStorage is full or disabled
    console.debug('Image cache failed:', err);
  }
};

export const getCachedImage = (url) => {
  try {
    const cached = localStorage.getItem(`${CACHE_VERSION}:${url}`);
    if (!cached) return null;

    const { dataUrl, timestamp } = JSON.parse(cached);
    const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);

    if (ageHours > CACHE_EXPIRY_HOURS) {
      localStorage.removeItem(`${CACHE_VERSION}:${url}`);
      return null;
    }

    return dataUrl;
  } catch (err) {
    console.debug('Image cache retrieval failed:', err);
    return null;
  }
};

export const clearImageCache = () => {
  try {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_VERSION)) {
        localStorage.removeItem(key);
      }
    });
  } catch (err) {
    console.debug('Image cache clear failed:', err);
  }
};
