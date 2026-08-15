import React, { useState, useEffect } from 'react';
import UploadProductModal from './components/UploadProductModal';

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showUpload, setShowUpload] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.title} Cart me add ho gaya!`);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f1f3f6', minHeight: '100vh', margin: 0 }}>
      {/* Flipkart / Amazon style Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#2874f0', color: '#fff', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px' }}>Market Plus</h1>
        <div>
          <button 
            onClick={() => setShowUpload(!showUpload)} 
            style={{ marginRight: '15px', padding: '8px 16px', background: '#fff', color: '#2874f0', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {showUpload ? 'Close Form' : '+ Upload Product'}
          </button>
          <span style={{ fontWeight: 'bold' }}>🛒 Cart ({cart.length})</span>
        </div>
      </header>

      {/* Upload Screen Toggle */}
      {showUpload && <UploadProductModal onProductUploaded={fetchProducts} />}

      {/* Product Grid */}
      <main style={{ padding: '20px' }}>
        <h2>Trending Deals & Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {products.map((p) => (
            <div key={p._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '12px', textAlign: 'center', background: '#fff' }}>
              <img 
                src={p.images && p.images[0] ? p.images[0] : 'https://via.placeholder.com/200'} 
                alt={p.title} 
                style={{ width: '100%', height: '180px', objectFit: 'contain' }} 
              />
              <h4 style={{ margin: '10px 0 5px', fontSize: '16px' }}>{p.title}</h4>
              <p style={{ color: '#388e3c', fontWeight: 'bold', fontSize: '18px', margin: '5px 0' }}>
                ₹{p.discountPrice || p.price} <span style={{ textDecoration: 'line-through', color: '#888', fontSize: '13px' }}>₹{p.price}</span>
              </p>
              <p style={{ fontSize: '12px', color: '#555' }}>Seller: {p.sellerName || 'Market Plus'}</p>
              <button 
                onClick={() => addToCart(p)}
                style={{ width: '100%', background: '#fb641b', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
