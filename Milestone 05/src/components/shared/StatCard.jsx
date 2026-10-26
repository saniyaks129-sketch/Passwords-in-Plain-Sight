import React from 'react';

const StatCard = ({ title, count, subtitle, icon, colorClass }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5 hover:border-slate-600 transition-all">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-medium">{title}</span>
        {icon && <span className={`text-xl ${colorClass}`}>{icon}</span>}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-bold text-white">{count}</span>
        {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;