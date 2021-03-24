import mongoose, { Schema, HookNextFunction } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser} from '../Interfaces'

const HASH_ROUNDS = 10;



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

  username: {
    type: String,
    unique:true
  }

  password: {
    type: String,
    required: true,
  },

  bvn: {
    type: String,
    unique: true
  },

  isVerified: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

userSchema.pre<IUser>("save", async function ( this:IUser, next:HookNextFunction){
  const thisObj = this ;

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
  let user = <IUser>this;
  return bcrypt.compare(pass, user.password);
};


export default mongoose.model<IUser>('User', userSchema);