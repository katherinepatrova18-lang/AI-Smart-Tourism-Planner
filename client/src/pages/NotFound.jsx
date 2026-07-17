import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/components.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="section" style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
        <div className="container text-center">
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '20px' }} className="text-gradient">
            404
          </h1>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(248, 250, 252, 0.7)', marginBottom: '30px' }}>
            The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Back to Home
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NotFound;
