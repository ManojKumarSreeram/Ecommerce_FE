import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './order.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    API.get('/orders/admin/all')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch all orders:', err));
  }, []);

  const fetchOrderItems = async (orderId) => {
    try {
      const res = await API.get(`/orders/admin/details/${orderId}`);
      setSelectedItems(res.data);
    } catch (err) {
      console.error('Failed to fetch order details:', err);
    }
  };

  return (
    <div className="order-container">
      <h2>All Orders (Admin)</h2>
      {orders.length === 0 ? <p>No orders placed yet.</p> : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="order-card" onClick={() => fetchOrderItems(order.id)}>
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Customer ID:</strong> {order.user_id}</p>
                <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedItems.length > 0 && (
        <div className="order-items">
          <h3>Order Details</h3>
          <ul>
            {selectedItems.map((item) => (
              <li key={item.product_id}>
                <p>{item.name} — Qty: {item.quantity} — ₹{item.price}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
