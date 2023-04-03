import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Security } from '../utils/security.util';
import { ParamsBankAccount, ResGetBankAccountUser } from '../models/bank-account';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  fetchBankAccountUser(data: Partial<ParamsBankAccount>): Observable<ResGetBankAccountUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': Security.getToken()
      }),
      params: data
    };

    return this.http.get<ResGetBankAccountUser>(
      `${this.apiUrl}bank-accounts/user`,
      httpOptions)
  }
}
