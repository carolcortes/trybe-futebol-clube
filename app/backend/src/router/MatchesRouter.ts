import * as express from 'express';
import { newMatchValidation } from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matches = express.Router();

matches.get('/', (req, res) => matchesController.getAll(req, res));
matches.post('/', newMatchValidation, (req, res) => matchesController.create(req, res));
matches.patch('/:id/finish', (req, res) => matchesController.finish(req, res));
matches.patch('/:id', (req, res) => matchesController.update(req, res));

export default matches;
