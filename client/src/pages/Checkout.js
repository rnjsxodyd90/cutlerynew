import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, updateQuantity, removeFromCart, setCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      customer: form,
      items: cart,
      total,
    };

    console.log("ORDER PLACED:", order);

    setCart([]); // clear cart after order
    navigate('/thank-you');
  };

  if (cart.length === 0) return <p style={{ padding: '2rem' }}>Your cart is empty.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <div>
          <label>Name: </label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email: </label><br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Address: </label><br />
          <textarea name="address" value={form.address} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Place Order</button>
      </form>

      <h3>Order Summary</h3>
      {cart.map(item => (
        <div key={item.id} style={{ marginBottom: '1rem' }}>
          {item.name} (x{item.quantity}) - €{(item.price * item.quantity).toFixed(2)}
        </div>
      ))}
      <p><strong>Total: €{total.toFixed(2)}</strong></p>
    </div>
  );
}

export default Checkout;
