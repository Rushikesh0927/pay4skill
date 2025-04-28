import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  task: mongoose.Types.ObjectId;
  employer: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    employer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
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
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      trim: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
paymentSchema.index({ task: 1 });
paymentSchema.index({ employer: 1 });
paymentSchema.index({ student: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Ensure task is completed before payment can be made
paymentSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Task = mongoose.model('Task');
    const task = await Task.findById(this.task);
    
    if (!task || task.status !== 'completed') {
      next(new Error('Payment can only be made for completed tasks'));
    }
  }
  next();
});

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema); 