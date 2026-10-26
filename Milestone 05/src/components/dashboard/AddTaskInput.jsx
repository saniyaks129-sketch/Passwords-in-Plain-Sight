import React from 'react';

const AddTaskInput = ({ taskTitle, setTaskTitle, category, setCategory, onAddTask }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;
    onAddTask();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="What are you working on today?"
          className="flex-1 bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-900/80 border border-slate-700 text-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 md:w-40"
        >
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Refactor">Refactor</option>
          <option value="Docs">Docs</option>
        </select>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2"
        >
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default AddTaskInput;