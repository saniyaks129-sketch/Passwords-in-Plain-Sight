import React from 'react';

export default function ErrorMessage({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-red-100 rounded-lg bg-red-50 my-4">
      <span className="text-4xl mb-3">😵</span>
      <h3 className="text-lg font-bold text-gray-800 mb-1">Unable to load data</h3>
      <p className="text-gray-600 text-sm mb-4 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}