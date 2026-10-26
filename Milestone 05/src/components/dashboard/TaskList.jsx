import React from 'react';
import TaskItem from '../shared/TaskItem';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-800/20 border border-dashed border-slate-700/60 rounded-xl">
        <p className="text-slate-400 text-sm font-medium">No tasks found in this view.</p>
        <p className="text-slate-500 text-xs mt-1">Add a new task above or select a different filter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;