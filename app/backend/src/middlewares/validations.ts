import { NextFunction, Request, Response } from 'express';
import Token from '../auth/token';

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  return next();
};

export const newMatchValidation = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = req.body;

  if (!homeTeam || !homeTeamGoals || !awayTeam || !awayTeamGoals) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (homeTeam === awayTeam) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams',
    });
  }

  if (!authorization) return res.status(401).json({ message: 'Token must be provided' });
  const validToken = Token.verify(authorization as string);
  if (!validToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
};
