import { Authentication, Helper } from '../utils';
import { NextFunction } from 'express';
import { IRequest, IResponse } from '../Interfaces'

/**
 * Class representing the Authentication methods
 * @class Authorization
 * @description Authenticate protected routes
 */
class Authorization {
  /**
   *
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @param {callback} next - The callback that passes the request
   * to the next handler
   * @returns {callback} next - The callback that passes the request
   * to the next handler
   * @returns {object} res - Response object containing an error due
   * to invalid token or no token in the request
   */
  static async checkToken(req:IRequest, res:IResponse, next:NextFunction) {
    const token = req.headers['x-access-token'] || req.query.token || req.body.token;
    if (!token) return Helper.clientError(res, 'User not authorized', 401);
    const verifiedToken = await Authentication.verifyToken(token);
    if (!verifiedToken.success) {
      return Helper.clientError(res, 'User not authorized', 401);
    }
    req.decoded = verifiedToken;
    next();
  }
}

export default Authorization;