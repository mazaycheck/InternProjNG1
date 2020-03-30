import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegisterModel } from 'src/app/Models/UserRegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'https://localhost:44356/api/auth/';

  constructor(private http: HttpClient) { }

  login(model): Observable<any> {
    return this.http.post(this.baseUrl + 'login', model);
  }

  register(model): Observable<any> {
    console.log(model);
    return this.http.post(this.baseUrl + 'register', model);
  }

  settoken(token: string) {
    localStorage.setItem('token', token);
  }
}
