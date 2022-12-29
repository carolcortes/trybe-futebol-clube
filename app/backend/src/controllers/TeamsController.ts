import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

class TeamsController {
  constructor(private teamsService: TeamsService = new TeamsService()) {}

  public async getAll(_req: Request, res: Response) {
    try {
      const teams = await this.teamsService.getAll();

      return res.status(200).json(teams);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const team = await this.teamsService.getById(Number(id));

      return res.status(200).json(team);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}

export default TeamsController;
