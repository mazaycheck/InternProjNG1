import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChildofhomeComponent } from '../childofhome/childofhome.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username = 'Bob';

  @ViewChild('testParagraph', {static: false} )
  private childComp: ElementRef;
  counter = 0;
  increment() {
    this.counter++;
    this.childComp.nativeElement.textContent = this.counter;
  }
  decrement() {
    this.counter--;
    this.childComp.nativeElement.textContent = this.counter;
  }
  constructor() { }

  ngOnInit() {
  }

}
