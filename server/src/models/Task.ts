import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  employer: mongoose.Types.ObjectId;
  budget: {
    amount: number;
    currency: string;
  };
  deadline: Date;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  skills: string[];
  applicants: mongoose.Types.ObjectId[];
  assignedTo?: mongoose.Types.ObjectId;
  category: string;
  location: {
    type: string;
    coordinates: number[];
  };
  isRemote: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    budget: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: {
        type: String,
        required: true,
        default: 'USD',
      },
    },
    deadline: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'completed', 'cancelled'],
      default: 'open',
    },
    skills: [{
      type: String,
      trim: true,
    }],
    applicants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    isRemote: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
taskSchema.index({ title: 'text', description: 'text' });
taskSchema.index({ status: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ skills: 1 });
taskSchema.index({ 'location.coordinates': '2dsphere' });

// Validate deadline is in the future
taskSchema.pre('save', function(next) {
  if (this.deadline && this.deadline < new Date()) {
    next(new Error('Deadline must be in the future'));
  }
  next();
});

export const Task = mongoose.model<ITask>('Task', taskSchema); 