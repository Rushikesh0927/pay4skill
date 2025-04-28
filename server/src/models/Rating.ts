import mongoose, { Document, Schema } from 'mongoose';

export interface IRating extends Document {
  task: mongoose.Types.ObjectId;
  reviewer: mongoose.Types.ObjectId;
  reviewee: mongoose.Types.ObjectId;
  rating: number;
  review: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ratingSchema = new Schema<IRating>(
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
    review: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
ratingSchema.index({ task: 1 });
ratingSchema.index({ reviewer: 1 });
ratingSchema.index({ reviewee: 1 });
ratingSchema.index({ rating: 1 });

// Ensure one rating per task per reviewer
ratingSchema.index({ task: 1, reviewer: 1 }, { unique: true });

// Validate that reviewer and reviewee are different users
ratingSchema.pre('save', function(next) {
  if (this.reviewer.toString() === this.reviewee.toString()) {
    next(new Error('Reviewer and reviewee cannot be the same user'));
  }
  next();
});

export const Rating = mongoose.model<IRating>('Rating', ratingSchema); 