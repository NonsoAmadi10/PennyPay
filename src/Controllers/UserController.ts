import User from '../models/Users';

class UserController{

  public static async register(req, res) {
    
    const { body } = req;
    const { email, password, fullname } = body;

    const findUser = await User.findOne({ email });
    
  }
}