import React from 'react';

export default function SkeletonCard({ count = 3 }) {
  return (
    <div className="space-y-4 w-full">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse p-4 border rounded-lg bg-gray-50">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
    </div>
  );
}