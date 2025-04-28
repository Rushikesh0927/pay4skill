import { Schema, model, Document, Model } from 'mongoose';

export interface IReview extends Document {
  task: Schema.Types.ObjectId;
  reviewer: Schema.Types.ObjectId;
  reviewee: Schema.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
reviewSchema.index({ task: 1 });
reviewSchema.index({ reviewer: 1 });
reviewSchema.index({ reviewee: 1 });
reviewSchema.index({ createdAt: -1 });

// Create a unique constraint to prevent multiple reviews from the same reviewer for the same task
reviewSchema.index({ task: 1, reviewer: 1, reviewee: 1 }, { unique: true });

// Pre-save hook to ensure reviewer and reviewee are different users
reviewSchema.pre('save', function(next) {
  if (this.reviewer.toString() === this.reviewee.toString()) {
    next(new Error('A user cannot review themselves'));
  }
  next();
});

// Pre-save hook to ensure the task is completed before a review can be submitted
reviewSchema.pre('save', async function(next) {
  const Task = model('Task');
  const task = await Task.findById(this.task);
  
  if (!task) {
    next(new Error('Task not found'));
  } else if (task.status !== 'completed') {
    next(new Error('Reviews can only be submitted for completed tasks'));
  } else {
    next();
  }
});

const Review = model<IReview>('Review', reviewSchema);

export default Review; 