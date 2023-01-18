import * as express from 'express';
import { newMatchValidation } from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matches = express.Router();

matches.get('/', (req, res, next) => matchesController.getAll(req, res, next));
matches.post('/', newMatchValidation, (req, res, next) => matchesController.create(req, res, next));
matches.patch('/:id/finish', (req, res, next) => matchesController.finish(req, res, next));
matches.patch('/:id', (req, res, next) => matchesController.update(req, res, next));

export default matches;
