import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DestinationCard from '../components/DestinationCard';
import Filters from '../components/Filters';
import { getAllDestinations } from '../services/destinations';
import '../styles/components.css';

const Explore = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [filters, destinations]);

  const fetchDestinations = async () => {
    try {
      const response = await getAllDestinations();
      setDestinations(response.data.destinations || []);
      setFilteredDestinations(response.data.destinations || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    let results = [...destinations];

    if (filters.search) {
      results = results.filter(d =>
        d.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        d.location.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.minPrice) {
      results = results.filter(d => d.estimatedBudget?.min >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      results = results.filter(d => d.estimatedBudget?.max <= parseInt(filters.maxPrice));
    }

    if (filters.sort === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sort === 'popular') {
      results.sort((a, b) => b.isPopular - a.isPopular);
    }

    setFilteredDestinations(results);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '50px' }}>Explore Destinations</h1>

          <div className="grid" style={{ gridTemplateColumns: '250px 1fr', gap: '30px' }}>
            {/* Sidebar Filters */}
            <div>
              <Filters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {/* Destinations Grid */}
            <div>
              {loading ? (
                <div className="flex-center" style={{ minHeight: '500px' }}>
                  <div className="spinner"></div>
                </div>
              ) : filteredDestinations.length > 0 ? (
                <>
                  <p style={{ marginBottom: '20px', color: 'rgba(248, 250, 252, 0.7)' }}>
                    Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
                  </p>
                  <div className="grid grid-3">
                    {filteredDestinations.map((dest) => (
                      <DestinationCard
                        key={dest._id}
                        destination={dest}
                        onClick={() => navigate(`/destination/${dest._id}`)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="glass-card text-center" style={{ padding: '60px 20px' }}>
                  <h3 style={{ marginBottom: '10px' }}>No destinations found</h3>
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

export default Explore;
