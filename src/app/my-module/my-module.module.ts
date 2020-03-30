import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModuleComponent } from './my-module.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, BrowserModule, FormsModule
  ],
  declarations: [MyModuleComponent],
  exports: [
    MyModuleComponent
  ]
})
export class MyModuleModule { }
