// frontend/src/pages/HomePage.jsx

import { useState, useEffect } from 'react';
import { bicyclesAPI } from '../services/api';
import BicycleList from '../components/bicycle/BicycleList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [featuredBicycles, setFeaturedBicycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                const response = await bicyclesAPI.getFeaturedBicycles();
                setFeaturedBicycles(response.data.data);
            } catch (err) {
                setError('Could not fetch featured bicycles.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="animate-scale-in">
            <section className="text-center py-16 px-4 rounded-2xl animated-bg text-white">
                <h1 className="text-5xl font-extrabold mb-4">Find Your Perfect Ride</h1>
                <p className="text-xl max-w-2xl mx-auto mb-8">
                    Explore our exclusive collection of high-quality bicycles for every terrain and style.
                </p>
                <Link to="/bicycles" className="btn-primary text-lg">
                    Explore All Bicycles
                </Link>
            </section>

            <section className="py-16">
                <h2 className="text-3xl font-bold text-center mb-8 text-gradient">Featured Bicycles</h2>
                {loading && <LoadingSpinner />}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && <BicycleList bicycles={featuredBicycles} />}
            </section>
        </div>
    );
};

export default HomePage;