import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import MatchesService from '../services/MatchesService';

class MatchesController {
  constructor(
    private matchesService: MatchesService = new MatchesService(),
    private teamsService: TeamsService = new TeamsService(),
  ) {}

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    try {
      if (inProgress === 'true' || inProgress === 'false') {
        const inProgressMatches = await this.matchesService.getByProgress(inProgress as string);

        return res.status(200).json(inProgressMatches);
      }

      const matches = await this.matchesService.getAll();
      return res.status(200).json(matches);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  public async create(req: Request, res: Response) {
    const { homeTeam, awayTeam } = req.body;
    try {
      const findHomeTeam = await this.teamsService.getById(Number(homeTeam));
      const findAwayTeam = await this.teamsService.getById(Number(awayTeam));

      if (!findHomeTeam || !findAwayTeam) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      const newMatch = await this.matchesService.create(req.body);
      return res.status(201).json(newMatch);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  public async finish(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const { status, message } = await this.matchesService.finish(Number(id));

      return res.status(status).json({ message });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
}

export default MatchesController;
