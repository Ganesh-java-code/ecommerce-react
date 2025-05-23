import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <svg 
          className="search-icon"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchQuery && (
          <button 
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 