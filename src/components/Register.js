import React, { useState } from 'react';

const Register = ({ onRegister, onSwitchToLogin, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
        name: formData.name,
        email: formData.email,
        token: 'mock-jwt-token'
      };
      onRegister(userData);
    } catch {
      setErrors({ submit: 'Registration failed. Please try again.' });
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
          <div className="register-modal-logo">��️</div>
          <h2>Create Account</h2>
          <p>Join our e-commerce community</p>
        </div>
        <form onSubmit={handleSubmit} className="register-modal-form">
          {errors.submit && (
            <div className="register-modal-error">{errors.submit}</div>
          )}
          <div className="register-modal-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              disabled={isLoading}
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="John Doe"
            />
            {errors.name && <div className="register-modal-error">{errors.name}</div>}
          </div>
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
          <div className="register-modal-row">
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
            <div className="register-modal-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                disabled={isLoading}
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="********"
              />
              {errors.confirmPassword && <div className="register-modal-error">{errors.confirmPassword}</div>}
            </div>
          </div>
          <div className="register-modal-checkbox">
            <input
              type="checkbox"
              name="agreeToTerms"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label htmlFor="agreeToTerms">
              I agree to the{' '}
              <button
                type="button"
                className="register-modal-link"
                onClick={() => window.open('/terms', '_blank')}
              >
                Terms and Conditions
              </button>
            </label>
          </div>
          {errors.agreeToTerms && <div className="register-modal-error">{errors.agreeToTerms}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="register-modal-submit"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <div className="register-modal-footer">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="register-modal-link"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
