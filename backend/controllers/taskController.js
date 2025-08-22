const Task = require('../models/Task.js');

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      user: req.user._id
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user owns the task
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};