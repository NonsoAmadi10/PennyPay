import { IRequest, IResponse } from '../Interfaces'
import { Wallet } from '../models';
import { Helper } from '../utils'
import { debitAccount, creditAccount } from '../helpers';


/**
 * Class representing the Wallet controller
 * @class WalletController
 * @description wallet controller
 */
class WalletController{

  public static async getWallet(req:IRequest, res:IResponse):Promise<IResponse>{
    const { id } = req.params;
    try {
      const getMyWallet = await Wallet.findOne({ _id: id, user: req.decoded.id }).lean();
      if (getMyWallet) {
        const data = getMyWallet;
        return Helper.requestSuccessful(res, data , 200);
      }

      return Helper.clientError(res, 'Wallet does not exist', 400);
    } catch (err) {
      return Helper.serverError(res);
    }
  }


  public static async fundWallet(req:IRequest, res: IResponse){
    const { id, amount, user } = { id: req.params.id, amount: req.body.amount, user: req.decoded };
    
    try {
      const findWallet = await Wallet.findOne({ _id: id, user: user.id });

      if (findWallet) {
        const creditWallet = await creditAccount(findWallet, amount, 'deposit');
        if (!creditWallet.success) {
          return Helper.clientError(res, creditWallet, 400);
        }

        return Helper.requestSuccessful(res, creditWallet, 200);
      }

      return Helper.clientError(res, 'Wallet does not exist', 400)

    } catch (err) {
      return Helper.serverError(res)
    }
  }

  public static async withdrawFund(req: IRequest, res: IResponse): Promise<IResponse> {
    const { id, amount, user } = { id: req.params.id, amount: req.body.amount, user: req.decoded };
    
    try {
      
      const findWallet = await Wallet.findOne({ _id: id, user: user.id });

      if (findWallet) {
        const debitWallet = await debitAccount(findWallet, amount, 'withdrawal');
        if (!debitWallet.success) {
          return Helper.clientError(res, debitWallet, 400);
        }

        return Helper.requestSuccessful(res, debitWallet, 200);
      }

      return Helper.clientError(res, 'Wallet does not exist', 400)

    } catch (error) {
      return Helper.serverError(res)
    }
  }

}


export default WalletController;