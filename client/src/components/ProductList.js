import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === 'all' ||
      (product.category && product.category.toLowerCase() === category);

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  console.log('Category:', category);
  console.log('Filtered:', filteredProducts);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cutlery Collection</h1>

      {/* FILTER & SEARCH UI */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="fork">Fork</option>
          <option value="knife">Knife</option>
          <option value="spoon">Spoon</option>
          <option value="set">Set</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0.5rem', width: '200px' }}
        />
      </div>

      {/* PRODUCT CARDS */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {filteredProducts.length === 0 ? (
          <p>No products found matching your filters.</p>
        ) : (
          filteredProducts.map((product) => (
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
                  style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
                />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <p><strong>€{product.price}</strong></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
