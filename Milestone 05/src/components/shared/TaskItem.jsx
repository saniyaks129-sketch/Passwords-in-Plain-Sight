import React from 'react';

const TaskItem = ({ task, onToggleTask, onDeleteTask }) => {
  return (
    <div className={`group flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:border-slate-600 transition-all ${
      task.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-center space-x-3.5 flex-1 min-w-0">
        <button
          onClick={() => onToggleTask(task.id)}
          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-indigo-600 border-indigo-600 text-white'
              : 'border-slate-600 hover:border-indigo-500 text-transparent'
          }`}
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          ✓
        </button>
        <span className={`text-sm text-slate-200 truncate ${task.completed ? 'line-through text-slate-400' : ''}`}>
          {task.title}
        </span>
      </div>
      
      <div className="flex items-center space-x-3 ml-4">
        {task.category && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-700/60 text-slate-300 font-medium">
            {task.category}
          </span>
        )}
        <button
          onClick={() => onDeleteTask(task.id)}
          className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
          aria-label="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;