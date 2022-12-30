import { NextFunction, Request, Response } from 'express';

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

  return next();
};

export const newMatchValidation = (req: Request, res: Response, next: NextFunction) => {
  const {
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
  } = req.body;

  if (!homeTeam || !homeTeamGoals || !awayTeam || !awayTeamGoals) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  return next();
};
