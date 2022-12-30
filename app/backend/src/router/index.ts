import * as express from 'express';
import login from './LoginRouter';
import matches from './MatchesRouter';
import teams from './TeamsRouter';

const router = express.Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);

export default router;
