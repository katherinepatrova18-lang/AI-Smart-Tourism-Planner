import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { login as loginUser } from '../services/auth';
import '../styles/components.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await loginUser(formData.email, formData.password);
      login(response.data.user, response.data.token);
      addNotification('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      addNotification(error.response?.data?.message || 'Login failed', 'error');
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
            <h1 className="section-title" style={{ marginBottom: '30px' }}>Login</h1>

            <form onSubmit={handleSubmit} className="form">
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
                <label style={{ fontWeight: '600' }}>Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Enter your password"
                  value={formData.password}
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
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(248, 250, 252, 0.7)' }}>
              Don't have an account? <a href="/signup" style={{ color: '#06B6D4', fontWeight: '600' }}>Sign up</a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Login;
