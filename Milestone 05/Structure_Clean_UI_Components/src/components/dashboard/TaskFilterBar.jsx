import React from 'react';

export default function TaskFilterBar({ currentFilter, onFilterChange }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="task-filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? 'active' : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}