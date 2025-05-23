import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://via.placeholder.com/300x200?text=No+Image'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000);

    // Clean up interval on unmount or if images array changes
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="product-card" style={{ width: '300px' }}>
      <img
        src={images[currentImageIndex]}
        alt={`${product.name} image ${currentImageIndex + 1}`}
        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
      />
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
