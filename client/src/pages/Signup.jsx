import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { signup } from '../services/auth';
import '../styles/components.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      addNotification('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await signup({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      login(response.data.user, response.data.token);
      addNotification('Account created successfully!', 'success');
      navigate('/');
    } catch (error) {
      addNotification(error.response?.data?.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <h1 className="section-title" style={{ marginBottom: '30px' }}>Create Account</h1>

            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="John Doe"
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
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="input"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label style={{ fontWeight: '600' }}>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="input"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(248, 250, 252, 0.7)' }}>
              Already have an account? <a href="/login" style={{ color: '#06B6D4', fontWeight: '600' }}>Login</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Signup;
