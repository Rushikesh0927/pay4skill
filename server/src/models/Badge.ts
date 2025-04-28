import mongoose, { Document, Schema } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  criteria: {
    completedTasks?: number;
    positiveRatings?: number;
    timelyDeliveries?: number;
    totalEarnings?: number;
  };
  users: Array<{
    user: mongoose.Types.ObjectId;
    earnedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const badgeSchema = new Schema<IBadge>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    criteria: {
      completedTasks: {
        type: Number,
        min: 0,
      },
      positiveRatings: {
        type: Number,
        min: 0,
      },
      timelyDeliveries: {
        type: Number,
        min: 0,
      },
      totalEarnings: {
        type: Number,
        min: 0,
      },
    },
    users: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      earnedAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes
badgeSchema.index({ name: 1 });
badgeSchema.index({ 'users.user': 1 });

// Validate that at least one criterion is provided
badgeSchema.pre('save', function(next) {
  const criteria = this.criteria;
  if (!criteria.completedTasks && !criteria.positiveRatings && 
      !criteria.timelyDeliveries && !criteria.totalEarnings) {
    next(new Error('At least one criterion must be provided'));
  }
  next();
});

export const Badge = mongoose.model<IBadge>('Badge', badgeSchema); 