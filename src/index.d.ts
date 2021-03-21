import {IUser} from './Interfaces'

declare global{
  namespace Express {
      interface Request {
          decoded?: IUser
      }
  }
}
