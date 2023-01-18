import { NextFunction, Request, Response } from 'express';
import Token from '../auth/token';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private loginService: LoginService = new LoginService()) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const { result, status } = await this.loginService.login(email, password);

      if (status !== 200) return res.status(status).json({ message: result });

      return res.status(status).json({ token: result });
    } catch (err) {
      next(err);
    }
  }

  public async validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    try {
      const email = Token.verify(authorization as string);

      const { result, status } = await this.loginService.validate(email as string);
      if (status !== 200) return res.status(status as number).json({ message: result });

      return res.status(status).json({ role: result });
    } catch (err) {
      next(err);
    }
  }
}

export default LoginController;
