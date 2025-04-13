// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f8f8f8',
      borderBottom: '1px solid #ddd'
    }}>
      <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.25rem' }}>
        🥢 Cutlery Store
      </Link>
      <Link to="/cart" style={{ textDecoration: 'none', fontSize: '1rem' }}>
        🛒 Cart ({totalItems})
      </Link>
    </nav>
  );
}

export default Navbar;

