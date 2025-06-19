// frontend/src/pages/AdminAddBicyclePage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bicyclesAPI } from '../services/api';
import BicycleForm from '../components/admin/BicycleForm';
import toast from 'react-hot-toast';

const AdminAddBicyclePage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleAddBicycle = async (formData) => {
    setIsSaving(true);
    try {
      // NOTE: We need to create this API endpoint and function
      await bicyclesAPI.createBicycle(formData);
      toast.success('Bicycle added successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to add bicycle.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-8 text-gradient">Add New Bicycle</h1>
      <BicycleForm onSubmit={handleAddBicycle} isSaving={isSaving} />
    </div>
  );
};

export default AdminAddBicyclePage;