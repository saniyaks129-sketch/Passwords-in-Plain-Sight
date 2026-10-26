import React, { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsRow from '../components/dashboard/StatsRow';
import AddTaskInput from '../components/dashboard/AddTaskInput';
import TaskFilterBar from '../components/dashboard/TaskFilterBar';
import TaskList from '../components/dashboard/TaskList';
import initialTasks from '../data/tasks';

export default function DashboardPage() {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [filter, setFilter] = useState('all');

  const handleAddTask = (title) => {
    const newTask = { id: Date.now(), title, completed: false };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      <StatsRow
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
      />
      <section className="tasks-section">
        <AddTaskInput onAddTask={handleAddTask} />
        <TaskFilterBar currentFilter={filter} onFilterChange={setFilter} />
        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </section>
    </div>
  );
}