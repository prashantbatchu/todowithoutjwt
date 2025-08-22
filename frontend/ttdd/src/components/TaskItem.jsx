import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  if (!task) return null;

  const taskId = task._id || task.id;

  return (
    <div className={`p-4 border rounded-lg mb-3 ${task.completed ? 'bg-gray-100' : 'bg-white'} shadow-sm`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-1 text-gray-600 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Created: {task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onToggleComplete(taskId, !task.completed)}
            className={`px-3 py-1 rounded-md text-sm ${
              task.completed 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            } transition-colors`}
          >
            {task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={() => onDelete(taskId)}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
