import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Security } from '../utils/security.util';
import { ParamsBankAccount, ResGetBankAccountUser } from '../models/bank-account';
import { ParamsGetTransactions, ResGetTransactions, ResSetTransaction, Transaction } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': Security.getToken()
    })
  };

  fetchTransactions(data: Partial<ParamsGetTransactions>): Observable<ResGetTransactions> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': Security.getToken()
      }),
      params: data
    };

    return this.http.get<ResGetTransactions>(
      `${this.apiUrl}transactions/`,
      httpOptions)
  }

  setTransaction(data: Partial<Transaction>): Observable<ResSetTransaction> {
    return this.http.post<ResSetTransaction>(`${this.apiUrl}transactions/`, 
    data, 
    this.httpOptions);
  }
}
