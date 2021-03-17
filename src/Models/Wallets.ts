import mongoose, { Schema } from 'mongoose';
import { IWallet} from '../Interfaces';

const walletSchema = new Schema({
  balance: {
    type: Schema.Types.Decimal128,
    default: 0.0
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

export default mongoose.model<IWallet>('Wallet', walletSchema);