// frontend/src/pages/BicycleDetailPage.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bicyclesAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Tag, CheckCircle, BarChart, Weight, Paintbrush, Cog } from 'lucide-react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const BicycleDetailPage = () => {
    const [bicycle, setBicycle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchBicycle = async () => {
            try {
                setLoading(true);
                const response = await bicyclesAPI.getBicycleById(id);
                setBicycle(response.data.data);
            } catch (err) {
                setError('Could not find the bicycle. It might have been removed.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBicycle();
    }, [id]);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-center text-red-500 text-xl py-12">{error}</p>;
    if (!bicycle) return null;

    const specs = [
        { icon: <Cog className="text-primary-500" />, label: "Frame Size", value: bicycle.specifications.frameSize },
        { icon: <BarChart className="text-primary-500" />, label: "Gears", value: bicycle.specifications.gears },
        { icon: <Weight className="text-primary-500" />, label: "Weight", value: bicycle.specifications.weight },
        { icon: <Paintbrush className="text-primary-500" />, label: "Color", value: bicycle.specifications.color },
    ];

    const handleAddToCart = () => {
        addToCart({
            bicycle: bicycle._id,
            name: bicycle.name,
            image: bicycle.images[0],
            price: bicycle.price,
            quantity: 1, // For now, we'll just add 1 at a time
        });
        toast.success(`${bicycle.name} added to cart!`);
    };

    return (
        <div className="animate-slide-up">
            <div className="glass-card p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Image Gallery */}
                    <div>
                        <img
                            src={bicycle.images[0]}
                            alt={bicycle.name}
                            className="w-full h-auto object-cover rounded-xl shadow-lg"
                        />
                        {/* You could add a thumbnail gallery here if there are multiple images */}
                    </div>

                    {/* Details */}
                    <div>
                        <span className="inline-block bg-secondary-100 text-secondary-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                            {bicycle.category} - {bicycle.brand}
                        </span>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{bicycle.name}</h1>
                        <p className="text-gray-600 mb-6">{bicycle.description}</p>

                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-5xl font-bold text-gradient">${bicycle.price}</span>
                            {bicycle.originalPrice && (
                                <span className="text-xl text-red-500 line-through">${bicycle.originalPrice}</span>
                            )}
                        </div>

                        <div className="mb-6">
                            <button onClick={handleAddToCart} className="w-full btn-primary text-lg">
                                Add to Cart
                            </button>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-xl font-bold border-b pb-2">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {specs.map(spec => (
                                    <div key={spec.label} className="flex items-center gap-3">
                                        {spec.icon}
                                        <div>
                                            <p className="text-sm text-gray-500">{spec.label}</p>
                                            <p className="font-semibold">{spec.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BicycleDetailPage;