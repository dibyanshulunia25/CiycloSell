// frontend/src/pages/AdminEditBicyclePage.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { bicyclesAPI } from '../services/api';
import BicycleForm from '../components/admin/BicycleForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import toast from 'react-hot-toast';

const AdminEditBicyclePage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBicycle = async () => {
      try {
        const response = await bicyclesAPI.getBicycleById(id);
        setInitialData(response.data.data);
      } catch (error) {
        toast.error("Could not fetch bicycle data.");
        navigate('/admin/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchBicycle();
  }, [id, navigate]);

  const handleUpdateBicycle = async (formData) => {
    setIsSaving(true);
    try {
      // NOTE: We need to create this API endpoint and function
      await bicyclesAPI.updateBicycle(id, formData);
      toast.success('Bicycle updated successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to update bicycle.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Edit Bicycle</h1>
      <BicycleForm 
        onSubmit={handleUpdateBicycle} 
        initialData={initialData}
        isSaving={isSaving} 
      />
    </div>
  );
};

export default AdminEditBicyclePage;