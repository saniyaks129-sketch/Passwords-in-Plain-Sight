import React from 'react';
import StatCard from '../shared/StatCard';

export default function StatsRow({ totalTasks, completedTasks, pendingTasks }) {
  return (
    <div className="stats-row">
      <StatCard label="Total Tasks" value={totalTasks} />
      <StatCard label="Completed" value={completedTasks} variant="success" />
      <StatCard label="Pending" value={pendingTasks} variant="warning" />
    </div>
  );
}