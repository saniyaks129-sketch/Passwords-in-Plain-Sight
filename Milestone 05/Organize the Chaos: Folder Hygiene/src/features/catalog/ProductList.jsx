import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import Button from '../../components/Button';
import { fetchProducts } from './productsService';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="p-4 border rounded bg-white shadow-sm mb-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}