import React from 'react';
import './Gallery.css';

const MOCK_IMAGES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  url: `https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=600&auto=format&fit=crop&random=${i}`
}));

const Gallery = () => {
  return (
    <div className="gallery-page section-padding">
      <div className="container">
        <div className="text-center mb-2xl">
          <h1 className="page-title">NOTRE GALERIE</h1>
          <p className="page-subtitle text-secondary">
            Revivez les meilleurs moments passés à Entre Nous Bar.
          </p>
        </div>

        <div className="masonry-grid">
          {MOCK_IMAGES.map((img) => (
            <div key={img.id} className="masonry-item">
              <img src={img.url} alt={`Gallery ${img.id}`} className="masonry-img" />
              <div className="masonry-overlay">
                <span className="zoom-icon">+</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
