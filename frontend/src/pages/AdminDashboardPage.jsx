// frontend/src/pages/AdminDashboardPage.jsx

import { useState, useEffect } from 'react';
import { bicyclesAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboardPage = () => {
  const [bicycles, setBicycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBicycles = async () => {
    try {
      setLoading(true);
      const response = await bicyclesAPI.getAllBicycles({ limit: 100 }); // Get all bikes
      setBicycles(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch bicycles.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBicycles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bicycle?')) {
      try {
        // NOTE: We need to create this API endpoint and function
        await bicyclesAPI.deleteBicycle(id);
        toast.success('Bicycle deleted successfully!');
        fetchBicycles(); // Re-fetch the list
      } catch (error) {
        toast.error('Failed to delete bicycle.');
        console.error(error);
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-slide-up">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
        <Link to="/admin/bicycle/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add New Bicycle
        </Link>
      </div>

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Brand</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bicycles.map((bike) => (
              <tr key={bike._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="p-4 font-semibold">{bike.name}</td>
                <td className="p-4">{bike.brand}</td>
                <td className="p-4">{bike.category}</td>
                <td className="p-4">${bike.price}</td>
                <td className="p-4">{bike.quantity}</td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Link to={`/admin/bicycle/edit/${bike._id}`} className="text-blue-600 hover:text-blue-800">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(bike._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboardPage;