import { ILeaderboard } from '../database/interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class LeaderboardService {
  public leaderboardTeams: ILeaderboard[] = [];

  private setGamePoints = (teamIndex: number, currentTeam: string, match: Match) => {
    const team = this.leaderboardTeams[teamIndex];
    const opositeTeam = currentTeam === 'homeTeam' ? 'awayTeam' : 'homeTeam';
    const currentTeamGoals = match.dataValues[`${currentTeam}Goals`];
    const opositeTeamGoals = match.dataValues[`${opositeTeam}Goals`];

    if (currentTeamGoals > opositeTeamGoals) {
      team.totalPoints += 3;
      team.totalVictories += 1;
    } else if (currentTeamGoals === opositeTeamGoals) {
      team.totalPoints += 1;
      team.totalDraws += 1;
    } else {
      team.totalLosses += 1;
    }
  };

  private setPoints = async (matches: Match[], filter: string) => {
    const currentTeam = filter === 'home' ? 'homeTeam' : 'awayTeam';
    const opositeTeam = currentTeam === 'homeTeam' ? 'awayTeam' : 'homeTeam';

    matches.forEach((match) => {
      const teamIndex = this.leaderboardTeams.findIndex(({ id }) => id === match[currentTeam]);
      const team = this.leaderboardTeams[teamIndex];

      team.totalGames += 1;
      team.goalsFavor += match[`${currentTeam}Goals`];
      team.goalsOwn += match[`${opositeTeam}Goals`];
      team.goalsBalance = team.goalsFavor - team.goalsOwn;
      this.setGamePoints(teamIndex, currentTeam, match);
      team.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100)
        .toFixed(2));
    });
  };

  private sortTeams = () => {
    this.leaderboardTeams.sort((a, b) => (b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
  };

  private setTeams = async () => {
    this.leaderboardTeams = [];
    const teams = await Team.findAll();
    this.leaderboardTeams = teams?.map((team) => ({
      id: team.id,
      name: team.teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    }));
  };

  public getAll = async () => {
    this.setTeams();

    const finishedMatches = await Match.findAll({ where: { inProgress: 'false' } });
    this.setPoints(finishedMatches, 'home');
    this.setPoints(finishedMatches, 'away');
    this.sortTeams();
    return this.leaderboardTeams;
  };

  public getFilteredTeams = async (filter: string) => {
    this.setTeams();

    const finishedMatches = await Match.findAll({ where: { inProgress: 'false' } });
    this.setPoints(finishedMatches, filter);
    this.sortTeams();
    return this.leaderboardTeams;
  };
}

export default LeaderboardService;
