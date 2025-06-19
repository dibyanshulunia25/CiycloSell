// frontend/src/components/bicycle/BicycleCard.jsx

import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowRight, Tag, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const BicycleCard = ({ bicycle }) => {
  const { isAuthenticated, user, addToWishlist, removeFromWishlist } = useAuth();

  const isWishlisted = user?.wishlist?.includes(bicycle._id);

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevent navigating to detail page
    e.stopPropagation(); // Stop event bubbling

    if (!isAuthenticated) {
      toast.error('Please log in to manage your wishlist.');
      return;
    }

    if (isWishlisted) {
      removeFromWishlist(bicycle._id);
    } else {
      addToWishlist(bicycle._id);
    }
  };

  return (
    <div className="relative">
      <Link to={`/bicycle/${bicycle._id}`} className="bicycle-card block">
        <div className="relative">
          <img 
            src={bicycle.images[0]} 
            alt={bicycle.name} 
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {bicycle.brand}
          </div>
        </div>
        <div className="pt-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{bicycle.name}</h3>
          <p className="text-sm text-gray-500">{bicycle.category}</p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-xl font-extrabold text-gradient flex items-center gap-1">
              <Tag size={18} /> ${bicycle.price}
            </p>
            <div className="flex items-center text-primary-600 font-semibold">
              Details <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </Link>
      {/* Wishlist Button */}
      <button 
        onClick={handleWishlistClick} 
        className="absolute top-2 left-2 p-2 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300"
        aria-label="Toggle Wishlist"
      >
        <Heart 
          size={20} 
          className={`transition-all duration-300 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-500'}`}
        />
      </button>
    </div>
  );
};

export default BicycleCard;