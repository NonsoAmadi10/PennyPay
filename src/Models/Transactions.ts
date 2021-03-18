import { v4 } from 'uuid';
import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '../Interfaces'

const transactionSchema = new Schema({
  txn_type: {
    type: String,
    required: true,
    enum: ['debit', 'credit']
  },

  purpose: {
    type: String,
    required: true,
    enum: ['deposit', 'transfer', 'bills']
  },

  amount: {
    type: Schema.Types.Decimal128
  },

  reference: {
    type: String,
    default: v4(),
    unique: true
  },

  preBalance: {
    type: Schema.Types.Decimal128,
    required: true
  },

  postBalance: {
    type: Schema.Types.Decimal128,
    required: true
  }
});


const decimal2JSON = (v:any, i?:any, prev?:any) => {
  if (v !== null && typeof v === 'object') {
    if (v.constructor.name === 'Decimal128')
      prev[i] = v.toString();
    else
      Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
  }
};

transactionSchema.set('toJSON', {
  transform: (doc:any, ret:any) => {
    decimal2JSON(ret);
    return ret;
  }
});


export default mongoose.model<ITransaction>('Transaction', transactionSchema);