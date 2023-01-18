import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const teams = express.Router();

teams.get('/', (req, res, next) => teamsController.getAll(req, res, next));
teams.get('/:id', (req, res, next) => teamsController.getById(req, res, next));

export default teams;
