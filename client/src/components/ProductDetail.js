import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/">← Back to Catalog</Link>
      <h2>{product.name}</h2>
      <img
        src={`http://localhost:3000${product.image}`}
        alt={product.name}
        style={{ width: '300px' }}
      />
      <p>{product.description}</p>
      <p><strong>€{product.price}</strong></p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;
