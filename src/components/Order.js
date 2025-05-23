import React from 'react';

const Order = ({ order }) => (
  <div className="order-summary-card small">
    <div className="order-summary-card-header">
      <div className="order-summary-card-title">
        <h2>Order #{order.id}</h2>
      </div>
    </div>

    <div className="order-summary-card-content">
      <div className="order-summary-simple">
        <div className="order-date-section">
          <span className="order-date-label">Date:</span>
          <span className="order-date-value">
            {new Date(order.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>

        <div className="order-items-simple">
          {order.items.map((item, idx) => (
            <div key={idx} className="order-item-simple">
              <span className="item-name-simple">{item.name}</span>
              <span className="item-quantity-simple">x {item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="order-total-simple">
          <span className="total-label">Total:</span>
          <span className="total-value">${Number(order.total).toFixed(2)}</span>
        </div>

        <div className="order-summary-actions-simple">
          <button 
            className="action-btn-simple secondary"
            onClick={() => window.print()}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Order; 