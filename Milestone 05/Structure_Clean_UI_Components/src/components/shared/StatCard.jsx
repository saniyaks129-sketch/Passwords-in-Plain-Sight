import React from 'react';

export default function StatCard({ label, value, variant }) {
  return (
    <div className={`stat-card ${variant ? `stat-card--${variant}` : ''}`}>
      <div className="stat-card-content">
        <span className="stat-card-label">{label}</span>
        <span className="stat-card-value">{value}</span>
      </div>
    </div>
  );
}