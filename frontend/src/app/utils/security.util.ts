import { User } from '../models/user';

export class Security {
  public static set(user: User, token: string) {
    const userData = JSON.stringify(user);

    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', userData);
  }

  public static setUser(user: User) {
    const userData = JSON.stringify(user);
    sessionStorage.setItem('user', userData);
  }

  public static setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  public static getUser(): User {
    const data = sessionStorage.getItem('user');

    if (data) {
      return JSON.parse(data);
    }

    throw new Error('Usuário não encontrado na sessão');
  }

  public static getToken(): string {
    const token = sessionStorage.getItem('token');

    if (token) {
      return token;
    }

    return '';
  }

  public static hasToken(): boolean {
    if (this.getToken()) {
      return true;
    }

    return false;
  }

  public static clear() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  }
}
