import React, { useState } from 'react';
import './App.css';
import User from './components/User';
import Product from './components/Product';
import Order from './components/Order';
import Cart from './components/Cart';
import CategoryDropdown from './components/CategoryDropdown';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [order, setOrder] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample categories data
  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'beauty', name: 'Beauty & Personal Care' }
  ];

  // Sample products data with categories
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      category: 'electronics'
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 299.99,
      category: 'electronics'
    },
    {
      id: 3,
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt for everyday wear',
      price: 24.99,
      category: 'clothing'
    },
    {
      id: 4,
      name: 'Novel Collection',
      description: 'Bestselling novels box set',
      price: 49.99,
      category: 'books'
    }
  ];

  const user = { name: 'John Doe', email: 'john@example.com', address: '123 Main St' };

  const handleAddToCart = (product) => {
    const existing = cart.items.find(item => item.name === product.name);
    let newItems;
    if (existing) {
      newItems = cart.items.map(item =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newItems = [...cart.items, { ...product, quantity: 1 }];
    }
    const newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setCart({ items: newItems, total: newTotal.toFixed(2) });
    setShowCart(true);
  };

  const handleCheckout = () => {
    setOrder({
      id: Math.floor(Math.random() * 10000),
      date: new Date().toLocaleDateString(),
      items: cart.items,
      total: cart.total,
    });
    setCart({ items: [], total: 0 });
    setShowCart(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="App">
      {/* Cart Icon */}
      <button 
        className="cart-icon-container" 
        onClick={toggleCart} 
        aria-label="Shopping Cart"
      >
        <svg 
          className="cart-icon"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        {cart.items.length > 0 && (
          <span className="cart-count">{cart.items.length}</span>
        )}
      </button>

      <div className="main-content" style={{ paddingTop: '80px' }}>
        <h1>E-commerce Demo</h1>
        
        {/* User Info */}
        <User user={user} />
        
        {/* Category Dropdown */}
        <CategoryDropdown 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map(product => (
            <Product 
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Cart Dropdown */}
        {showCart && (
          <div className="cart-dropdown">
            <Cart cart={cart} onCheckout={handleCheckout} />
          </div>
        )}

        {/* Order Summary */}
        {order && <Order order={order} />}
      </div>
    </div>
  );
}

export default App; 