import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { UserRegisterModel } from '../../Models/UserRegisterModel';
import { Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorInterceptorService } from '../../services/err/errorInterceptor.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: AuthService, private router: Router, private toast: ToastrService) { }

 model: any = {};


  registerForm: FormsModule;

  ngOnInit() {

  }

  redirectoToHome() {
    this.router.navigateByUrl('/ads');
  }

  register() {
    console.log(this.model);
    this.service.register(this.model).subscribe(
      response => {
        this.toast.success('Registered!');
        if (response) {
          if (this.model.checkout === true) {
          this.service.login(this.model).subscribe(r => {
            this.service.settoken(r.token);
             });
          }
          setTimeout(() => {
          this.redirectoToHome();
         }, 1000);
        }
      }, error => {
        this.toast.error(error);
      }
      );
    }
  }
