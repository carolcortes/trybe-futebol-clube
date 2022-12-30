import * as express from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const leaderboard = express.Router();

leaderboard.get('/', (req, res) => leaderboardController.getAll(req, res));
leaderboard.get('/home', (req, res) => leaderboardController.getFilteredTeams(req, res));
leaderboard.get('/away', (req, res) => leaderboardController.getFilteredTeams(req, res));

export default leaderboard;
