import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboard = express.Router();

leaderboard.get('/', (req, res, next) => leaderboardController.getAll(req, res, next));
leaderboard.get('/home', (req, res, next) => leaderboardController
  .getFilteredTeams(req, res, next));
leaderboard.get('/away', (req, res, next) => leaderboardController
  .getFilteredTeams(req, res, next));

export default leaderboard;
