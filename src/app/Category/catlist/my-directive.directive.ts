import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[bold]',

})
export class BoldDirective {

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.fontWeight = 'bold';
    this.element.nativeElement.style.color = 'red';
  }
}
