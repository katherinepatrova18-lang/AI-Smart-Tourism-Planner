import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import '../styles/components.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    preferences: user?.preferences || {
      currency: 'USD',
      budget: 'moderate',
      travelStyle: 'balanced'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock update - no API call needed
      updateUser(formData);
      addNotification('Profile updated successfully!', 'success');
    } catch (error) {
      addNotification('Error updating profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '50px' }}>My Profile</h1>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Bio</label>
                <textarea
                  name="bio"
                  className="input"
                  rows="4"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Preferred Currency</label>
                <select
                  name="preferences.currency"
                  className="input"
                  value={formData.preferences.currency}
                  onChange={handleChange}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Budget Preference</label>
                <select
                  name="preferences.budget"
                  className="input"
                  value={formData.preferences.budget}
                  onChange={handleChange}
                >
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Travel Style</label>
                <select
                  name="preferences.travelStyle"
                  className="input"
                  value={formData.preferences.travelStyle}
                  onChange={handleChange}
                >
                  <option value="adventure">Adventure</option>
                  <option value="relaxation">Relaxation</option>
                  <option value="balanced">Balanced</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Saving...' : '💾 Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Profile;
