import { User, Wallet } from '../models';
import { Request, Response } from 'express';
import { IRequest, IResponse, IUser } from '../Interfaces';
import { Authentication, SendMail, Helper } from '../utils';



/**
 * Class representing the user controller
 * @class UserController
 * @description users controller
 */
class UserController{

     /**
   * This method creates a temporary token and then
   * sends an email to the user.
   * @param {object} userExist - An object containing details of the
   * user we want to send an email to.
   * @returns {boolean} isEmailSent - Tells if email was actually sent
   */
  private static async createTokenAndSendEmail(userExist:any){
    const tokenCreated = await Authentication.getToken(userExist, '1h');
    if (tokenCreated) {
      const isEmailSent = await SendMail.verifyEmail(userExist.email, userExist.fullname, tokenCreated);
      return isEmailSent;
    }

  }


  /**
   * Sign up a user
   * Route: POST: /auth/signup
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof UserController
   */

  public static async register(req:Request, res:Response): Promise<Response> {
    
    const { body } = req;
    const { email, password, fullname, username } = body;

    const findUser = await User.findOne({ email, username });

    try {
      if (findUser) {
        if (!findUser.isVerified) {
          const isEmailSent = await UserController.createTokenAndSendEmail(findUser);
          if (isEmailSent) {
            return Helper.requestSuccessful(res, {
              message: 'You had started the registration '
                + 'process earlier. '
                + 'An email has been sent to your email address. '
                + 'Please check your email to complete your registration.'
            }, 200)
          }
  
          return Helper
          .serverError(res, 'Your registration could not be completed.'
            + ' Please try again');
  
        }
  
        if (findUser.isVerified) {
          return Helper.requestSuccessful(res,{
            message: 'You are a registered user on '
              + 'this platform. Please proceed to login'
          }, 200)
        }
      }
  
      const userCreated = await User.create({ email, fullname, password, username });
  
      if (userCreated && userCreated._id) {
        const isEmailSent = await UserController.createTokenAndSendEmail(userCreated);
        if (isEmailSent) {
          return Helper.requestSuccessful(res, {
            success: true,
            message: 'An email has been sent to your '
            + 'email address. Please check your email to complete '
            + 'your registration'
          }, 200)
        }
      }

      return Helper.serverError(res, 'Your registration could not be completed.'
        + 'Please try again');
    } catch (err) {
      return Helper.serverError(res, err);
    }
    
  }


    /**
   * Verify a user's email
   * Route: POST: /auth/verify_email
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof UserController
   */

  public static async verifyEmail(req: IRequest, res: Response):Promise<Response> {
    try {
      const findUser = await User.findOneAndUpdate({ _id: req.decoded.id }, { isVerified: true }, {new:true});
      if (findUser) {
        const createWallet = await Wallet.create({ balance: 0.0, user: findUser._id });
          const isEmailSent = await SendMail.confirmRegistrationComplete(findUser.email);
          if (isEmailSent) {
            const createToken = await Authentication.getToken(findUser);
            const payload = {
              success: true,
              message: `User ${findUser.fullname} created successfully`,
              token: createToken,
              wallet: createWallet
            }
            return Helper.requestSuccessful(res, payload, 201);
          }
      }
      
      return Helper
        .serverError(res, 'Could not complete your registration. '
          + 'Please re-register.');
    } catch (error) {
      return Helper.serverError(res, error);
      }
  }
  


  
  /**
   * Login a user
   * Route: POST: /auth/login
   * @param {object} req - HTTP Request object
   * @param {object} res - HTTP Response object
   * @return {res} res - HTTP Response object
   * @memberof UserController
   */
   public static async login(req:Request, res:Response) {
    try {
      const {
        email,
        password
      } = req.body;
      const userFound = await User.findOne({email});
      if (!userFound) {
        return Helper.clientError(res, 'Email or password does not exist', 400);
      }
      if (!userFound.isVerified) {
        return Helper.clientError(res, {
          success: false,
          message: 'You had started the registration process already. '
            + 'Please check your email to complete your registration.'
        }, 400);
      }
      const isPasswordValid = await userFound.validatePassword(password);
      if (userFound && isPasswordValid) {
        const tokenCreated = await Authentication.getToken({
          id: userFound._id,
          fullname: userFound.fullname,
          email: userFound.email,
          username: userFound.username
        });
        if (tokenCreated) {
          const userDetails = {
            id: userFound._id,
            token: tokenCreated,
          };
          return Helper.requestSuccessful(res, {
            success: true,
            message: 'Login successful',
            userDetails,
          }, 200);
        }
        return Helper.serverError(res);
      }
      return Helper.clientError(res, 'Email or password does not exist', 400);
    } catch (error) {
      return Helper.serverError(res);
    }
  }

  public static async getUserInfo(req: IRequest, res: IResponse): Promise<IResponse> {

    const { id } = req.decoded;
    try {
      const findUser:IUser | any = await User.findById(id);
      const userInfo:any = {
        email: findUser.email,
        bvn: findUser.bvn,
        fullname: findUser.fullname,
        isVerified: findUser.isVerified,
        username: findUser.username
      }
      if (findUser) {
        return Helper.requestSuccessful(res, userInfo, 200);
      }
      return Helper.clientError(res, 'User does not exist', 200)
     } catch (error) {
      return Helper.serverError(res);
    }
    
  }

}

export default UserController;