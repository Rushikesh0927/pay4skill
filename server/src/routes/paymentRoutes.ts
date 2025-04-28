import express from 'express';
import { Payment } from '../models/Payment';

const router = express.Router();

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('task', 'title description budget')
      .populate('employer', 'name email')
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('task', 'title description budget')
      .populate('employer', 'name email')
      .populate('student', 'name email');
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const { 
      task, 
      employer, 
      student, 
      amount, 
      currency, 
      paymentMethod, 
      transactionId, 
      metadata 
    } = req.body;
    
    const newPayment = new Payment({
      task,
      employer,
      student,
      amount,
      currency,
      paymentMethod,
      transactionId,
      metadata,
      status: 'pending'
    });
    
    await newPayment.save();
    
    res.status(201).json({
      message: 'Payment initiated successfully',
      payment: newPayment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update payment status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'completed', 'failed', 'refunded'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('task', 'title description budget')
     .populate('employer', 'name email')
     .populate('student', 'name email');
    
    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get payments by employer
router.get('/employer/:employerId', async (req, res) => {
  try {
    const payments = await Payment.find({ employer: req.params.employerId })
      .populate('task', 'title description budget')
      .populate('employer', 'name email')
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get payments by student
router.get('/student/:studentId', async (req, res) => {
  try {
    const payments = await Payment.find({ student: req.params.studentId })
      .populate('task', 'title description budget')
      .populate('employer', 'name email')
      .populate('student', 'name email')
      .sort({ createdAt: -1 });
    
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router; 