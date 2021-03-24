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
    enum: ['deposit', 'transfer', 'bills', 'withdrawal', 'p2p']
  },

  amount: {
    type: String
  },

  receipient: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  reference: {
    type: String,
    default: v4(),
    unique: true
  },

  preBalance: {
    type: Number,
    required: true
  },

  postBalance: {
    type: Number,
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {timestamps:true});






export default mongoose.model<ITransaction>('Transaction', transactionSchema);