import { User } from './user';

export interface FormLogin {
    email: string;
    password: string;
  }  

export interface ResponseLogin {
  refreshTokne: string;
  token: string;
  user: User;
}
