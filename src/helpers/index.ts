import { Wallet, Transaction } from '../models';
import { IWallet } from '../Interfaces';
import { v4 } from 'uuid';

const creditAccount = async (wallet: IWallet, amount: Number, purpose: string, ...rest:any| null) => {
  

  try {
    const newBalance = Number(wallet.balance) + Number(amount);
    const updateBalance = await Wallet.findByIdAndUpdate(wallet._id, { balance: newBalance }, {new:true});
  

    
    
    await Transaction.create({
      amount: String(amount.toFixed(2)),
      txn_type: 'credit',
      purpose,
      reference: v4(),
      preBalance: wallet.balance,
      postBalance: newBalance,
      ...rest
    });

    return {
      success: true,
      message: 'Credit Successful!',
      wallet: updateBalance
    }

  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: 'An error occured, please try again'
    }
  }
  
}


const debitAccount = async (wallet: IWallet, amount: Number, purpose: string, ...rest:any | null) => {
  try {

    if (Number(amount) < Number(wallet.balance.toFixed(2))) {
      const newBalance = Number(wallet.balance) - Number(amount);
      const updateBalance = await Wallet.findByIdAndUpdate(wallet._id, { balance: newBalance }, { new: true});
    
      await Transaction.create({
        amount: String(amount.toFixed(2)),
        txn_type: 'debit',
        purpose,
        reference: v4(),
        preBalance: wallet.balance,
        postBalance: newBalance,
        ...rest
      });

      return {
        success: true,
        message: 'Debit Successful!',
        wallet: updateBalance
      }
    }

    return {
      success: false,
      error: 'insufficient balance'
    }

  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: 'An error occured, Please try again!'
    }
    }
}

export { debitAccount, creditAccount };