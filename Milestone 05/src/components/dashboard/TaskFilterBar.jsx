import React from 'react';

const TaskFilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = ['all', 'pending', 'completed'];

  return (
    <div className="flex items-center space-x-2 mb-6 border-b border-slate-800 pb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
            currentFilter === filter
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default TaskFilterBar;