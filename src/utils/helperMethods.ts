import { NextFunction, Request, Response } from 'express';

/**
 * Class representing the helper methods
 * @class HelperMethods
 * @description methods used everywhere in the codebase
 */
 class HelperMethods {
  /**
   * A method used to send server errors
   * @param {object} res - HTTP response object
   * @param {String} message - The error message you want to set.
   * @returns {object} res - The HTTP response object
   */
  public static serverError(res: Response, message:string = 'Internal server error') {
    return res.status(500).json({
      success: false,
      message
    });
  }

  /**
   * A method used to send client-side errors
   * @param {object} res - HTTP response object
   * @param {String} message - The error message you want to set.
   * @param {number} status = Status code of the client error
   * @returns {object} res - The HTTP response object
   */
  public static clientError(res:Response, message:string | object, status = 400) {
    return res.status(status).json({
      success: false,
      message,
    });
  }

  /**
   * A method used to confirm that a request was successful
   * @param {object} res - HTTP response object
   * @param {object} payload - data we want to send to the front-end
   * @param {number} status = Status code of the successful request
   * @returns {object} res - HTTP response object
   */
  public static requestSuccessful(res:Response, payload:object, status = 200) {
    return res.status(status).json({ data: { ...payload } });
  }

  /* eslint-enable no-useless-escape */
  /**
   * @param {object} err - error object
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request to the next handler
   * @returns {object} res - Response object when query is invalid
   * @memberof Validate
   */
  public static checkExpressErrors(err:any, req:Request, res:Response, next:NextFunction) {
    res.status(500).json({
      message: 'Something failed',
      success: false
    });
    next();
  }

  
}

export default HelperMethods;