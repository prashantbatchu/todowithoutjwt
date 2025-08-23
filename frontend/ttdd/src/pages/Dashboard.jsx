import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);  // always an array
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTasks();
  }, [user, navigate]);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://todowithoutjwt.onrender.com/api/tasks');
      console.log("Fetched tasks:", response.data);
      // Ensure tasks is always an array
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post('https://todowithoutjwt.onrender.com/api/tasks', taskData);
      const newTask = response.data;
      if (newTask && typeof newTask === 'object') {
        setTasks(prev => [newTask, ...prev]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Toggle task completed
  const handleToggleComplete = useCallback(async (taskId, completed) => {
    try {
      const response = await axios.put(`https://todowithoutjwt.onrender.com/api/tasks/${taskId}`, { completed });
      const updatedTask = response.data;
      setTasks(prev => prev.map(t => (t._id === updatedTask._id ? updatedTask : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }, []);

  // Delete a task
  const handleDeleteTask = useCallback(async (taskId) => {
    try {
      await axios.delete(`https://todowithoutjwt.onrender.com/api/tasks/${taskId}`);
      setTasks(prev => prev.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList 
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
