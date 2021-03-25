import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SALT: any = process.env.JWT_SECRET;

/**
 * scrambles string data
 * @param {String} token - input string data
 * @returns {String} - scrambled data
 */
const shuffleToken = (token:string): string => token
  .split('').reverse().join('');

/**
 * Class representing the Authentication methods
 * @class Authentication
 * @description Authentication class methods
 */
class Authentication {
  /**
   * creates a user token
   * @param {object} payload - contains id, role username and hashedPassword
   * @param {integer} expiresIn - Time in seconds
   * @returns {string} - returns a jwt token
   */
  public static async getToken(payload:any, expiresIn = '24h') {
    const token = jwt.sign({
      id: payload.id,
      email: payload.email,
      username: payload.username,
      fullname: payload.fullname,
    }, SALT, {
      expiresIn
    });
    const scrambledToken = shuffleToken(token);
    return scrambledToken;
  }

  /**
   * verify a token's validity
   * @param {string} token - token input
   * @returns {req} - populate the request with the decrypted content
   */
  public static async verifyToken(token:string): Promise<any>{
    const reshuffledToken = shuffleToken(token);
    let output:any = {};
    return jwt.verify(
      reshuffledToken, SALT, (err:any, decoded:any) => {
        if (err) {
          output = {
            Error: 'Failed to authenticate token',
            success: false
          };
        } else {
          output = {
            success: true,
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
            fullname: decoded.fullname,
          };
        }
        return output;
      }
    );
  }
}

export default Authentication;