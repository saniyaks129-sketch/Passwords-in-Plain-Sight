import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export default function OrderCard({ order }) {
  return (
    <div className="border rounded p-4 mb-3 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{order?.name || `Order #${order?.id}`}</h3>
        <span className="text-sm font-medium text-emerald-600">
          {formatCurrency(order?.total || 0)}
        </span>
      </div>
      <p className="text-xs text-gray-500">Status: {order?.status || 'Processing'}</p>
    </div>
  );
}