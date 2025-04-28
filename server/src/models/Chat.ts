import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: Date;
}

export interface IChat extends Document {
  participants: mongoose.Types.ObjectId[];
  task?: mongoose.Types.ObjectId;
  messages: IMessage[];
  lastMessage?: IMessage;
  isActive: boolean;
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
    content: {
      type: String,
      required: true,
    },
    attachments: [{
      type: String,
    }],
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new Schema<IChat>(
  {
    participants: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }],
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    messages: [messageSchema],
    lastMessage: {
      type: messageSchema,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
chatSchema.index({ participants: 1 });
chatSchema.index({ task: 1 });
chatSchema.index({ 'messages.createdAt': 1 });
chatSchema.index({ isActive: 1 });

// Update lastMessage when a new message is added
chatSchema.pre('save', function(next) {
  if (this.messages.length > 0) {
    this.lastMessage = this.messages[this.messages.length - 1];
  }
  next();
});

export const Chat = mongoose.model<IChat>('Chat', chatSchema); 