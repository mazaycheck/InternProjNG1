import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  name: string;

  constructor(public service: AuthService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn();
  }

  login() {

    this.service.login(this.model).subscribe(
      response => {
        if (response) {
          localStorage.setItem('token' , response.token);
          this.isLoggedIn();
          this.toast.success('Logged in');
        }
      }, error => {
        this.toast.error(error);
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    this.toast.warning('Logged out');
  }
  isLoggedIn() {
     const result = this.service.isLoggedIn();

     if (result) {
       this.name = result;
       return true;
     } else {
       return false;
     }
  }

}
