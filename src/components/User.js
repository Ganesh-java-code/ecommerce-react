import React, { useState } from 'react';

const User = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);

  // If no user is provided, don't render anything
  if (!user) {
    return null;
  }

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="user-profile-container">
      {/* Profile Button */}
      <button 
        className="profile-button"
        onClick={() => setShowDetails(!showDetails)}
        aria-label="Toggle Profile Details"
      >
        <div className="profile-button-content">
          <div className="user-avatar-small">
            {getInitials(user.name)}
          </div>
          <span className="profile-button-text">Profile</span>
          <span className={`profile-arrow ${showDetails ? 'up' : 'down'}`}>▼</span>
        </div>
      </button>

      {/* Profile Details Card */}
      {showDetails && (
        <div className="user-card">
          <div className="user-card-header">
            <div className="user-avatar">
              {getInitials(user.name)}
            </div>
            <h2 className="user-card-title">User Profile</h2>
          </div>

          <div className="user-info-section">
            <div className="user-info-item">
              <span className="user-info-label">Name</span>
              <span className="user-info-value">{user.name || 'Not provided'}</span>
            </div>

            <div className="user-info-item">
              <span className="user-info-label">Email</span>
              <span className="user-info-value">{user.email || 'Not provided'}</span>
            </div>

            <div className="user-info-item">
              <span className="user-info-label">Address</span>
              <span className="user-info-value">{user.address || 'Not provided'}</span>
            </div>
          </div>

          <div className="user-actions">
            <button className="user-action-btn primary">
              <span className="user-action-icon">✏️</span>
              Edit Profile
            </button>
            <button className="user-action-btn secondary">
              <span className="user-action-icon">🔑</span>
              Change Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User; 