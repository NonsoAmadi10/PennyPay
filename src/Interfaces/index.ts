import {  Document } from "mongoose";
import { Request, Response } from 'express';



interface IRequest extends Request {
  decoded?: any
}

interface IResponse extends Response {}



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
  preBalance: string;
  postBalance: string;
  user: any;

}



export { IUser, IWallet, ITransaction, IRequest, IResponse };