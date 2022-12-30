import * as express from 'express';
import leaderboard from './LeaderboardRouter';
import login from './LoginRouter';
import matches from './MatchesRouter';
import teams from './TeamsRouter';

const router = express.Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);
router.use('/leaderboard', leaderboard);

export default router;
