import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(
    private leaderboardService: LeaderboardService = new LeaderboardService(),
  ) {}

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await this.leaderboardService.getAll();

      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }

  public async getFilteredTeams(req: Request, res: Response, next: NextFunction) {
    const filter = req.url.split('/')[1];
    try {
      const leaderboard = await this.leaderboardService.getFilteredTeams(filter);

      return res.status(200).json(leaderboard);
    } catch (err) {
      next(err);
    }
  }
}

export default LeaderboardController;
