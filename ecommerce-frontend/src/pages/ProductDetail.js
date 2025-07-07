// pages/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import './productDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // from the URL param
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail-container">
      <img src={product.image_url} alt={product.name} />
      <div className="product-detail-info">
        <h2>{product.name}</h2>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p><strong>Created At:</strong> {new Date(product.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
