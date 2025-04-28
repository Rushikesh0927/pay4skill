import mongoose, { Document, Schema } from 'mongoose';

export interface IReport extends Document {
  reporter: mongoose.Types.ObjectId;
  reportedUser?: mongoose.Types.ObjectId;
  reportedTask?: mongoose.Types.ObjectId;
  reportedMessage?: mongoose.Types.ObjectId;
  type: 'user' | 'task' | 'message';
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  adminNotes?: string;
  resolvedAt?: Date;
  resolvedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reportSchema = new Schema<IReport>(
  {
    reporter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reportedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reportedTask: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    reportedMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Chat.messages',
    },
    type: {
      type: String,
      enum: ['user', 'task', 'message'],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved', 'dismissed'],
      default: 'pending',
    },
    adminNotes: {
      type: String,
    },
    resolvedAt: {
      type: Date,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
reportSchema.index({ reporter: 1 });
reportSchema.index({ reportedUser: 1 });
reportSchema.index({ reportedTask: 1 });
reportSchema.index({ reportedMessage: 1 });
reportSchema.index({ type: 1 });
reportSchema.index({ status: 1 });
reportSchema.index({ createdAt: 1 });

// Validate that at least one reported entity is provided
reportSchema.pre('save', function(next) {
  if (!this.reportedUser && !this.reportedTask && !this.reportedMessage) {
    next(new Error('At least one reported entity must be provided'));
  }
  next();
});

export const Report = mongoose.model<IReport>('Report', reportSchema); 