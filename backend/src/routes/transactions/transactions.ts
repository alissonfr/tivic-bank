import { Router } from 'express';
import { TransactionsController } from '@controllers/TransactionsController';
import { authorize } from 'src/middlewares/authorize';

const Route = Router();
const transaction = new TransactionsController();

Route.get("/", authorize, transaction.getTransactions);
Route.post("/", authorize, transaction.setTransaction);

export default Route