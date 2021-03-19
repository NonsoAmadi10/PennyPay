import mongoose, { Schema } from 'mongoose';
import { IWallet} from '../Interfaces';

const walletSchema = new Schema({
  balance: {
    type: Number,
    default: 0
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{ timestamps: true});

const decimal2JSON = (v:any, i?:any, prev?:any) => {
  if (v !== null && typeof v === 'object') {
    if (v.constructor.name === 'Decimal128')
      prev[i] = v.toString();
    else
      Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
  }
};

walletSchema.set('toJSON', {
  transform: (doc:any, ret:any) => {
    decimal2JSON(ret);
    return ret;
  }
});

export default mongoose.model<IWallet>('Wallet', walletSchema);