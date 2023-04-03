import { BankAccount } from './bank-account';
import { User } from './user';

export interface FormRegister {
    email: string;
    password: string;
  }  

export interface ResponseRegister {
  user: User;
  bank_account: BankAccount;
}
