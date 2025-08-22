const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController.js');
const auth = require('../middleware/auth.js');
const router = express.Router();

// All routes are protected with auth middleware
router.use(auth);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;