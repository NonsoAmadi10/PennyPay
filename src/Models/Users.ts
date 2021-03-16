import mongoose, { Schema, Document, Model, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser} from '../Interfaces'

const HASH_ROUNDS = 10;

interface Iuser extends IUser, Document {}

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },

  bvn: {
    type: String,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre<Iuser>("save", async (next:HookNextFunction) => {
  const thisObj = this as unknown as Iuser;

  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    thisObj.password = await bcrypt.hash(thisObj.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

userSchema.methods.validatePassword = async function (pass: string) {
  return bcrypt.compare(pass, this.password);
};


export default mongoose.model<Iuser>('User', userSchema);