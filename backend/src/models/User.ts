import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  isPro: boolean;
  generationsCount: number;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPro: { type: Boolean, default: false },
    generationsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password || '', salt);
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password || '');
};

const User = mongoose.model<IUser>('User', userSchema);
export default User;
