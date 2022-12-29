import * as express from 'express';
import loginValidation from '../middlewares/validations';
import LoginController from '../controllers/LoginController';

const login = express.Router();

login.post('/', loginValidation, (req, res) => LoginController.login(req, res));
login.get('/validate', (req, res) => LoginController.validate(req, res));

export default login;
