import React from 'react';
import '../styles/components.css';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <div className="glass-card">
      <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>Filters</h3>

      <div className="input-group">
        <label style={{ fontWeight: '600' }}>Search</label>
        <input
          type="text"
          placeholder="Search..."
          className="input"
          value={filters.search || ''}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      <div className="input-group" style={{ marginTop: '16px' }}>
        <label style={{ fontWeight: '600' }}>Sort By</label>
        <select
          className="input"
          value={filters.sort || ''}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          style={{ appearance: 'none', backgroundImage: 'none' }}
        >
          <option value="">Default</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="price-low">Price (Low to High)</option>
          <option value="price-high">Price (High to Low)</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      <div className="input-group" style={{ marginTop: '16px' }}>
        <label style={{ fontWeight: '600' }}>Min Price</label>
        <input
          type="number"
          placeholder="Min price"
          className="input"
          value={filters.minPrice || ''}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
        />
      </div>

      <div className="input-group" style={{ marginTop: '16px' }}>
        <label style={{ fontWeight: '600' }}>Max Price</label>
        <input
          type="number"
          placeholder="Max price"
          className="input"
          value={filters.maxPrice || ''}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
