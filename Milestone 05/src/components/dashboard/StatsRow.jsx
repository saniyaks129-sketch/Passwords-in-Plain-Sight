import React from 'react';
import StatCard from '../shared/StatCard';

const StatsRow = ({ totalTasks, completedTasks, pendingTasks }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard 
        title="Total Tasks" 
        count={totalTasks} 
        subtitle="All planned items" 
        icon="📋" 
        colorClass="text-indigo-400" 
      />
      <StatCard 
        title="Completed" 
        count={completedTasks} 
        subtitle="Finished deep work" 
        icon="✅" 
        colorClass="text-emerald-400" 
      />
      <StatCard 
        title="Pending" 
        count={pendingTasks} 
        subtitle="Requires focus" 
        icon="⏳" 
        colorClass="text-amber-400" 
      />
    </div>
  );
};

export default StatsRow;