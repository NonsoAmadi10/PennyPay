import {  Document } from "mongoose";

interface IUser extends Document{
  fullname: string;
  email: string;
  password: string;
  bvn: string;
  isVerified: boolean;
  validatePassword(password: string): boolean;
}

interface IWallet extends Document {
  balance: number;
  user: string;
}

enum TransactionType {
  debit,
  credit
}

enum Purpose {
  deposit,
  transfer,
  bills
}
interface ITransaction extends Document {
  txn_type: TransactionType;
  purpose: Purpose,
  amount: number;
  reference: string;
  preBalance: number;
  postBalance: number;

}

export { IUser, IWallet, ITransaction };