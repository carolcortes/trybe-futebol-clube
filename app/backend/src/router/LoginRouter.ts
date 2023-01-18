import * as express from 'express';
import { loginValidation } from '../middlewares/validations';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const login = express.Router();

login.post('/', loginValidation, (req, res, next) => loginController.login(req, res, next));
login.get('/validate', (req, res, next) => loginController.validate(req, res, next));

export default login;
