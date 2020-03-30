import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/advert-service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  loggedin: boolean;
  name: string;

  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.service.login(this.model).subscribe(
      response => {
        console.log(response);
        if (response) {
          localStorage.setItem('token' , response.token);
          this.loggedin = true;

        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedin = false;
  }
  isLoggedIn() {
    if (localStorage.getItem('token')) {

      return true;
    }
    return false;
  }

}
