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

    fetch('http://localhost:3000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(res => res.json())
      .then(data => {
        console.log('Order saved:', data);
        setCart([]);
        navigate('/thank-you');
      })
      .catch(err => {
        console.error('Error saving order:', err);
        alert("Something went wrong. Please try again.");
      });
  };

  if (cart.length === 0) return <p style={{ padding: '2rem' }}>Your cart is empty.</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="name" placeholder="Your Name" onChange={handleChange} value={form.name} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={form.email} required />
        <textarea name="address" placeholder="Shipping Address" onChange={handleChange} value={form.address} required />
        <button type="submit">Place Order</button>
      </form>

      <h3>Order Summary</h3>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} x {item.quantity} – €{(item.price * item.quantity).toFixed(2)}
        </div>
      ))}
      <p><strong>Total: €{total.toFixed(2)}</strong></p>
    </div>
  );
}

export default Checkout;
