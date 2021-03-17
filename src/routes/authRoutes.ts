import { UserController } from '../controllers';
import { Express } from 'express';
import Sanitize from '../middlewares/sanitize';


const authRoutes = (app: Express) => (
  
  app.post('/api/auth/signup',
    Sanitize.signupSanitizer,
   UserController.register
  )
)


export default authRoutes;