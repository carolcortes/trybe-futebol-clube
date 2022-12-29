import { Request, Response } from 'express';
import Token from '../auth/token';
import LoginService from '../services/LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginService = new LoginService();

    try {
      const { result, status } = await loginService.login(email, password);

      if (status !== 200) return res.status(status).json({ message: result });

      return res.status(status).json({ token: result });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  static async validate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const loginService = new LoginService();

    const email = Token.verify(authorization as string);

    const { result, status } = await loginService.validate(email as string);

    if (status !== 200) return res.status(status as number).json({ message: result });

    res.status(status).json({ role: result });
  }
}

export default LoginController;
