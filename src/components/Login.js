import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const userData = {
        email: formData.email,
        name: 'User',
        token: 'mock-jwt-token'
      };
      onLogin(userData);
    } catch {
      setErrors({ submit: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-modal-overlay">
      <div className="register-modal-card">
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="register-modal-close"
        >
          ×
        </button>
        <div className="register-modal-header">
          <div className="register-modal-logo">🛍️</div>
          <h2>Sign In</h2>
          <p>Welcome back! Please sign in to your account.</p>
        </div>
        <form onSubmit={handleSubmit} className="register-modal-form">
          {errors.submit && <div className="register-modal-error">{errors.submit}</div>}
          <div className="register-modal-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              placeholder="example@mail.com"
            />
            {errors.email && <div className="register-modal-error">{errors.email}</div>}
          </div>
          <div className="register-modal-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              placeholder="********"
            />
            {errors.password && <div className="register-modal-error">{errors.password}</div>}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="register-modal-submit"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="register-modal-footer">
          <span>Don't have an account?</span>{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="register-modal-link"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 