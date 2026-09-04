
import mongoose, { Model, Schema, Document } from 'mongoose';

export interface IPasswordResetToken extends Document {
  email: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}


export type IPasswordResetTokenModel = Model<IPasswordResetToken>

const passwordResetTokenSchema = new Schema<IPasswordResetToken, IPasswordResetTokenModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    token: {
      type: String,
      required: [true, 'Token is required'],
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: [true, 'Expiration date is required'],
      index: { expires: '1h' }, // Auto delete after 1 hour
    },
    used: {
      type: Boolean,
      default: false,
      index: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, // Prevents modification after creation
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    // Optional: Add toJSON transform to remove sensitive data
    toJSON: {
      transform: (_, ret) => {
        delete (ret as { __v?: unknown }).__v;
        return ret;
      },
    },
  }
);

// Compound index for faster queries when checking tokens
passwordResetTokenSchema.index({ email: 1, used: 1 });
passwordResetTokenSchema.index({ token: 1, used: 1 });

// Pre-save middleware to ensure expiresAt is set
passwordResetTokenSchema.pre('save', function(next) {
  if (!this.expiresAt) {
    // Set expiration to 1 hour from now if not set
    this.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  }
  next();
});

// Static method to check if token is expired
passwordResetTokenSchema.methods.isExpired = function(): boolean {
  return new Date() > this.expiresAt || this.used;
};

// Static method to find valid token
passwordResetTokenSchema.statics.findValidToken = async function(
  token: string
): Promise<IPasswordResetToken | null> {
  return this.findOne({
    token,
    used: false,
    expiresAt: { $gt: new Date() },
  });
};

// Delete expired tokens periodically (optional)
passwordResetTokenSchema.statics.cleanupExpired = async function() {
  const result = await this.deleteMany({
    expiresAt: { $lt: new Date() },
  });
  return result;
};

// Export the model with type safety
const PasswordResetToken = mongoose.models.PasswordResetToken as
  | IPasswordResetTokenModel
  | undefined;

export default (PasswordResetToken ||
  mongoose.model<IPasswordResetToken, IPasswordResetTokenModel>(
    'PasswordResetToken',
    passwordResetTokenSchema
  )) as IPasswordResetTokenModel;