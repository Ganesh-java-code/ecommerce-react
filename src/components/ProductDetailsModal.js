import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ProductDetailsModal = ({ product, onClose, onAddToCart, onBuyNow }) => {
  if (!product) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const stock = product.stock || 12;
  const rating = product.rating || 4.3;
  const delivery = product.delivery || '3–5 days';
  const emi = `EMI from $${(product.price / 6).toFixed(2)}/mo`;

  return (
    <div className="register-modal-overlay" style={{ padding: 0 }}>
      <div
        className="register-modal-card"
        style={{
          maxWidth: 360,
          padding: 16,
          borderRadius: 12,
          boxShadow: '0 0 10px #00000020',
        }}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="register-modal-close"
          style={{ top: 10, right: 10, fontSize: 20 }}
        >
          ×
        </button>

        <Slider {...settings}>
          {product.images?.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`${product.name} ${i + 1}`}
                style={{
                  width: '100%',
                  height: 180,
                  objectFit: 'cover',
                  borderRadius: 10,
                }}
              />
            </div>
          ))}
        </Slider>

        <h3 style={{ fontSize: 18, margin: '12px 0 4px' }}>{product.name}</h3>
        <div style={{ color: '#4f46e5', fontWeight: 700, fontSize: 16 }}>
          ${product.price.toFixed(2)}
        </div>
        <div style={{ fontSize: 12, color: '#22c55e', margin: '4px 0' }}>
          ⭐ {rating} · {stock} left · {delivery}
        </div>
        <div style={{ fontSize: 12, color: '#dc2626', marginBottom: 10 }}>{emi}</div>

        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
          {product.shortDescription || product.description?.slice(0, 100) + '...'}
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: '#4f46e5',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            🛒 Add
          </button>
          <button
            onClick={() => onBuyNow(product)}
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: '#0f172a',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            ⚡ Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
