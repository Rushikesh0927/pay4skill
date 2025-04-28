import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'student' | 'employer' | 'admin';
  profile: {
    bio?: string;
    skills?: string[];
    location?: string;
    education?: Array<{
      institution: string;
      degree: string;
      field: string;
      startDate: Date;
      endDate?: Date;
    }>;
    experience?: Array<{
      company: string;
      position: string;
      startDate: Date;
      endDate?: Date;
      description?: string;
    }>;
    resumeUrl?: string;
    avatar?: string;
  };
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    role: {
      type: String,
      enum: ['student', 'employer', 'admin'],
      required: true,
    },
    profile: {
      bio: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
      skills: [{
        type: String,
        trim: true,
      }],
      location: {
        type: String,
        trim: true,
      },
      education: [{
        institution: {
          type: String,
          required: true,
          trim: true,
        },
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        field: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date,
      }],
      experience: [{
        company: {
          type: String,
          required: true,
          trim: true,
        },
        position: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date,
        description: {
          type: String,
          trim: true,
          maxlength: 1000,
        },
      }],
      resumeUrl: {
        type: String,
        trim: true,
      },
      avatar: {
        type: String,
        trim: true,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Create indexes
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'profile.skills': 1 });
userSchema.index({ 'profile.location': 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export const User = mongoose.model<IUser>('User', userSchema); 