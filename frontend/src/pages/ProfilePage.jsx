// frontend/src/pages/ProfilePage.jsx

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bicyclesAPI } from '../services/api';
import BicycleList from '../components/bicycle/BicycleList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

const ProfilePage = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: { street: '', city: '', state: '', zipCode: '', country: '' }
  });
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || { street: '', city: '', state: '', zipCode: '', country: '' }
      });

      const fetchWishlist = async () => {
        try {
          // In a real-world scenario with many items, you might want a dedicated API endpoint
          // For now, we fetch all bikes and filter by the user's wishlist IDs
          const response = await bicyclesAPI.getAllBicycles();
          const userWishlist = response.data.data.filter(bike => 
            user.wishlist.includes(bike._id)
          );
          setWishlistItems(userWishlist);
        } catch (error) {
          console.error("Failed to fetch wishlist items", error);
        } finally {
          setLoadingWishlist(false);
        }
      };

      fetchWishlist();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    // Success/error toast is handled by the auth context
  };

  if (authLoading || !user) {
    return <LoadingSpinner />;
  }

  return (
    <div className="animate-slide-up space-y-12">
      <h1 className="text-4xl font-bold text-center text-gradient">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center space-y-2 mb-4">
                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="input-field pl-10" />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone Number" className="input-field pl-10" />
              </div>

              <h3 className="text-lg font-semibold pt-4">Shipping Address</h3>
              <div className="relative">
                 <MapPin className="absolute left-3 top-4 text-gray-400" size={20} />
                 <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} placeholder="Street" className="input-field pl-10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} placeholder="City" className="input-field" />
                <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} placeholder="State" className="input-field" />
              </div>
               <div className="grid grid-cols-2 gap-4">
                <input type="text" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} placeholder="Zip Code" className="input-field" />
                <input type="text" name="country" value={formData.address.country} onChange={handleAddressChange} placeholder="Country" className="input-field" />
              </div>
              
              <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                <Save size={18} />
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Wishlist */}
        <div className="lg:col-span-2">
           <h2 className="text-3xl font-bold mb-4 text-gradient">My Wishlist</h2>
           <div className="glass-card p-6">
            {loadingWishlist ? (
              <LoadingSpinner />
            ) : wishlistItems.length > 0 ? (
              <BicycleList bicycles={wishlistItems} />
            ) : (
              <p className="text-center text-gray-500 py-8">Your wishlist is empty. Start exploring to find your perfect ride!</p>
            )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;