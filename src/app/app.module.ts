import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdvertService } from './services/Repositories/advert.service';
import { AdlistComponent } from './Advert/adlist/adlist.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './MainPages/home/home.component';
import { CommonModule } from '@angular/common';
import { AddetailComponent } from './Advert/addetail/addetail.component';
import { AdcreateComponent } from './Advert/adcreate/adcreate.component';
import { AdupdateComponent } from './Advert/adupdate/adupdate.component';
import { AuthService } from './services/auth/auth.service';


import { MyModuleModule } from './my-module/my-module.module';
import { RegistrationComponent } from './registration/registration.component';
import { GlobalsService } from './services/global/globals.service';
import { CatService } from './services/Repositories/cat.service';
import { CatlistComponent } from './Category/catlist/catlist.component';
import { BoldDirective } from './Category/catlist/my-directive.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ErrorInterceptorService } from './services/err/errorInterceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { ButtonupdateComponent } from './Category/catlist/tdupdate/buttonupdate/buttonupdate.component';
import { TdupdateComponent } from './Category/catlist/tdupdate/tdupdate.component';
import { CatcreateComponent } from './Category/catcreate/catcreate.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MetanitModule } from './metanit/metanit.module';


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
      BoldDirective,
      ButtonupdateComponent,
      TdupdateComponent,
      CatcreateComponent,


   ],
   imports: [
      CommonModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      MyModuleModule,
      BrowserAnimationsModule,
      MatSliderModule,
      ToastrModule.forRoot({
         timeOut: 2500,
         positionClass: 'toast-bottom-right',
         preventDuplicates: true}),
      FontAwesomeModule,
      MetanitModule,
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
