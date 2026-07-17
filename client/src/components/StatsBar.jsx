import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components.css';

const StatsBar = ({ stats }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="grid grid-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {stats && stats.map((stat, idx) => (
        <motion.div key={idx} variants={itemVariants} className="glass-card text-center">
          <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px' }} className="text-gradient">
            {stat.value}
          </h3>
          <p style={{ color: 'rgba(248, 250, 252, 0.7)' }}>{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsBar;
