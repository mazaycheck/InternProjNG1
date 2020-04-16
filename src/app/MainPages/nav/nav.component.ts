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
  hide = true;
  loginData: any = {};
  name: string;

  constructor(public authService: AuthService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
    if (this.isLoggedIn()) {
      this.name = this.authService.getCurrentUserName();
    }
  }

  login() {

    this.authService.login(this.loginData).subscribe(
      response => {
        if (response) {
          localStorage.setItem('token' , response.token);
          this.name = this.authService.getCurrentUserName();
          this.toast.success('Logged in');
        }
      }, error => {
        this.toast.error(error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.toast.warning('Logged out');
  }
  isLoggedIn() {
     return  this.authService.isLoggedIn();
  }

}
