import React, { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsRow from '../components/dashboard/StatsRow';
import AddTaskInput from '../components/dashboard/AddTaskInput';
import TaskFilterBar from '../components/dashboard/TaskFilterBar';
import TaskList from '../components/dashboard/TaskList';
import { initialTasks } from '../data/tasks';

const DashboardPage = () => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [taskTitle, setTaskTitle] = useState('');
  const [category, setCategory] = useState('Feature');
  const [filter, setFilter] = useState('all');

  // Derived Values
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // State Handlers
  const handleAddTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      category,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTaskTitle('');
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <DashboardHeader />
        <StatsRow
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
        />
        <AddTaskInput
          taskTitle={taskTitle}
          setTaskTitle={setTaskTitle}
          category={category}
          setCategory={setCategory}
          onAddTask={handleAddTask}
        />
        <TaskFilterBar
          currentFilter={filter}
          onFilterChange={setFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default DashboardPage;