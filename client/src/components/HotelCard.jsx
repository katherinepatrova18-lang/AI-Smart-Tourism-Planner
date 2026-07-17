import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components.css';

const HotelCard = ({ hotel, onClick }) => {
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
          src={hotel.bannerImage}
          alt={hotel.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
      </div>

      {/* Content */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '8px' }}>
        {hotel.name}
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'rgba(248, 250, 252, 0.6)', marginBottom: '12px' }}>
        📍 {hotel.location}
      </p>

      {/* Rating and Price */}
      <div className="flex-between" style={{ marginBottom: '12px' }}>
        <span>⭐ {hotel.rating || 0}/5</span>
        <span className="text-gradient" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
          ${hotel.price?.perNight || 0}/night
        </span>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(248, 250, 252, 0.7)',
        lineHeight: '1.5',
        marginBottom: '12px'
      }}>
        {hotel.description?.substring(0, 80)}...
      </p>

      {/* Facilities */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {hotel.facilities?.slice(0, 3).map((facility, idx) => (
          <span key={idx} className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
            {facility}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default HotelCard;
