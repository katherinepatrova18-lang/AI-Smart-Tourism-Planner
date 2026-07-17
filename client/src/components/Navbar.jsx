import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import '../styles/components.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { sidebarOpen, toggleSidebar } = useUI();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/explore' },
    { label: 'AI Planner', path: '/ai-planner' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Budget', path: '/budget' },
    { label: 'My Trips', path: '/my-trips' }
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
        padding: '15px 0'
      }}
    >
      <div className="container flex-between">
        {/* Logo */}
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <span className="text-gradient">🌍 Smart Tourism</span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className="flex gap-2"
          style={{
            display: 'none',
            '@media (min-width: 768px)': { display: 'flex' }
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                color: 'rgba(248, 250, 252, 0.8)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(59, 130, 246, 0.1)';
                e.target.style.color = '#3B82F6';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'rgba(248, 250, 252, 0.8)';
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Links */}
        <div className="flex gap-2">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="btn btn-outline" style={{ padding: '8px 16px' }}>
                👤 {user?.name || 'Profile'}
              </Link>
              <Link to="/saved-trips" className="btn btn-outline" style={{ padding: '8px 16px' }}>
                💾 Saved
              </Link>
              <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '8px 16px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: '8px 16px' }}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '8px 16px' }}>
                Signup
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#06B6D4',
              fontSize: '1.5rem',
              cursor: 'pointer',
              display: 'none',
              '@media (max-width: 768px)': { display: 'block' }
            }}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '20px',
            borderTop: '1px solid rgba(248, 250, 252, 0.1)'
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              style={{ padding: '8px' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
