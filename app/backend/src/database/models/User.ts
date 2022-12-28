import { STRING, INTEGER, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: INTEGER,
  },
  username: { allowNull: false, type: STRING },
  role: { allowNull: false, type: STRING },
  email: { allowNull: false, type: STRING },
  password: { allowNull: false, type: STRING },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default User;
