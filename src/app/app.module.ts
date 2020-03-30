import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { AdvertService } from './services/advert-service/advert.service';
import { AdlistComponent } from './Advert/adlist/adlist.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AddetailComponent } from './Advert/addetail/addetail.component';
import { AdcreateComponent } from './Advert/adcreate/adcreate.component';
import { AdupdateComponent } from './Advert/adupdate/adupdate.component';
import { AuthService } from './services/advert-service/auth.service';
import { ChildofhomeComponent } from './childofhome/childofhome.component';

import { MyModuleModule } from './my-module/my-module.module';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      AdlistComponent,
      HomeComponent,
      AddetailComponent,
      AdcreateComponent,
      AdupdateComponent,
      ChildofhomeComponent,
      RegistrationComponent,
   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      MyModuleModule
   ],
   providers: [
      AdvertService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
