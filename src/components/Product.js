import React, { useState } from 'react';

const Product = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  // Pick first image from images array or fallback
  const defaultImage = product.images && product.images.length > 0
    ? product.images[0]
    : null;

  return (
    <div className="product">
      <div className="product-image-container">
        {!imageError && defaultImage ? (
          <img
            src={defaultImage}
            alt={product.name}
            className="product-image"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder">
            <span className="product-image-icon">🛍️</span>
          </div>
        )}
      </div>

      <div className="product-content">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-price-tag">
          ${product.price.toFixed(2)}
        </div>
        <button 
          className="product-add-btn"
          onClick={() => onAddToCart(product)}
        >
          <span className="product-add-icon">🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
