import React from 'react';

const DashboardHeader = ({ title = "FocusForge Dashboard", subtitle = "Plan your day, track deep work, and build momentum." }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
      <p className="mt-2 text-slate-400 text-sm max-w-2xl">{subtitle}</p>
    </div>
  );
};

export default DashboardHeader;