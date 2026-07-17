import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getUserFavorites, getUserSavedTrips } from '../services/userController';
import '../styles/components.css';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      // This would typically call getUserFavorites, but we'll use a mock for now
      setFavorites([
        {
          id: '1',
          type: 'destination',
          name: 'Paris',
          description: 'City of Love',
          image: 'https://via.placeholder.com/300x200'
        },
        {
          id: '2',
          type: 'hotel',
          name: 'Luxury Resort',
          description: '5-star resort',
          image: 'https://via.placeholder.com/300x200'
        }
      ]);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '50px' }}>❤️ My Favorites</h1>

          {loading ? (
            <div className="flex-center" style={{ minHeight: '400px' }}>
              <div className="spinner"></div>
            </div>
          ) : favorites.length > 0 ? (
            <div className="grid grid-3">
              {favorites.map(item => (
                <div key={item.id} className="glass-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '15px'
                    }}
                  />
                  <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{item.name}</h3>
                  <p style={{ color: 'rgba(248, 250, 252, 0.7)', marginBottom: '15px' }}>
                    {item.description}
                  </p>
                  <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card text-center" style={{ padding: '60px 20px' }}>
              <h3 style={{ marginBottom: '10px' }}>No favorites yet</h3>
              <p style={{ color: 'rgba(248, 250, 252, 0.7)' }}>Save destinations and hotels to your favorites!</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Favorites;
