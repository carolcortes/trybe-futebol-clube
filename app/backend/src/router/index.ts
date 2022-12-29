import * as express from 'express';
import login from './LoginRouter';
import teams from './TeamsRouter';

const router = express.Router();

router.use('/login', login);
router.use('/teams', teams);

export default router;
