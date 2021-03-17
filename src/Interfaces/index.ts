import { Decimal128, Document, Number } from "mongoose";

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

export { IUser, IWallet };