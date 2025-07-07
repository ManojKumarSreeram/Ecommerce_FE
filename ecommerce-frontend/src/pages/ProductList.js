import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useAuth } from '../context/AuthContext';
import './productList.css';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const { role, token } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products', {
        params: {
          page,
          limit,
          search,
          category
        }
      });
      setProducts(res.data.products);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleAddToCart = async (productId) => {
    try {
      await API.post('/cart/add', { product_id: productId, quantity: 1 });
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await API.delete(`/products/${productId}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="product-page">
      <h2>Available Products</h2>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image_url} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>₹{p.price}</strong></p>
            <p className="category">{p.category}</p>

            {role === 'customer' && (
              <button onClick={() => handleAddToCart(p.id)}>Add to Cart</button>
            )}
            {role === 'admin' && (
              <div className="admin-actions">
                <button onClick={() => navigate(`/admin/edit/${p.id}`)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          ◀ Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page * limit >= total}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default ProductList;
