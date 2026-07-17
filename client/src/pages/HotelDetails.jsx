import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import '../styles/components.css';

const HotelDetails = () => {
  const { isAuthenticated } = useAuth();
  const { addNotification } = useUI();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
    rooms: 1
  });
  const [submittingBooking, setSubmittingBooking] = useState(false);

  useEffect(() => {
    // Mock hotel data
    setHotel({
      _id: '1',
      name: 'Ocean Breeze Resort',
      location: 'Baga Beach, Goa',
      description: 'Luxury beachfront resort with world-class amenities, pristine beaches, and excellent service. Perfect for a relaxing vacation.',
      bannerImage: 'https://images.unsplash.com/photo-1496417263034-38461f403636?w=800',
      images: [
        'https://images.unsplash.com/photo-1496417263034-38461f403636?w=800',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800'
      ],
      rating: 4.8,
      price: { perNight: 120, currency: 'USD' },
      facilities: ['WiFi', 'Pool', 'Beach Access', 'Spa', 'Restaurant', 'Bar'],
      rooms: [
        { roomType: 'Deluxe', maxGuests: 2, price: 120 },
        { roomType: 'Suite', maxGuests: 4, price: 200 }
      ]
    });
    setLoading(false);
  }, []);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'rooms' || name === 'adults' || name === 'children'
        ? parseInt(value)
        : value
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      addNotification('Please login to book a hotel', 'error');
      return;
    }

    setSubmittingBooking(true);
    try {
      // Simulate booking
      setTimeout(() => {
        addNotification('Booking confirmed! Check your email for details.', 'success');
        setSubmittingBooking(false);
      }, 1000);
    } catch (error) {
      addNotification('Error booking hotel', 'error');
      setSubmittingBooking(false);
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

  if (!hotel) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container text-center">
            <h2>Hotel not found</h2>
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
          <div
            style={{
              width: '100%',
              height: '400px',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '40px',
              backgroundImage: `url(${hotel.bannerImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
            {/* Left Column */}
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '10px' }}>
                {hotel.name}
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#06B6D4', marginBottom: '20px' }}>
                📍 {hotel.location}
              </p>

              <div className="flex gap-3" style={{ marginBottom: '30px' }}>
                <span>⭐ {hotel.rating}/5</span>
                <span>🚗 {hotel.images?.length || 0} Photos</span>
              </div>

              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>About</h3>
              <p style={{ lineHeight: '1.8', color: 'rgba(248, 250, 252, 0.8)', marginBottom: '30px' }}>
                {hotel.description}
              </p>

              {/* Facilities */}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>Facilities</h3>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                {hotel.facilities?.map((facility, idx) => (
                  <span key={idx} className="badge badge-primary">
                    {facility}
                  </span>
                ))}
              </div>

              {/* Rooms */}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>Available Rooms</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                {hotel.rooms?.map((room, idx) => (
                  <div key={idx} className="glass-card">
                    <h4 style={{ fontWeight: 'bold', marginBottom: '10px' }}>{room.roomType}</h4>
                    <p style={{ marginBottom: '8px' }}>👥 Max {room.maxGuests} guests</p>
                    <p className="text-gradient" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                      ${room.price}/night
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Booking */}
            <div>
              <form onSubmit={handleSubmitBooking} className="glass-card" style={{ position: 'sticky', top: '100px' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Book Now</h3>

                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    name="checkInDate"
                    className="input"
                    value={bookingData.checkInDate}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    name="checkOutDate"
                    className="input"
                    value={bookingData.checkOutDate}
                    onChange={handleBookingChange}
                    required
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Adults</label>
                  <input
                    type="number"
                    name="adults"
                    className="input"
                    min="1"
                    value={bookingData.adults}
                    onChange={handleBookingChange}
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '15px' }}>
                  <label>Children</label>
                  <input
                    type="number"
                    name="children"
                    className="input"
                    min="0"
                    value={bookingData.children}
                    onChange={handleBookingChange}
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label>Number of Rooms</label>
                  <input
                    type="number"
                    name="rooms"
                    className="input"
                    min="1"
                    value={bookingData.rooms}
                    onChange={handleBookingChange}
                  />
                </div>

                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(248, 250, 252, 0.1)' }}>
                  <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Price per night</span>
                    <span>${hotel.price?.perNight}</span>
                  </p>
                  <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Number of rooms</span>
                    <span>{bookingData.rooms}</span>
                  </p>
                  <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.1rem', color: '#06B6D4' }}>
                    <span>Total (estimate)</span>
                    <span>${(hotel.price?.perNight || 0) * bookingData.rooms}</span>
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submittingBooking}
                  style={{ width: '100%' }}
                >
                  {submittingBooking ? 'Booking...' : '🎫 Complete Booking'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HotelDetails;
