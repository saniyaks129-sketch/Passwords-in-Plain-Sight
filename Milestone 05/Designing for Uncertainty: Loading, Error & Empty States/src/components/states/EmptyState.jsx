import React from 'react';

export default function EmptyState({
  title = 'No items found',
  message = 'There is no data to display right now.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-gray-300 rounded-lg bg-gray-50 my-4">
      <span className="text-5xl mb-4">📭</span>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm mb-6 max-w-sm">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}