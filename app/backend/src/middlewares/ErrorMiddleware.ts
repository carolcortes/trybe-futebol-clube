import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/HttpException';

class ErrorMiddleware {
  static handler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { status, message } = error as HttpException;
    return res.status(status).send({ message });
  }
}

export default ErrorMiddleware;
