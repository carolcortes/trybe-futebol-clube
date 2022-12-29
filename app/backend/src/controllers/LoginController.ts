import { Request, Response } from 'express';
import Token from '../auth/token';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private loginService: LoginService = new LoginService()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { result, status } = await this.loginService.login(email, password);

      if (status !== 200) return res.status(status).json({ message: result });

      return res.status(status).json({ token: result });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  public async validate(req: Request, res: Response) {
    const { authorization } = req.headers;

    const email = Token.verify(authorization as string);

    const { result, status } = await this.loginService.validate(email as string);

    if (status !== 200) return res.status(status as number).json({ message: result });

    res.status(status).json({ role: result });
  }
}

export default LoginController;
