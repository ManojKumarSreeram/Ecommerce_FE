import React, { useEffect, useState } from 'react';
import API from '../api/api';
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [refresh]);

  const updateQuantity = async (productId, quantity) => {
    try {
      await API.put('/cart/update', { product_id: productId, quantity });
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete('/cart/remove', {
        data: { product_id: productId }
      });
      setRefresh((prev) => !prev);
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const placeOrder = async () => {
    try {
      await API.post('/orders/place');
      setCartItems([]);
    } catch (err) {
      console.error('Failed to place order:', err);
    }
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.cart_item_id} className="cart-card">
                <img src={item.image_url} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </p>
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button onClick={placeOrder} className="place-order-btn">Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
