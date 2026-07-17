import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { createBudget } from '../services/budgets';
import '../styles/components.css';

const Budget = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { addNotification } = useUI();
  const [loading, setLoading] = useState(false);
  const [budgetData, setBudgetData] = useState({
    destination: '',
    numberOfDays: 3,
    numberOfTravelers: 1,
    totalBudget: 1000
  });
  const [budgetResult, setBudgetResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudgetData(prev => ({
      ...prev,
      [name]: name === 'totalBudget' ? parseFloat(value) : parseInt(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      addNotification('Please login to use budget planner', 'error');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await createBudget({
        ...budgetData,
        user: user.id
      });
      setBudgetResult(response.data.budget);
      addNotification('Budget calculated successfully!', 'success');
    } catch (error) {
      addNotification(error.response?.data?.message || 'Error calculating budget', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '50px' }}>💰 Budget Estimator</h1>
          <p className="section-subtitle">Plan your trip budget efficiently with our smart calculator</p>

          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '40px' }}>
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                  <label style={{ fontWeight: '600' }}>Destination</label>
                  <input
                    type="text"
                    name="destination"
                    className="input"
                    placeholder="Enter destination name"
                    value={budgetData.destination}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <label style={{ fontWeight: '600' }}>Number of Days</label>
                    <input
                      type="number"
                      name="numberOfDays"
                      className="input"
                      min="1"
                      value={budgetData.numberOfDays}
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
                      value={budgetData.numberOfTravelers}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label style={{ fontWeight: '600' }}>Total Budget ($)</label>
                  <input
                    type="number"
                    name="totalBudget"
                    className="input"
                    min="0"
                    value={budgetData.totalBudget}
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
                  {loading ? 'Calculating...' : '📊 Calculate Budget'}
                </button>
              </form>
            </div>

            {/* Results */}
            {budgetResult && (
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>Budget Breakdown</h3>
                
                <div className="glass-card" style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.6)' }}>Total Budget</p>
                    <h4 className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                      ${budgetResult.totalBudget}
                    </h4>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.6)' }}>Per Person</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                      ${budgetResult.perPersonBudget}
                    </p>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="glass-card" style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Expense Breakdown</h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(248, 250, 252, 0.1)' }}>
                    <span>🏨 Accommodation</span>
                    <span className="text-gradient" style={{ fontWeight: '600' }}>${budgetResult.breakdown.accommodation.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(248, 250, 252, 0.1)' }}>
                    <span>🍽️ Food</span>
                    <span className="text-gradient" style={{ fontWeight: '600' }}>${budgetResult.breakdown.food.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(248, 250, 252, 0.1)' }}>
                    <span>🎭 Activities</span>
                    <span className="text-gradient" style={{ fontWeight: '600' }}>${budgetResult.breakdown.activities.total}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>🚗 Transport</span>
                    <span className="text-gradient" style={{ fontWeight: '600' }}>${budgetResult.breakdown.transport.total}</span>
                  </div>
                </div>

                {/* Saving Tips */}
                {budgetResult.savingTips && budgetResult.savingTips.length > 0 && (
                  <div className="glass-card">
                    <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>💡 Money Saving Tips</h4>
                    <ul style={{ listStyle: 'none' }}>
                      {budgetResult.savingTips.map((tip, idx) => (
                        <li key={idx} style={{ marginBottom: '10px', paddingLeft: '20px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0 }}>✓</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Budget;
