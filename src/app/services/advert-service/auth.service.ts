import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegisterModel } from 'src/app/Models/UserRegisterModel';
import { GlobalsService } from './globals.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  constructor(private http: HttpClient, private globals: GlobalsService) {
    this.baseUrl = globals.baseUrl + 'api/auth/';
   }

  login(model): Observable<any> {
    return this.http.post(this.baseUrl + 'login', model);
  }

  register(model): Observable<any> {
    return this.http.post(this.baseUrl + 'register', model);
  }

  settoken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      if (decoded.exp > (Date.now().valueOf() / 1000)) {
        return decoded.unique_name;
      } else {
        localStorage.removeItem('token');
        return null;
      }
    } else {
      return null;
    }
  }
}
