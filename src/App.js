import React, { useState, useEffect } from 'react';
import './App.css';
import User from './components/User';
import Product from './components/Product';
import Order from './components/Order';
import Cart from './components/Cart';
import CategoryDropdown from './components/CategoryDropdown';
import Login from './components/Login';
import Register from './components/Register';
import SearchBar from './components/SearchBar';
import ProductDetailsModal from './components/ProductDetailsModal';
import products from './data/products';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [order, setOrder] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  // Sample categories data
  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
    { id: 'home', name: 'Home & Kitchen' },
    { id: 'beauty', name: 'Beauty & Personal Care' }
  ];

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
    setCart({ items: newItems, total: newTotal });
  };

  const handleUpdateQuantity = (item, newQuantity) => {
    let newItems;
    if (newQuantity === 0) {
      // Remove item if quantity is 0
      newItems = cart.items.filter(i => i.name !== item.name);
    } else {
      // Update quantity
      newItems = cart.items.map(i =>
        i.name === item.name ? { ...i, quantity: newQuantity } : i
      );
    }
    const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setCart({ items: newItems, total: newTotal });
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

  // Combined filter: filter products by selected category and search query
  const filteredProductsBySearch = products.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = (product.name.toLowerCase().includes(searchLower) || (product.description && product.description.toLowerCase().includes(searchLower)));
    const matchesCategory = (selectedCategory === 'all' || product.category === selectedCategory);
    return (matchesSearch && matchesCategory);
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleRegister = (userData) => {
    // In a real app, this would make an API call to register the user
    console.log('Registering user:', userData);
    // For demo purposes, we'll just log in the user after registration
    setUser({
      name: userData.name,
      email: userData.email,
      address: '123 Main St, City, Country' // This would come from the registration form in a real app
    });
    setShowRegister(false);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowLogin(true);
  };

  // Add close handlers
  const handleCloseModals = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">🛍️ E-Commerce</div>
            <div className="header-actions">
              <button className="login-button" onClick={() => setShowRegister(false) || setShowLogin(true)}>
                Sign In
              </button>
              <button className="login-button" onClick={() => setShowRegister(true) || setShowLogin(false)} style={{ marginLeft: 12 }}>
                Sign Up
              </button>
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="main-content" style={{ paddingTop: '80px' }}>
            <div className="header-actions">
            </div>
            
            {/* Category Dropdown */}
            <CategoryDropdown 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Search Bar */}
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProductsBySearch.map(product => (
                <div key={product.id} onClick={() => { setSelectedProduct(product); setShowProductModal(true); }} style={{ cursor: 'pointer' }}>
                  <Product 
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>

            {/* Cart Dropdown */}
            {showCart && (
              <div className="cart-dropdown">
                <Cart 
                  cart={cart} 
                  onCheckout={handleCheckout}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              </div>
            )}

            {/* Order Summary */}
            {order && <Order order={order} />}
          </div>
        </main>

        {showLogin && !user && (
          <div className="modal-overlay">
            <Login 
              onLogin={handleLogin}
              onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
              onClose={handleCloseModals}
            />
          </div>
        )}
        {showRegister && !user && (
          <div className="modal-overlay">
            <Register 
              onRegister={handleRegister}
              onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
              onClose={handleCloseModals}
            />
          </div>
        )}
        {showProductModal && selectedProduct && (
          <ProductDetailsModal 
            product={selectedProduct} 
            onClose={() => { setShowProductModal(false); setSelectedProduct(null); }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      {/* Cart Icon - Always visible */}
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
        <div className="header-actions">
          <button 
            className="logout-button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <span>Logout</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
        
        {/* User Info - Only render when user exists */}
        {user && <User user={user} onLogout={handleLogout} />}
        
        {/* Category Dropdown */}
        <CategoryDropdown 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Search Bar */}
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProductsBySearch.map(product => (
            <div key={product.id} onClick={() => { setSelectedProduct(product); setShowProductModal(true); }} style={{ cursor: 'pointer' }}>
              <Product 
                product={product}
                onAddToCart={handleAddToCart}
              />
            </div>
          ))}
        </div>

        {/* Cart Dropdown - Only shown when showCart is true */}
        {showCart && (
          <div className="cart-dropdown">
            <Cart 
              cart={cart} 
              onCheckout={handleCheckout}
              onUpdateQuantity={handleUpdateQuantity}
            />
          </div>
        )}

        {/* Order Summary */}
        {order && <Order order={order} />}
      </div>
      {showProductModal && selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => { setShowProductModal(false); setSelectedProduct(null); }}
        />
      )}
    </div>
  );
}

export default App;
