import React from 'react';
import '../styles/components.css';

const Footer = () => {
  return (
    <footer
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        borderTop: '1px solid rgba(248, 250, 252, 0.1)',
        padding: '40px 0 20px',
        marginTop: '60px'
      }}
    >
      <div className="container">
        <div className="grid grid-3" style={{ marginBottom: '40px' }}>
          {/* Column 1 */}
          <div>
            <h4 className="mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>About Us</h4>
            <p style={{ color: 'rgba(248, 250, 252, 0.6)', lineHeight: '1.8' }}>
              Smart Tourism Planner makes travel planning easy with AI-powered recommendations.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              <li><a href="/explore" style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Explore</a></li>
              <li><a href="/ai-planner" style={{ color: 'rgba(248, 250, 252, 0.6)' }}>AI Planner</a></li>
              <li><a href="/hotels" style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Hotels</a></li>
              <li><a href="/budget" style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Budget</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="mb-3" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Contact</h4>
            <p style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Email: info@smarttourism.com</p>
            <p style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Phone: +1 800-123-4567</p>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid rgba(248, 250, 252, 0.1)',
            paddingTop: '20px',
            textAlign: 'center',
            color: 'rgba(248, 250, 252, 0.5)'
          }}
        >
          <p>&copy; 2024 Smart Tourism Planner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
