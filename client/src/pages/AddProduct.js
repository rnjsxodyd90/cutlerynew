import { useState } from 'react';


function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/admin/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage('✅ Product added successfully!');
        setForm({ name: '', description: '', price: '', image: '' });
      })
      .catch((err) => {
        console.error(err);
        setMessage('❌ Failed to add product.');
      });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Add New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="Price (€)" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="/images/yourimage.jpg" required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
