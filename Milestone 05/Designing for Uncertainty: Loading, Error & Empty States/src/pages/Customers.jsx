import React from 'react';
import { SkeletonCard, ErrorMessage, EmptyState } from '../components/states';

export default function Customers({ customers, isLoading, error, refetch }) {
  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Customers</h1>
        <SkeletonCard count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Customers</h1>
        <ErrorMessage
          message="We couldn't retrieve customer records. Try refreshing the view."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!customers || customers.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Customers</h1>
        <EmptyState
          title="No customers registered"
          message="No customer accounts exist in the database yet."
          actionLabel="Refresh List"
          onAction={refetch}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="space-y-3">
        {customers.map((customer) => (
          <div key={customer.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <p className="font-semibold text-gray-800">{customer.name}</p>
            <p className="text-sm text-gray-500">{customer.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}