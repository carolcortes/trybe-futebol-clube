import Team from '../database/models/Team';
import Match from '../database/models/Match';

class MatchesService {
  public getAll = async () => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });

    return matches;
  };

  public getByProgress = async (inProgress: string) => {
    const matches = await Match.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: Team, as: 'teamHome' },
        { model: Team, as: 'teamAway' },
      ],
    });

    return matches;
  };
}

export default MatchesService;
