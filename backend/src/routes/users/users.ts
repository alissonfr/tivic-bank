import { Router } from 'express';
import { UsersController } from '@controllers/UsersController';

const Route = Router();
const user = new UsersController();

Route.get("/", user.getUsers);
Route.post("/", user.setUser);

export default Route