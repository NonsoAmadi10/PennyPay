import { Document } from "mongoose";

interface IUser extends Document{
  fullname: string;
  email: string;
  password: string;
  bvn: string;
  isVerified: boolean;
  validatePassword(password: string): boolean;
}

export { IUser };