import React from 'react';
import './Gallery.css';

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
          {GALLERY_IMAGES.map((img) => (
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
