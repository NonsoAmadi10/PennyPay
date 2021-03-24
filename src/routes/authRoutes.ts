import { UserController } from '../controllers';
import { Express } from 'express';
import Authorization from '../middlewares/authorization';
import Sanitize from '../middlewares/sanitize';


const authRoutes = (app: Express) => {
  
  app.post('/api/auth/signup',
    Sanitize.signupSanitizer,
    UserController.register
  );

  app.get('/api/auth/verify_email',
    Authorization.checkToken,
    UserController.verifyEmail
  );

  app.post('/api/auth/signin',
    Sanitize.signinSanitizer,
  UserController.login
  )

  app.get('/api/user/profile',
  Authorization.checkToken,
  UserController.getUserInfo
  )
}


export default authRoutes;