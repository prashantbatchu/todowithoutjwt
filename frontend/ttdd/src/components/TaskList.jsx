import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks = [], onToggleComplete, onDelete }) => {
  // Remove undefined/null tasks
  const safeTasks = Array.isArray(tasks) ? tasks.filter(Boolean) : [];

  if (safeTasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">No tasks yet. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks ({safeTasks.length})</h2>
      {safeTasks.map((task, index) => (
        <TaskItem
          key={task._id || task.id || index} // fallback for key
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
