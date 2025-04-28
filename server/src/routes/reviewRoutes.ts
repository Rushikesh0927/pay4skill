import express from 'express';
import { Review } from '../models/Review';

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('task', 'title description')
      .populate('reviewer', 'name email profile.avatar')
      .populate('reviewee', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Get review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('task', 'title description')
      .populate('reviewer', 'name email profile.avatar')
      .populate('reviewee', 'name email profile.avatar');
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { task, reviewer, reviewee, rating, comment } = req.body;
    
    // Check if review already exists
    const existingReview = await Review.findOne({ task, reviewer, reviewee });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this user for this task' });
    }
    
    const newReview = new Review({
      task,
      reviewer,
      reviewee,
      rating,
      comment
    });
    
    await newReview.save();
    
    return res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Update review
router.put('/:id', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    ).populate('task', 'title description')
     .populate('reviewer', 'name email profile.avatar')
     .populate('reviewee', 'name email profile.avatar');
    
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    return res.status(200).json(updatedReview);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    return res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Get reviews by reviewee
router.get('/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate('task', 'title description')
      .populate('reviewer', 'name email profile.avatar')
      .populate('reviewee', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Get reviews by task
router.get('/task/:taskId', async (req, res) => {
  try {
    const reviews = await Review.find({ task: req.params.taskId })
      .populate('task', 'title description')
      .populate('reviewer', 'name email profile.avatar')
      .populate('reviewee', 'name email profile.avatar')
      .sort({ createdAt: -1 });
    
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});

export default router; 