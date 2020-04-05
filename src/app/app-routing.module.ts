import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdlistComponent } from './Advert/adlist/adlist.component';
import { AddetailComponent } from './Advert/addetail/addetail.component';

import { AdupdateComponent } from './Advert/adupdate/adupdate.component';
import { HomeComponent } from './home/home.component';
import { AdcreateComponent } from './Advert/adcreate/adcreate.component';
import { RegistrationComponent } from './registration/registration.component';
import { CatlistComponent } from './Category/catlist/catlist.component';
import { AuthGuard } from './services/guards/auth.guard';




export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: '' , runGuardsAndResolvers : 'always', canActivate: [AuthGuard], children: [
    { path: 'ads', component: AdlistComponent },
    { path: 'ads/new', component: AdcreateComponent },
    { path: 'ads/details/:id', component: AddetailComponent },
    { path: 'ads/update/:id', component: AdupdateComponent },
    { path: 'categories', component: CatlistComponent, }
    ]
  },
  { path: 'auth/register', component: RegistrationComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
