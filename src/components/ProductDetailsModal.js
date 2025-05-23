import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true
  };

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-card" style={{ maxWidth: 500 }}>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="register-modal-close"
        >
          ×
        </button>
        <div className="register-modal-header">
          <h2>{product.name}</h2>
          <p style={{ color: '#64748b', fontWeight: 500 }}>{product.description}</p>
        </div>
        <div style={{ marginBottom: 24 }}>
          <Slider {...settings}>
            {product.images && product.images.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={product.name + ' ' + (idx + 1)}
                  style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 12px #818cf855' }}
                />
              </div>
            ))}
          </Slider>
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#4f46e5', marginBottom: 16 }}>
          ${product.price.toFixed(2)}
        </div>
        <button
          className="register-modal-submit"
          style={{ marginTop: 0 }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductDetailsModal; 