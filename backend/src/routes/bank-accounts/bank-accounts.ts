import { BankAccountsController } from '@controllers/BankAccountsController.ts';
import { Router } from 'express';

const Route = Router();
const bankAccount = new BankAccountsController();

Route.get("/user", bankAccount.getBankAccountByUser);

export default Route