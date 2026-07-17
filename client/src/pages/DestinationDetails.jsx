import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ImageCarousel from '../components/ImageCarousel';
import RatingStars from '../components/RatingStars';
import { getDestinationById } from '../services/destinations';
import { createReview } from '../services/reviews';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import '../styles/components.css';

const DestinationDetails = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useUI();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    title: '',
    comment: ''
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchDestination();
  }, [id]);

  const fetchDestination = async () => {
    try {
      const response = await getDestinationById(id);
      setDestination(response.data.destination);
    } catch (error) {
      console.error('Error fetching destination:', error);
      addNotification('Error loading destination', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addNotification('Please login to submit a review', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      await createReview({
        destination: id,
        ...reviewData
      });
      addNotification('Review submitted successfully!', 'success');
      setReviewData({ rating: 0, title: '', comment: '' });
      fetchDestination();
    } catch (error) {
      addNotification('Error submitting review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex-center" style={{ minHeight: '500px' }}>
          <div className="spinner"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!destination) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container text-center">
            <h2>Destination not found</h2>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          {/* Hero Image */}
          <ImageCarousel images={[destination.coverImage, ...(destination.gallery || [])]} />

          {/* Info */}
          <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                {destination.name}
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#06B6D4', marginBottom: '20px' }}>
                📍 {destination.location}
              </p>
              <div className="flex gap-3" style={{ marginBottom: '30px' }}>
                <span>⭐ {destination.rating || 0}/5</span>
                <span>📸 {destination.gallery?.length || 0} Photos</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>About</h3>
              <p style={{ lineHeight: '1.8', color: 'rgba(248, 250, 252, 0.8)', marginBottom: '30px' }}>
                {destination.description}
              </p>

              {/* Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>Popular Attractions</h3>
                  <div className="grid grid-2" style={{ marginBottom: '30px' }}>
                    {destination.attractions.map((attr, idx) => (
                      <div key={idx} className="glass-card">
                        {attr.image && (
                          <img
                            src={attr.image}
                            alt={attr.name}
                            style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                          />
                        )}
                        <h4 style={{ fontWeight: 'bold', marginBottom: '5px' }}>{attr.name}</h4>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.7)' }}>{attr.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Reviews Section */}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '20px' }}>Reviews</h3>
              <form onSubmit={handleSubmitReview} className="glass-card" style={{ marginBottom: '30px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '15px' }}>Submit Your Review</h4>
                
                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Rating</label>
                  <RatingStars
                    rating={reviewData.rating}
                    setRating={(val) => setReviewData({ ...reviewData, rating: val })}
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Title</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Review title"
                    value={reviewData.title}
                    onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Comment</label>
                  <textarea
                    className="input"
                    placeholder="Share your experience..."
                    rows="4"
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div>
              <div className="glass-card" style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Trip Info</h3>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.6)', marginBottom: '5px' }}>Best Time to Visit</p>
                  <p style={{ fontWeight: '600' }}>🌞 {destination.bestTime}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.6)', marginBottom: '5px' }}>Weather</p>
                  <p style={{ fontWeight: '600' }}>{destination.weather?.condition}</p>
                  <p style={{ fontSize: '0.9rem' }}>{destination.weather?.temperature}</p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(248, 250, 252, 0.6)', marginBottom: '5px' }}>Estimated Budget (per person)</p>
                  <p className="text-gradient" style={{ fontWeight: '600', fontSize: '1.2rem' }}>
                    ${destination.estimatedBudget?.min || 0} - ${destination.estimatedBudget?.max || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DestinationDetails;
