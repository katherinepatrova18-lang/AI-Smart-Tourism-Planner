import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HotelCard from '../components/HotelCard';
import Filters from '../components/Filters';
import { getAllHotels } from '../services/hotels';
import '../styles/components.css';

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [filters, hotels]);

  const fetchHotels = async () => {
    try {
      const response = await getAllHotels();
      setHotels(response.data.hotels || []);
      setFilteredHotels(response.data.hotels || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    let results = [...hotels];

    if (filters.search) {
      results = results.filter(h =>
        h.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        h.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.minPrice) {
      results = results.filter(h => h.price?.perNight >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      results = results.filter(h => h.price?.perNight <= parseInt(filters.maxPrice));
    }

    if (filters.sort === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sort === 'price-low') {
      results.sort((a, b) => (a.price?.perNight || 0) - (b.price?.perNight || 0));
    } else if (filters.sort === 'price-high') {
      results.sort((a, b) => (b.price?.perNight || 0) - (a.price?.perNight || 0));
    }

    setFilteredHotels(results);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '50px' }}>Find Perfect Hotels</h1>

          <div className="grid" style={{ gridTemplateColumns: '250px 1fr', gap: '30px' }}>
            {/* Sidebar Filters */}
            <div>
              <Filters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {/* Hotels Grid */}
            <div>
              {loading ? (
                <div className="flex-center" style={{ minHeight: '500px' }}>
                  <div className="spinner"></div>
                </div>
              ) : filteredHotels.length > 0 ? (
                <>
                  <p style={{ marginBottom: '20px', color: 'rgba(248, 250, 252, 0.7)' }}>
                    Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-3">
                    {filteredHotels.map((hotel) => (
                      <HotelCard
                        key={hotel._id}
                        hotel={hotel}
                        onClick={() => navigate(`/hotel/${hotel._id}`)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="glass-card text-center" style={{ padding: '60px 20px' }}>
                  <h3 style={{ marginBottom: '10px' }}>No hotels found</h3>
                  <p style={{ color: 'rgba(248, 250, 252, 0.7)' }}>Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Hotels;
