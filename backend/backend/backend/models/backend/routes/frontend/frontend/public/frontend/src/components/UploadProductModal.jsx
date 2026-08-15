import React, { useState } from 'react';

export default function UploadProductModal({ onProductUploaded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    category: 'Fashion',
    stock: 10,
    imageUrl: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          images: [formData.imageUrl]
        })
      });

      if (response.ok) {
        alert('Product Live on Market Plus!');
        setFormData({ title: '', description: '', price: '', discountPrice: '', category: 'Fashion', stock: 10, imageUrl: '' });
        if (onProductUploaded) onProductUploaded();
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '20px auto', background: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#2874f0' }}>Upload Product to Market Plus</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="Product Title" 
          value={formData.title} 
          onChange={(e) => setFormData({...formData, title: e.target.value})} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea 
          placeholder="Description" 
          value={formData.description} 
          onChange={(e) => setFormData({...formData, description: e.target.value})} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="number" 
          placeholder="Original Price (₹)" 
          value={formData.price} 
          onChange={(e) => setFormData({...formData, price: e.target.value})} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input 
          type="number" 
          placeholder="Sale Price (₹)" 
          value={formData.discountPrice} 
          onChange={(e) => setFormData({...formData, discountPrice: e.target.value})} 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select 
          value={formData.category} 
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="Fashion">Fashion & Apparel</option>
          <option value="Jewelry">Jewelry & Accessories</option>
          <option value="Electronics">Electronics</option>
          <option value="Home">Home & Kitchen</option>
        </select>
        <input 
          placeholder="Image URL (e.g. https://via.placeholder.com/150)" 
          value={formData.imageUrl} 
          onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
          required 
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ background: '#ff3f6c', color: '#fff', padding: '12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
          Publish Product Live
        </button>
      </form>
    </div>
  );
}

