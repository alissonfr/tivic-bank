import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { FormRegister, ResponseRegister } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setUser(data: FormRegister): Observable<ResponseRegister> {
    return this.http.post<ResponseRegister>(`${this.apiUrl}users/`, data);
  }
}
