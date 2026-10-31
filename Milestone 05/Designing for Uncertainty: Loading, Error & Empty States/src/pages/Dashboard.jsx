import React from 'react';
import { SkeletonCard, ErrorMessage, EmptyState } from '../components/states';

export default function Dashboard({ data, isLoading, error, refetch }) {
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <SkeletonCard count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <ErrorMessage
          message="Failed to load dashboard metrics."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <EmptyState
          title="No dashboard data"
          message="There are no overview metrics available right now."
          actionLabel="Reload Dashboard"
          onAction={refetch}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
          <p className="text-sm text-indigo-600 font-medium">Total Orders</p>
          <p className="text-2xl font-bold text-indigo-900">{data.totalOrders || 0}</p>
        </div>
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-green-900">${data.totalRevenue || '0.00'}</p>
        </div>
        <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Total Customers</p>
          <p className="text-2xl font-bold text-purple-900">{data.totalCustomers || 0}</p>
        </div>
      </div>
    </div>
  );
}