import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'teams', key: 'id' },
  },
  homeTeamGoals: { allowNull: false, type: INTEGER },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: { model: 'teams', key: 'id' },
  },
  awayTeamGoals: { allowNull: false, type: INTEGER },
  inProgress: { allowNull: false, type: BOOLEAN },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'Hteam' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'Ateam' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'Hteam' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'Ateam' });

export default Match;