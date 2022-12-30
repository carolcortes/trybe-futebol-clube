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

  public finish = async (id: number) => {
    const match = await Match.findOne({ where: { id } });
    if (!match) return { status: 404, message: 'Match not found' };

    await Match.update({ inProgress: false }, { where: { id } });
    return { status: 200, message: 'Finished' };
  };
}

export default MatchesService;
