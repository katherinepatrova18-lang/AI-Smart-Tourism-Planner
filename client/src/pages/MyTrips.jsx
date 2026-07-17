import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { getUserTrips } from '../services/trips';
import { useUI } from '../context/UIContext';
import '../styles/components.css';

const MyTrips = () => {
  const { user } = useAuth();
  const { addNotification } = useUI();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await getUserTrips(user.id);
      setTrips(response.data.trips || []);
    } catch (error) {
      addNotification('Error fetching trips', 'error');
    } finally {
      setLoading(false);
    }
  };

  const filteredTrips = filter === 'all'
    ? trips
    : trips.filter(trip => trip.status === filter);

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '30px' }}>My Trips</h1>

          {/* Filter Tabs */}
          <div className="flex gap-2" style={{ marginBottom: '30px', justifyContent: 'center' }}>
            {['all', 'draft', 'planned', 'completed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={filter === status ? 'btn btn-primary' : 'btn btn-secondary'}
                style={{ textTransform: 'capitalize' }}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex-center" style={{ minHeight: '400px' }}>
              <div className="spinner"></div>
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-2">
              {filteredTrips.map(trip => (
                <div key={trip._id} className="glass-card">
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
                    {trip.title}
                  </h3>
                  <p style={{ color: '#06B6D4', marginBottom: '15px' }}>
                    📍 {trip.destination?.name}
                  </p>

                  <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p><span style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Duration:</span> {trip.numberOfDays} days</p>
                    <p><span style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Travelers:</span> {trip.numberOfTravelers} people</p>
                    <p><span style={{ color: 'rgba(248, 250, 252, 0.6)' }}>Budget:</span> ${trip.budget?.amount}</p>
                    <p>
                      <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                        {trip.status}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="btn btn-primary" style={{ flex: 1 }}>View</button>
                    <button className="btn btn-secondary" style={{ flex: 1 }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card text-center" style={{ padding: '60px 20px' }}>
              <h3 style={{ marginBottom: '10px' }}>No trips yet</h3>
              <p style={{ color: 'rgba(248, 250, 252, 0.7)' }}>Start planning your next adventure!</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MyTrips;
