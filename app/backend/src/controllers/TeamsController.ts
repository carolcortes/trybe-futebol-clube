import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) {}

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.teamsService.getAll();

      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const team = await this.teamsService.getById(Number(id));

      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}

export default TeamsController;
