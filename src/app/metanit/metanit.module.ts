import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetanitComponent } from './metanit.component';
import { BoldDirective } from './directives/bold.directive';

@NgModule({
   imports: [
      CommonModule
   ],
   declarations: [
      MetanitComponent,
      BoldDirective
   ]
})
export class MetanitModule { }
