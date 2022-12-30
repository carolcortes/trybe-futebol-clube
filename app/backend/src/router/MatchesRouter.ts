import * as express from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matches = express.Router();

matches.get('/', (req, res) => matchesController.getAll(req, res));

export default matches;
