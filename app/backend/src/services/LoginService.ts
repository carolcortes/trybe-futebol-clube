import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import Token from '../auth/token';

class LoginService {
  public userModel = User;

  public login = async (email: string, password: string) => {
    const user = await User.findOne({ where: { email } });
    if (!user) return { status: 401, result: 'Incorrect email or password' };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return { status: 401, result: 'Incorrect email or password' };

    return { status: 200, result: Token.create(user.email) };
  };

  public validate = async (email: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) return { status: 404, result: 'User not found' };

    return { status: 200, result: user.role };
  };
}

export default LoginService;
