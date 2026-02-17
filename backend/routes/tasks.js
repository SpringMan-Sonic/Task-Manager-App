const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

const taskValidation = [
  body('title').trim().notEmpty().withMessage('Title is required')
];
router.get('/stats', protect, getTaskStats);
router.get('/', protect, getTasks);
router.get('/:id', protect, getTask);
router.post('/', protect, taskValidation, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);

module.exports = router;