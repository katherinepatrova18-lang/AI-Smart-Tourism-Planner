import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { createTrip } from '../services/trips';
import '../styles/components.css';

const AIPlanner = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    numberOfDays: 3,
    numberOfTravelers: 1,
    budget: 1000,
    travelPreferences: {
      style: 'moderate',
      activities: [],
      pace: 'moderate'
    }
  });

  const activities = ['adventure', 'cultural', 'relaxation', 'food', 'nature', 'entertainment'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'activities') {
      setFormData(prev => ({
        ...prev,
        travelPreferences: {
          ...prev.travelPreferences,
          activities: checked
            ? [...prev.travelPreferences.activities, value]
            : prev.travelPreferences.activities.filter(a => a !== value)
        }
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      addNotification('Please login to create a trip', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await createTrip({
        ...formData,
        user: user.id
      });
      addNotification('Trip created successfully!', 'success');
      navigate(`/my-trips`);
    } catch (error) {
      addNotification(error.response?.data?.message || 'Error creating trip', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '50px' }}>🤖 AI Trip Planner</h1>
          <p className="section-subtitle">Let our AI create the perfect itinerary for your next adventure</p>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} className="form">
              {/* Trip Title */}
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Trip Title</label>
                <input
                  type="text"
                  name="title"
                  className="input"
                  placeholder="Summer Vacation 2024"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Destination */}
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Destination</label>
                <input
                  type="text"
                  name="destination"
                  className="input"
                  placeholder="Enter destination name"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Dates */}
              <div className="form-row">
                <div className="input-group">
                  <label style={{ fontWeight: '600' }}>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    className="input"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label style={{ fontWeight: '600' }}>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    className="input"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Duration and Travelers */}
              <div className="form-row">
                <div className="input-group">
                  <label style={{ fontWeight: '600' }}>Number of Days</label>
                  <input
                    type="number"
                    name="numberOfDays"
                    className="input"
                    min="1"
                    value={formData.numberOfDays}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label style={{ fontWeight: '600' }}>Number of Travelers</label>
                  <input
                    type="number"
                    name="numberOfTravelers"
                    className="input"
                    min="1"
                    value={formData.numberOfTravelers}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Total Budget ($)</label>
                <input
                  type="number"
                  name="budget"
                  className="input"
                  min="0"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Travel Style */}
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Travel Style</label>
                <select
                  name="travelPreferences.style"
                  className="input"
                  value={formData.travelPreferences.style}
                  onChange={handleChange}
                >
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              {/* Travel Pace */}
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Travel Pace</label>
                <select
                  name="travelPreferences.pace"
                  className="input"
                  value={formData.travelPreferences.pace}
                  onChange={handleChange}
                >
                  <option value="relaxed">Relaxed</option>
                  <option value="moderate">Moderate</option>
                  <option value="fast-paced">Fast-Paced</option>
                </select>
              </div>

              {/* Activities */}
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Preferred Activities</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '12px' }}>
                  {activities.map(activity => (
                    <label key={activity} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        name="activities"
                        value={activity}
                        checked={formData.travelPreferences.activities.includes(activity)}
                        onChange={handleChange}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />
                      <span style={{ textTransform: 'capitalize' }}>{activity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Creating AI Plan...' : '✈️ Create My Trip'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AIPlanner;
