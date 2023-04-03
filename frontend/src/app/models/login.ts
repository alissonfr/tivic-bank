import { User } from './user';

export interface FormLogin {
    email: string;
    password: string;
  }  

export interface ResponseLogin {
  token: string;
  user: User;
}
