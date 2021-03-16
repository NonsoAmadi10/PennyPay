interface IUser {
  fullname: string;
  email: string;
  password: string;
  bvn: string;
  validatePassword(password: string): boolean;
}

export { IUser };