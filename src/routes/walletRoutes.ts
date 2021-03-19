import { WalletsController } from '../controllers';
import { Express } from 'express';
import Authorization from '../middlewares/authorization';


const walletRoute = (app: Express) => {
  
  app.get(
    '/api/v1/wallet/:id',
    
    Authorization.checkToken,
  
    WalletsController.getWallet
  );

}

export default walletRoute;