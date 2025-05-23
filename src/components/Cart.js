import React, { useState } from 'react';
import OrderSummaryCard from './OrderSummaryCard';

const Cart = ({ cart, onCheckout, onUpdateQuantity }) => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (itemId) => {
    setImageErrors(prev => ({ ...prev, [itemId]: true }));
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item, newQuantity);
    } else if (newQuantity === 0) {
      onUpdateQuantity(item, 0); // This will remove the item
    }
  };

  const handleCheckoutClick = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const orderDate = new Date();
    
    setOrderDetails({
      orderNumber,
      orderDate,
      items: cart.items,
      total: Number(cart.total).toFixed(2)
    });
    
    setShowOrderSummary(true);
    setIsProcessing(false);
    onCheckout();
  };

  return (
    <div className="cart-container">
      <div className="cart small">
        <h2>Cart ({cart.items.length})</h2>
        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item, idx) => (
                <div key={idx} className="cart-item">
                  {!imageErrors[item.id] ? (
                    <img
                      src={item.image || `/images/products/${item.id}.jpg`}
                      alt={item.name}
                      className="cart-item-image"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="cart-item-image-placeholder">
                      <span className="cart-item-image-icon">🛍️</span>
                    </div>
                  )}
                  <div className="cart-item-details">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                  </div>
                  <div className="cart-item-quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span className="cart-total-amount">${Number(cart.total).toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={handleCheckoutClick}
              disabled={cart.items.length === 0 || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Checkout'}
            </button>
          </>
        )}
      </div>

      {showOrderSummary && orderDetails && (
        <div className="order-summary-wrapper">
          <OrderSummaryCard 
            orderDetails={orderDetails}
            onClose={() => {
              setShowOrderSummary(false);
              setOrderDetails(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Cart; 