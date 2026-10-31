import React from 'react';
import Button from '../../components/Button';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-3 bg-gray-50 flex flex-col justify-between">
      <div>
        <h4 className="font-semibold">{product?.name || 'Product'}</h4>
        <p className="text-sm text-gray-600">${product?.price || 0}</p>
      </div>
      <div className="mt-3">
        <Button label="View Details" />
      </div>
    </div>
  );
}