import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import './adminForm.css';

const AdminProductForm = () => {
  const { id } = useParams(); // For edit
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
  });

  useEffect(() => {
    if (isEdit) {
      API.get(`/products/${id}`)
        .then((res) => {
          const p = res.data;
          setFormData({
            name: p.name,
            description: p.description,
            price: p.price,
            category: p.category,
            image_url: p.image_url,
          });
        })
        .catch((err) => console.error('Failed to load product:', err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await API.put(`/products/${id}`, formData);
      } else {
        await API.post('/products', formData);
      }
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Product Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Price (INR):</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Image URL:</label>
        <input
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
        />

        <button type="submit">{isEdit ? 'Update' : 'Create'} Product</button>
      </form>
    </div>
  );
};

export default AdminProductForm;
