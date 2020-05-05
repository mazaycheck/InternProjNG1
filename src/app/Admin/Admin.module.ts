import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './Admin.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GenericEntityComponent } from './GenericEntity/GenericEntity.component';
import { BrandListComponent } from './brandList/brandList.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { BrandListUpdateComponent } from './brandList/brand-list-update/brand-list-update.component';
import { UserRolesUpdateComponent } from './users/user-roles-update/user-roles-update.component';

export const routes: Routes = [
  { path: '', component: AdminComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    AdminComponent,
    GenericEntityComponent,
    BrandListComponent,
    UsersComponent,
    BrandListUpdateComponent,
    UserRolesUpdateComponent
  ]
})
export class AdminModule { }
