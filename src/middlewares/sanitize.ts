import Validator from '../validation';
import { NextFunction, Request, Response } from 'express';
import { IRequest, IResponse } from '../Interfaces';




/**
 * Class representing the user controller
 * @class SanitizerController
 * @description Sanitize Request Body
 */


class Sanitize {

  public static signupSanitizer(req:Request, res:Response, next:NextFunction) {
    const {
      fullname,  password, email,  confirmPassword,
    } = req.body;
    const response = (error:any) => res.status(400).send({ status: 'error', error });

    if (Validator.checkEmpty(email)) return response('email cannot be empty');
    if (Validator.checkEmpty(fullname)) return response('fullname cannot be empty');
    if (Validator.checkEmpty(password)) return response('password cannot be empty');
    if (Validator.checkEmpty(confirmPassword)) return response('confirm password cannot be empty');
    if (!Validator.isMatchingPassword(password, confirmPassword)) return response('Passwords do not match')
    if (!Validator.isEmail(email)) return response('invalid email');
    if (Validator.isValidParamsLength(fullname, 2)) return response('firstname field must be atleast two characters long');
    if (Validator.isValidParamsLength(fullname, 2)) return response('lastname field must be atleast two characters long');
    if (Validator.isValidParamsLength(password, 5)) return response('password field must be greater than five characters');
    if (Validator.containsNumber(fullname)) return response('firstname cannot  contain number');

    return next();
  }

  public static signinSanitizer(req:Request, res:Response, next:NextFunction) {
    const {
      password, email,
    } = req.body;
    const response = (error:any) => res.status(400).send({ status: 'error', error });
    if (Validator.checkEmpty(email)) return response('email field cannot be empty');
    if (Validator.checkEmpty(password)) return response('password field cannot be empty');
    if (!Validator.isEmail(email)) return response('invalid email');

    return next();
  }

  public static async walletSanitizer(req: IRequest, res: IResponse, next: NextFunction) {
    const { amount } = req.body;
    const response = (error: any) => res.status(400).send({ status: 'error', error });
    
    if (Validator.checkEmpty(amount)) return response('Your are missing the amount field');
    if (!Validator.itsaNumber(amount)) return response('amount field must be of a number type');
    
    return next();
  }

  public static async p2pSanitizer(req: IRequest, res: IResponse, next: NextFunction) {
    const { amount, username } = req.body;
    const response = (error: any) => res.status(400).send({ status: 'error', error });
    
    if (Validator.checkEmpty(username)) return response('Your are missing the username field');
    if (Validator.checkEmpty(amount)) return response('Your are missing the amount field');
    if (!Validator.itsaNumber(amount)) return response('amount field must be of a number type');
    
    return next();
  }


}

export default Sanitize;