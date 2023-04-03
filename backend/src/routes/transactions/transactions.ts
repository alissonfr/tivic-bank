import { Router } from 'express';
import { TransactionsController } from '@controllers/TransactionsController';

const Route = Router();
const transaction = new TransactionsController();

Route.get("/", transaction.getTransactions);
Route.post("/", transaction.setTransaction);

export default Route