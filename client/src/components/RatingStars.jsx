// Rating Stars Component
import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/components.css';

const RatingStars = ({ rating, setRating, readOnly = false, size = 'md' }) => {
  const sizes = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={sizes[size]}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            color: star <= rating ? '#06B6D4' : 'rgba(248, 250, 252, 0.2)'
          }}
          onClick={() => !readOnly && setRating(star)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
