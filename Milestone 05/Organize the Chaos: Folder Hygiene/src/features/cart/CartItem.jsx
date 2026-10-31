import React from 'react';
import Button from '../../components/Button';
import { formatCurrency } from '../../utils/formatCurrency';
import { addToCart } from './cartService';

export default function CartItem({ item }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h4 className="font-semibold">{item?.name || 'Item'}</h4>
        <p className="text-gray-600">{formatCurrency(item?.price || 0)}</p>
      </div>
      <Button label="Add More" onClick={() => addToCart(item)} />
    </div>
  );
}