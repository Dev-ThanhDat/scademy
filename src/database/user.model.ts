import { EUserRole } from '@/types/enums';
import { Document, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  clerkId: string;
  avatar: string;
  username: string;
  email: string;
  courses: Schema.Types.ObjectId[];
  role: EUserRole;
  created_at: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String
  },
  avatar: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
