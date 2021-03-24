import { WalletsController } from '../controllers';
import Sanitizer from '../middlewares/sanitize';

import Authorization from '../middlewares/authorization';
import WalletController from '../controllers/WalletsController';


const walletRoute = (app:any) => {
  
  app.get(
    '/api/v1/wallet/:id',
    
    Authorization.checkToken,
  
    WalletsController.getWallet
  );

  app.patch('/api/v1/wallet/fund/:id',
    Authorization.checkToken,
    Sanitizer.walletSanitizer,
    WalletController.fundWallet
  )
  
  app.patch('/api/v1/wallet/withdraw/:id',
    Authorization.checkToken,
    Sanitizer.walletSanitizer,
    WalletController.withdrawFund
  )

  app.post('/api/v1/wallet/transfer/p2p',
  
    WalletController.peerTopeer
  )
}

export default walletRoute;