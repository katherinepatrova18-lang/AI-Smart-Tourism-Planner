import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import StatsBar from '../components/StatsBar';
import DestinationCard from '../components/DestinationCard';
import { getAllDestinations } from '../services/destinations';
import '../styles/components.css';

const Home = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [stats, setStats] = useState([
    { value: '50K+', label: 'Happy Travelers' },
    { value: '250+', label: 'Destinations' },
    { value: '4.9', label: 'User Rating' },
    { value: '24/7', label: 'AI Assistant' }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await getAllDestinations();
      setDestinations(response.data.destinations || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 64, 175, 0.5))',
          padding: '80px 0',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated Background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%233B82F6" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 style={{
              fontSize: '4rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Discover the World Smarter with AI
            </h1>

            <p style={{
              fontSize: '1.3rem',
              color: 'rgba(248, 250, 252, 0.8)',
              marginBottom: '40px',
              maxWidth: '700px',
              margin: '0 auto 40px'
            }}>
              Plan your perfect journey with AI-powered recommendations, smart routes, hotels, and personalized travel plans.
            </p>

            {/* Search Bar */}
            <SearchBar destinations={destinations} />

            {/* CTA Buttons */}
            <div className="flex gap-3" style={{ justifyContent: 'center', marginTop: '30px' }}>
              <button
                onClick={() => navigate('/ai-planner')}
                className="btn btn-primary"
              >
                🚀 Plan My Trip
              </button>
              <button
                onClick={() => navigate('/explore')}
                className="btn btn-secondary"
              >
                🗺️ Explore Destinations
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Headings Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-4" style={{ gap: '20px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card"
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => navigate('/explore')}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>🏠</h3>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Home</h4>
              <p style={{ color: 'rgba(248, 250, 252, 0.6)', fontSize: '0.9rem' }}>Explore our featured collections</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card"
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => navigate('/explore')}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>🌍</h3>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Destinations</h4>
              <p style={{ color: 'rgba(248, 250, 252, 0.6)', fontSize: '0.9rem' }}>Discover amazing places</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass-card"
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => navigate('/ai-planner')}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>⭐</h3>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Features</h4>
              <p style={{ color: 'rgba(248, 250, 252, 0.6)', fontSize: '0.9rem' }}>Powerful planning tools</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card"
              style={{ cursor: 'pointer', textAlign: 'center' }}
              onClick={() => navigate('/explore')}
            >
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>💬</h3>
              <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Reviews</h4>
              <p style={{ color: 'rgba(248, 250, 252, 0.6)', fontSize: '0.9rem' }}>Real traveler experiences</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '50px' }}>Our Platform</h2>
          <StatsBar stats={stats} />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section" style={{ background: 'rgba(30, 64, 175, 0.05)' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '50px' }}>Popular Destinations</h2>
          {loading ? (
            <div className="flex-center" style={{ minHeight: '400px' }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-3">
              {destinations.slice(0, 6).map((dest) => (
                <DestinationCard
                  key={dest._id}
                  destination={dest}
                  onClick={() => navigate(`/destination/${dest._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '50px' }}>Why Choose Us?</h2>
          <div className="grid grid-3">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Planning',
                description: 'Get personalized travel recommendations based on your preferences and budget.'
              },
              {
                icon: '💰',
                title: 'Smart Budget Planning',
                description: 'Optimize your travel expenses with our advanced budget estimator.'
              },
              {
                icon: '🏨',
                title: 'Best Hotel Deals',
                description: 'Find and book the perfect accommodation at competitive prices.'
              },
              {
                icon: '🗺️',
                title: 'Route Optimization',
                description: 'Discover the best routes and travel paths for your journey.'
              },
              {
                icon: '⭐',
                title: 'Reviews & Ratings',
                description: 'Read authentic reviews from fellow travelers and make informed decisions.'
              },
              {
                icon: '📸',
                title: 'Rich Media Gallery',
                description: 'Explore stunning photos and get inspired before you travel.'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card"
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(248, 250, 252, 0.7)' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
