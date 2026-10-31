import React from 'react';
import { SkeletonCard, ErrorMessage, EmptyState } from '../components/states';

export default function Products({ products = [], isLoading = false, error = null, refetch }) {
  // ---------------------------------------------------------------------------
  // TEMPORARY SCREENSHOT TOGGLES
  // ---------------------------------------------------------------------------
  const SHOW_LOADING = false; // Set to true for products-loading.png
  const SHOW_ERROR = false;   // Set to true for products-error.png
  // ---------------------------------------------------------------------------

  if (SHOW_LOADING) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <SkeletonCard count={4} />
      </div>
    );
  }

  if (SHOW_ERROR) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ErrorMessage
          message="We couldn't load your products. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <SkeletonCard count={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <ErrorMessage
          message="We couldn't load your products. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <EmptyState
          title="No products found"
          message="Try adjusting your search filters or add a new product."
          actionLabel="Refresh Products"
          onAction={refetch}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <h3 className="font-bold text-lg">{p.name}</h3>
            <p className="text-gray-600">${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}