// Glass Card Component
import React from 'react';
import '../styles/components.css';

const GlassCard = ({ children, className = '' }) => {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
