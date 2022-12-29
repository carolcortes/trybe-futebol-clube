import * as express from 'express';
import login from './LoginRouter';

const router = express.Router();

router.use('/login', login);

export default router;
