import express from 'express';
import { Task } from '../models/Task';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('employer', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('employer', 'name email profile.avatar');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      budget, 
      deadline, 
      category, 
      skills, 
      location, 
      isRemote, 
      employer 
    } = req.body;
    
    const newTask = new Task({
      title,
      description,
      budget,
      deadline,
      category,
      skills,
      location,
      isRemote,
      employer
    });
    
    await newTask.save();
    
    res.status(201).json({
      message: 'Task created successfully',
      task: newTask
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('employer', 'name email profile.avatar');
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get tasks by employer
router.get('/employer/:employerId', async (req, res) => {
  try {
    const tasks = await Task.find({ employer: req.params.employerId })
      .populate('employer', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router; 