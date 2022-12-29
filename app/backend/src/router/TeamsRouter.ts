import * as express from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const teams = express.Router();

teams.get('/', (req, res) => teamsController.getAll(req, res));
teams.get('/:id', (req, res) => teamsController.getById(req, res));

export default teams;
