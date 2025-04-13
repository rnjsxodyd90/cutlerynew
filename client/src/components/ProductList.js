import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Cutlery Collection</h1>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '250px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
              <img
                src={`http://localhost:3000${product.image}`}
                alt={product.name}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', marginBottom: '1rem' }}
              />
              <h3 style={{ color: '#1a0dab', marginBottom: '0.5rem' }}>{product.name}</h3>
            </Link>
            <p style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>{product.description}</p>
            <p style={{ fontWeight: 'bold' }}>€{product.price}</p>
            <Link to="/cart" style={{ position: 'absolute', top: 20, right: 20 }}>
  🛒 View Cart
</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
