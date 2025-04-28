import express from 'express';
import { Message } from '../models/Message';

const router = express.Router();

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name email profile.avatar')
      .populate('receiver', 'name email profile.avatar')
      .populate('task', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('sender', 'name email profile.avatar')
      .populate('receiver', 'name email profile.avatar')
      .populate('task', 'title');
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new message
router.post('/', async (req, res) => {
  try {
    const { sender, receiver, task, content, attachments } = req.body;
    
    const newMessage = new Message({
      sender,
      receiver,
      task,
      content,
      attachments,
      read: false
    });
    
    await newMessage.save();
    
    res.status(201).json({
      message: 'Message sent successfully',
      messageData: newMessage
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    ).populate('sender', 'name email profile.avatar')
     .populate('receiver', 'name email profile.avatar')
     .populate('task', 'title');
    
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get conversation between two users
router.get('/conversation/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const { taskId } = req.query;
    
    const query: any = {
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    };
    
    if (taskId) {
      query.task = taskId;
    }
    
    const messages = await Message.find(query)
      .populate('sender', 'name email profile.avatar')
      .populate('receiver', 'name email profile.avatar')
      .populate('task', 'title')
      .sort({ createdAt: 1 });
    
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get unread messages count for a user
router.get('/unread/:userId', async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.params.userId,
      read: false
    });
    
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router; 