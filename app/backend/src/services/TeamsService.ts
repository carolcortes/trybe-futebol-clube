import Team from '../database/models/Team';

class TeamsService {
  public getAll = async () => {
    const teams = await Team.findAll();
    return teams;
  };

  public getById = async (id: number) => {
    const team = await Team.findOne({ where: { id } });
    return team;
  };
}

export default TeamsService;
