import { Wallet, Transaction } from '../models';

const creditAccount = async (wallet_id: string, amount: Number, purpose: string) => {
  

  try {

    const findWallet = await Wallet.findById(wallet_id);
  
  if (!findWallet) {
    return {
      success: false,
      error: 'Wallet does not exist'
    }
    }
    
    const updateBalance = await findWallet.updateOne({ $inc: { balance: amount.toFixed(2) } });
    
    await Transaction.create({
      amount: String(amount.toFixed(2)),
      txn_type: 'debit',
      purpose,
      preBalance: findWallet.balance,
      postBalance: updateBalance.balance
    });

    return {
      success: true,
      message: 'Credit Successful!',
      wallet: updateBalance
    }

   } catch (err) {
    return {
      success: false,
      error: 'An error occured, please try again'
    }
  }
  
}


const debitAccount = async (wallet_id: string, amount: Number, purpose: string) => {
  try {

    const findWallet = await Wallet.findById(wallet_id);
  
  if (!findWallet) {
    return {
      success: false,
      error: 'Wallet does not exist'
    }
    }

    const updateBalance = await findWallet.updateOne({ $inc: { balance: - amount.toFixed(2) } });
    
    await Transaction.create({
      amount: String(amount.toFixed(2)),
      txn_type: 'debit',
      purpose,
      preBalance: findWallet.balance,
      postBalance: updateBalance.balance
    });

    return {
      success: true,
      message: 'Debit Successful!',
      wallet: updateBalance
    }

   } catch (err) {
    return {
      success: false,
      error: 'Wallet does not exist'
    }
    }
}

export { debitAccount, creditAccount };