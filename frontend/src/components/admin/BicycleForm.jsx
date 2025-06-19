// frontend/src/components/admin/BicycleForm.jsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';

const BicycleForm = ({ onSubmit, initialData = null, isSaving }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Mountain',
    price: '',
    originalPrice: '',
    description: '',
    specifications: { frameSize: '', wheelSize: '', gears: '', weight: '', material: '', color: '' },
    images: [''],
    quantity: 1,
    inStock: true,
    featured: false
  });
  
  const categories = ['Mountain', 'Road', 'Hybrid', 'Electric', 'BMX', 'Cruiser'];
  const navigate = useNavigate();
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        images: initialData.images.length > 0 ? initialData.images : ['']
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  
  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, specifications: { ...prev.specifications, [name]: value } }));
  };
  
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, images: newImages }));
  };
  
  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 glass-card p-8">
      {/* Main Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Bicycle Name" className="input-field" required />
        <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" className="input-field" required />
        <select name="category" value={formData.category} onChange={handleChange} className="input-field">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input-field" required />
        <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} placeholder="Original Price (Optional)" className="input-field" />
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity in Stock" className="input-field" required />
      </div>
      
      {/* Description */}
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input-field w-full h-24" required />

      {/* Specifications */}
      <h3 className="text-xl font-semibold border-t pt-4">Specifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <input name="frameSize" value={formData.specifications.frameSize} onChange={handleSpecChange} placeholder="Frame Size" className="input-field" />
        <input name="wheelSize" value={formData.specifications.wheelSize} onChange={handleSpecChange} placeholder="Wheel Size" className="input-field" />
        <input type="number" name="gears" value={formData.specifications.gears} onChange={handleSpecChange} placeholder="Gears" className="input-field" />
        <input name="weight" value={formData.specifications.weight} onChange={handleSpecChange} placeholder="Weight" className="input-field" />
        <input name="material" value={formData.specifications.material} onChange={handleSpecChange} placeholder="Material" className="input-field" />
        <input name="color" value={formData.specifications.color} onChange={handleSpecChange} placeholder="Color" className="input-field" />
      </div>

      {/* Images */}
      <h3 className="text-xl font-semibold border-t pt-4">Images</h3>
      <div className="space-y-2">
        {formData.images.map((img, index) => (
          <input key={index} type="text" value={img} onChange={(e) => handleImageChange(index, e.target.value)} placeholder="Image URL" className="input-field" />
        ))}
        <button type="button" onClick={addImageField} className="text-sm btn-secondary py-1 px-3">Add another image</button>
      </div>

      {/* Toggles */}
      <div className="flex items-center space-x-6 border-t pt-4">
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="h-4 w-4" /> In Stock</label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="h-4 w-4" /> Featured</label>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => navigate('/admin/dashboard')} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={isSaving} className="btn-primary flex items-center gap-2">
          <Save size={18} /> {isSaving ? 'Saving...' : 'Save Bicycle'}
        </button>
      </div>
    </form>
  );
};

export default BicycleForm;