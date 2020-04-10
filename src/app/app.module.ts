import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './MainPages/nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdvertService } from './services/Repositories/advert.service';
import { AdlistComponent } from './MainPages/Advert/adlist/adlist.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './MainPages/home/home.component';
import { CommonModule } from '@angular/common';
import { AddetailComponent } from './MainPages/Advert/addetail/addetail.component';
import { AdcreateComponent } from './MainPages/Advert/adcreate/adcreate.component';
import { AdupdateComponent } from './MainPages/Advert/adupdate/adupdate.component';
import { AuthService } from './services/auth/auth.service';


import { RegistrationComponent } from './MainPages/registration/registration.component';
import { GlobalsService } from './services/global/globals.service';
import { CatService } from './services/Repositories/cat.service';
import { CatlistComponent } from './MainPages/Category/catlist/catlist.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ErrorInterceptorService } from './services/err/errorInterceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ButtonupdateComponent } from './MainPages/Category/catlist/tdupdate/buttonupdate/buttonupdate.component';
import { TdupdateComponent } from './MainPages/Category/catlist/tdupdate/tdupdate.component';
import { CatcreateComponent } from './MainPages/Category/catcreate/catcreate.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TownListComponent } from './MainPages/Town/townList/townList.component';
import { BrandListComponent } from './MainPages/Brand/brandList/brandList.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      AdlistComponent,
      HomeComponent,
      AddetailComponent,
      AdcreateComponent,
      AdupdateComponent,
      RegistrationComponent,
      CatlistComponent,
      ButtonupdateComponent,
      TdupdateComponent,
      CatcreateComponent,
      TownListComponent,
      BrandListComponent
   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatSliderModule,
      ToastrModule.forRoot({
         timeOut: 2500,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true}),
      FontAwesomeModule,
   ],
   providers: [
      AdvertService,
      AuthService,
      GlobalsService,
      CatService,
      {
         provide: HTTP_INTERCEPTORS,
         useClass: ErrorInterceptorService,
         multi: true
      },


   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
