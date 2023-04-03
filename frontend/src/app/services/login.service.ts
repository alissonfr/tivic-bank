import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormLogin, ResponseLogin } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(data: FormLogin): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(`${this.apiUrl}login`, data);
  }
}
