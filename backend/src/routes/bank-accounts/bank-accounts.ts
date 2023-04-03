import { BankAccountsController } from '@controllers/BankAccountsController.ts';
import { Router } from 'express';
import { authorize } from 'src/middlewares/authorize';

const Route = Router();
const bankAccount = new BankAccountsController();

Route.get("/user", authorize, bankAccount.getBankAccountByUser);

export default Route