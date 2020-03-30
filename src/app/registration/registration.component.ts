import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/advert-service/auth.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { UserRegisterModel } from '../Models/UserRegisterModel';
import { Observable } from 'rxjs';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) { }

 model: any = {};
 

  registerForm: FormsModule;

  ngOnInit() {
    
  }

  register() {
    console.log(this.model);
    this.service.register(this.model).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.service.login(this.model).subscribe(r => {
            this.service.settoken(r);
            this.router.navigateByUrl('/ads'); });
        }
      }
    );
  }


}
