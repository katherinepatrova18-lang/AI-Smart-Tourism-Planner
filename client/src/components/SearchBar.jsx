import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import '../styles/components.css';

const SearchBar = ({ destinations = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.length > 0) {
      const filtered = destinations.filter(d =>
        d.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectDestination = (destination) => {
    navigate(`/destination/${destination._id}`);
    setSearchQuery('');
    setSuggestions([]);
  };

  return (
    <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(30, 64, 175, 0.2)',
          border: '2px solid rgba(248, 250, 252, 0.2)',
          borderRadius: '50px',
          padding: '12px 20px',
          transition: 'all 0.3s ease'
        }}
      >
        <FaSearch style={{ marginRight: '10px', color: '#06B6D4' }} />
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#F8FAFC',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(248, 250, 252, 0.1)',
            borderTop: 'none',
            borderRadius: '0 0 20px 20px',
            marginTop: '-10px',
            paddingTop: '10px',
            maxHeight: '300px',
            overflowY: 'auto',
            zIndex: 100
          }}
        >
          {suggestions.map((dest) => (
            <div
              key={dest._id}
              onClick={() => handleSelectDestination(dest)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(248, 250, 252, 0.05)',
                transition: 'background 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <p style={{ fontWeight: '600', marginBottom: '4px' }}>{dest.name}</p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(248, 250, 252, 0.5)' }}>{dest.location}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
