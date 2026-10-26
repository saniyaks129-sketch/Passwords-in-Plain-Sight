import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products', err))
      .finally(() => setLoading(false));
  }, []); // Empty array ensures single execution on mount

  if (loading) return <div>Loading products...</div>;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.title}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}