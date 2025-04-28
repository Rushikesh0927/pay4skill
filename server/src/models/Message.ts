import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  task?: mongoose.Types.ObjectId;
  content: string;
  attachments?: string[];
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    attachments: [{
      type: String,
      trim: true,
    }],
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient querying
messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ task: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ read: 1 });

// Ensure sender and receiver are different users
messageSchema.pre('save', function(next) {
  if (this.sender.toString() === this.receiver.toString()) {
    next(new Error('Cannot send message to yourself'));
  }
  next();
});

export const Message = mongoose.model<IMessage>('Message', messageSchema); 