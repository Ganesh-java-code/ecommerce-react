import React from 'react';

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-dropdown">
      <select 
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown; 