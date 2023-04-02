import { Router } from 'express';
import { LoginController } from '@controllers/LoginController';

const Route = Router();
const login = new LoginController();

Route.post("/", login.login);

export default Route