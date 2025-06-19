// frontend/src/pages/BicyclesPage.jsx

import { useState, useEffect } from 'react';
import { bicyclesAPI } from '../services/api';
import BicycleList from '../components/bicycle/BicycleList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const BicyclesPage = () => {
  const [bicycles, setBicycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBicycles = async () => {
      try {
        setLoading(true);
        const response = await bicyclesAPI.getAllBicycles();
        setBicycles(response.data.data);
      } catch (err) {
        setError('Failed to load bicycles. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBicycles();
  }, []);

  return (
    <div className="animate-slide-up">
      <h1 className="text-4xl font-bold text-center mb-12 text-gradient">Our Collection</h1>
      {/* We will add filters and search here later */}
      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        bicycles.length > 0 ? <BicycleList bicycles={bicycles} /> : <p className="text-center">No bicycles found.</p>
      )}
    </div>
  );
};

export default BicyclesPage;