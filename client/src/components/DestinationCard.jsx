import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components.css';

const DestinationCard = ({ destination, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '16px'
        }}
      >
        <img
          src={destination.coverImage}
          alt={destination.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        {destination.isPopular && (
          <span
            className="badge badge-primary"
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px'
            }}
          >
            ⭐ Popular
          </span>
        )}
      </div>

      {/* Content */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
        {destination.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'rgba(248, 250, 252, 0.6)', marginBottom: '12px' }}>
        📍 {destination.location}
      </p>

      {/* Rating and Budget */}
      <div className="flex-between" style={{ marginBottom: '12px' }}>
        <span>⭐ {destination.rating || 0}/5</span>
        <span className="text-gradient">💰 ${destination.estimatedBudget?.min || 0}-${destination.estimatedBudget?.max || 0}</span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(248, 250, 252, 0.7)',
        lineHeight: '1.5',
        marginBottom: '12px'
      }}>
        {destination.description?.substring(0, 100)}...
      </p>

      {/* Best Time */}
      <p style={{ fontSize: '0.85rem', color: '#06B6D4' }}>🌡️ Best: {destination.bestTime}</p>
    </motion.div>
  );
};

export default DestinationCard;
