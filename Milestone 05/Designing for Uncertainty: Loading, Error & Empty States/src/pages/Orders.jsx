import React from 'react';
import { SkeletonCard, ErrorMessage, EmptyState } from '../components/states';

export default function Orders({ orders = [], isLoading = false, error = null, refetch }) {
  // ---------------------------------------------------------------------------
  // TEMPORARY SCREENSHOT TOGGLES
  // ---------------------------------------------------------------------------
  const SHOW_LOADING = false; // Set to true for orders-loading.png
  const SHOW_ERROR = false;   // Set to true for orders-error.png
  // ---------------------------------------------------------------------------

  if (SHOW_LOADING) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <SkeletonCard count={4} />
      </div>
    );
  }

  if (SHOW_ERROR) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <ErrorMessage
          message="We couldn't load your orders. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <SkeletonCard count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <ErrorMessage
          message="We couldn't load your orders. Please check your network connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <EmptyState
          title="No orders placed yet"
          message="When customers place their first order, it will show up right here."
          actionLabel="Refresh Orders"
          onAction={refetch}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="p-4 border rounded-lg bg-white shadow-sm flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.customerName || 'Customer'}</p>
            </div>
            <span className="font-bold text-indigo-600">${order.total || '0.00'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}