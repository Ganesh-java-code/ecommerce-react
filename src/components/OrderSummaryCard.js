// import React from 'react';

// const OrderSummaryCard = ({ orderDetails, onClose }) => {
//   if (!orderDetails) return null;

//   return (
//     <div className="order-summary-card">
//       <div className="order-summary-card-header">
//         <div className="order-summary-card-title">
//           <h2>Order Summary details</h2>
//         </div>
//         <button 
//           className="order-summary-card-close"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           ×
//         </button>
//       </div>

//       <div className="order-summary-card-content">
//         <div className="order-summary-simple">
//           <div className="order-id-section">
//             <span className="order-id-label">Order ID:</span>
//             <span className="order-id-value">{orderDetails.orderNumber}</span>
//           </div>

//           <div className="order-date-section">
//             <span className="order-date-label">Date:</span>
//             <span className="order-date-value">
//               {orderDetails.orderDate.toLocaleDateString('en-US', {
//                 month: 'numeric',
//                 day: 'numeric',
//                 year: 'numeric'
//               })}
//             </span>
//           </div>

//           <div className="order-items-simple">
//             {orderDetails.items.map((item, idx) => (
//               <div key={idx} className="order-item-simple">
//                 <span className="item-name-simple">{item.name}</span>
//                 <span className="item-quantity-simple">x {item.quantity}</span>
//               </div>
//             ))}
//           </div>

//           <div className="order-total-simple">
//             <span className="total-label">Total:</span>
//             <span className="total-value">${orderDetails.total}</span>
//           </div>

//           <div className="order-summary-actions-simple">
//             <button 
//               className="action-btn-simple primary"
//               onClick={onClose}
//             >
//               Close
//             </button>
//             <button 
//               className="action-btn-simple secondary"
//               onClick={() => window.print()}
//             >
//               Print
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryCard; 