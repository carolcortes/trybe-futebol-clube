import Team from '../database/models/Team';
import Match from '../database/models/Match';
import INewMatch from '../database/interfaces';

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

  public create = async (body: INewMatch) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = body;

    const newMatch = await Match.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress: true,
    });

    return newMatch;
  };
}

export default MatchesService;
