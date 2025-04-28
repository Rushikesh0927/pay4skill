import express from 'express';
import { Application } from '../models/Application';

const router = express.Router();

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('task', 'title description budget deadline')
      .populate('student', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Get application by ID
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('task', 'title description budget deadline')
      .populate('student', 'name email profile.avatar');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    return res.status(200).json(application);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new application
router.post('/', async (req, res) => {
  try {
    const { task, student, proposal, attachments } = req.body;
    
    // Check if application already exists
    const existingApplication = await Application.findOne({ task, student });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this task' });
    }
    
    const newApplication = new Application({
      task,
      student,
      proposal,
      attachments,
      status: 'pending'
    });
    
    await newApplication.save();
    
    return res.status(201).json({
      message: 'Application submitted successfully',
      application: newApplication
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'accepted', 'rejected', 'withdrawn'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('task', 'title description budget deadline')
     .populate('student', 'name email profile.avatar');
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    return res.status(200).json(updatedApplication);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Get applications by student
router.get('/student/:studentId', async (req, res) => {
  try {
    const applications = await Application.find({ student: req.params.studentId })
      .populate('task', 'title description budget deadline')
      .populate('student', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Get applications by task
router.get('/task/:taskId', async (req, res) => {
  try {
    const applications = await Application.find({ task: req.params.taskId })
      .populate('task', 'title description budget deadline')
      .populate('student', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router; 