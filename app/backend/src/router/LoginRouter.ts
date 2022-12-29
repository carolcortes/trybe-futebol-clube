import * as express from 'express';
import loginValidation from '../middlewares/validations';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const login = express.Router();

login.post('/', loginValidation, (req, res) => loginController.login(req, res));
login.get('/validate', (req, res) => loginController.validate(req, res));

export default login;
