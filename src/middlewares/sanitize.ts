import Validator from '../validation';
import { NextFunction, Request, Response } from 'express';




/**
 * Class representing the user controller
 * @class SanitizerController
 * @description Sanitize Request Body
 */


class Sanitize {

  static signupSanitizer(req:Request, res:Response, next:NextFunction) {
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
    if (Validator.isValidParamsLength(fullname, 2)) return response('firstname must be atleast two characters long');
    if (Validator.isValidParamsLength(fullname, 2)) return response('lastname must be atleast two characters long');
    if (Validator.isValidParamsLength(password, 5)) return response('password must be greater than five characters');
    if (Validator.containsNumber(fullname)) return response('firstname cannot  contain number');

    return next();
  }
}

export default Sanitize;