import { Response } from 'express';
import { Wallet } from '../models';
import { Helper } from '../utils'
import { debitAccount, creditAccount } from '../helpers';


/**
 * Class representing the Wallet controller
 * @class WalletController
 * @description wallet controller
 */
class WalletController{

  public static async getWallet(req:any, res:Response):Promise<Response>{
    const { id } = req.params;
    try {
      const getMyWallet = await Wallet.findOne({ _id: id, user: req.decoded.id }).lean();
      if (getMyWallet) {
        const data = getMyWallet;
        return Helper.requestSuccessful(res, data , 200);
      }

      return Helper.clientError(res, 'Wallet does not exist', 400);
    } catch (err) {
      return Helper.serverError(res)
    }
  }

}


export default WalletController;