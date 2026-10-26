import React from 'react';

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-item-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleTask(task.id)}
        />
        <span className="task-title">{task.title}</span>
      </label>
      <button 
        className="delete-btn" 
        onClick={() => onDeleteTask(task.id)}
      >
        Delete
      </button>
    </li>
  );
}