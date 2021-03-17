import User from '../models/Users';
import { Request, Response } from 'express';
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
    const { email, password, fullname } = body;

    const findUser = await User.findOne({ email });

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
  
      const userCreated = await User.create({ email, fullname, password });
  
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
}