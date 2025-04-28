import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IApplication extends Document {
  task: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  proposal: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    proposal: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
    attachments: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
applicationSchema.index({ task: 1, student: 1 }, { unique: true });
applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

// Ensure only one active application per task per student
applicationSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingApplication = await (this.constructor as Model<IApplication>).findOne({
      task: this.task,
      student: this.student,
      status: { $in: ['pending', 'accepted'] },
    });
    
    if (existingApplication) {
      next(new Error('You have already applied for this task'));
    }
  }
  next();
});

export const Application = mongoose.model<IApplication>('Application', applicationSchema); 