import { Router } from 'express';
import { UsersController } from '@controllers/users';

const Route = Router();
const user = new UsersController();

Route.get("/", user.getUser);

export default Route